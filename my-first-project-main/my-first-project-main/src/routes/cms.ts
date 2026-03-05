import { Hono } from 'hono'

type Bindings = { DB: D1Database }

export const cmsRoutes = new Hono<{ Bindings: Bindings }>()

// Admin auth middleware
const adminAuth = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401)
  try {
    const decoded = JSON.parse(atob(authHeader.substring(7)))
    if (decoded.exp < Date.now()) return c.json({ error: 'Token expired' }, 401)
    if (decoded.role !== 'admin') return c.json({ error: 'Admin access required' }, 403)
    c.set('userId', decoded.id)
    await next()
  } catch { return c.json({ error: 'Invalid token' }, 401) }
}

cmsRoutes.use('/*', adminAuth)

// ========== SITE PAGES ==========
// Get all pages
cmsRoutes.get('/pages', async (c) => {
  try {
    const pages = await c.env.DB.prepare('SELECT id, page_key, title, is_published, meta_title, updated_at, created_at FROM site_pages ORDER BY created_at DESC').all()
    return c.json({ pages: pages.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get single page
cmsRoutes.get('/pages/:key', async (c) => {
  const key = c.req.param('key')
  try {
    const page = await c.env.DB.prepare('SELECT * FROM site_pages WHERE page_key = ?').bind(key).first()
    if (!page) return c.json({ error: 'Page not found' }, 404)
    return c.json({ page })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Save draft
cmsRoutes.put('/pages/:key/draft', async (c) => {
  const key = c.req.param('key')
  const { draft_json, title, meta_title, meta_description } = await c.req.json()
  try {
    const exists = await c.env.DB.prepare('SELECT id FROM site_pages WHERE page_key = ?').bind(key).first()
    if (exists) {
      await c.env.DB.prepare(
        'UPDATE site_pages SET draft_json = ?, title = COALESCE(?, title), meta_title = COALESCE(?, meta_title), meta_description = COALESCE(?, meta_description), updated_at = CURRENT_TIMESTAMP WHERE page_key = ?'
      ).bind(JSON.stringify(draft_json), title || null, meta_title || null, meta_description || null, key).run()
    } else {
      await c.env.DB.prepare(
        'INSERT INTO site_pages (page_key, title, draft_json, layout_json, meta_title, meta_description) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(key, title || key, JSON.stringify(draft_json), '[]', meta_title || null, meta_description || null).run()
    }
    return c.json({ success: true, message: 'Draft saved' })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Publish page (copy draft to live)
cmsRoutes.put('/pages/:key/publish', async (c) => {
  const key = c.req.param('key')
  try {
    const page = await c.env.DB.prepare('SELECT draft_json FROM site_pages WHERE page_key = ?').bind(key).first()
    if (!page) return c.json({ error: 'Page not found' }, 404)
    await c.env.DB.prepare(
      'UPDATE site_pages SET layout_json = draft_json, is_published = 1, published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE page_key = ?'
    ).bind(key).run()
    return c.json({ success: true, message: 'Page published' })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Unpublish page
cmsRoutes.put('/pages/:key/unpublish', async (c) => {
  const key = c.req.param('key')
  try {
    await c.env.DB.prepare('UPDATE site_pages SET is_published = 0, updated_at = CURRENT_TIMESTAMP WHERE page_key = ?').bind(key).run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Delete page
cmsRoutes.delete('/pages/:key', async (c) => {
  const key = c.req.param('key')
  try {
    await c.env.DB.prepare('DELETE FROM site_pages WHERE page_key = ?').bind(key).run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// ========== SITE SETTINGS (header, footer, nav) ==========
cmsRoutes.get('/settings', async (c) => {
  try {
    const settings = await c.env.DB.prepare('SELECT * FROM site_settings').all()
    const map: Record<string, string> = {}
    settings.results.forEach((s: any) => { map[s.setting_key] = s.setting_value })
    return c.json({ settings: map })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

cmsRoutes.put('/settings', async (c) => {
  const { settings } = await c.req.json()
  try {
    for (const [key, value] of Object.entries(settings)) {
      await c.env.DB.prepare(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON CONFLICT(setting_key) DO UPDATE SET setting_value = ?, updated_at = CURRENT_TIMESTAMP'
      ).bind(key, value as string, value as string).run()
    }
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// ========== BLOG MANAGEMENT ==========
// List all blogs (admin - including drafts)
cmsRoutes.get('/blogs', async (c) => {
  const status = c.req.query('status') || ''
  const category = c.req.query('category') || ''
  const search = c.req.query('search') || ''
  try {
    let sql = 'SELECT * FROM blog_posts WHERE 1=1'
    const params: any[] = []
    if (status === 'published') { sql += ' AND is_published = 1' }
    if (status === 'draft') { sql += ' AND is_published = 0' }
    if (category) { sql += ' AND category = ?'; params.push(category) }
    if (search) { sql += ' AND (title LIKE ? OR excerpt LIKE ?)'; params.push(`%${search}%`, `%${search}%`) }
    sql += ' ORDER BY created_at DESC'
    const blogs = await c.env.DB.prepare(sql).bind(...params).all()
    return c.json({ blogs: blogs.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get single blog
cmsRoutes.get('/blogs/:id', async (c) => {
  const id = c.req.param('id')
  try {
    const blog = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE id = ?').bind(id).first()
    if (!blog) return c.json({ error: 'Blog not found' }, 404)
    return c.json({ blog })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Create blog
cmsRoutes.post('/blogs', async (c) => {
  const data = await c.req.json()
  try {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const result = await c.env.DB.prepare(`
      INSERT INTO blog_posts (title, slug, excerpt, content, content_html, author_name, thumbnail, featured_image, category, tags, 
      meta_title, meta_description, reading_time, is_published, is_featured, published_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.title, slug, data.excerpt || '', data.content || '', data.content_html || data.content || '',
      data.author_name || 'Admin', data.thumbnail || '', data.featured_image || data.thumbnail || '',
      data.category || '', data.tags || '', data.meta_title || data.title, data.meta_description || data.excerpt || '',
      data.reading_time || 5, data.is_published ? 1 : 0, data.is_featured ? 1 : 0,
      data.is_published ? new Date().toISOString() : null
    ).run()
    return c.json({ success: true, id: result.meta.last_row_id, slug })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Update blog
cmsRoutes.put('/blogs/:id', async (c) => {
  const id = c.req.param('id')
  const data = await c.req.json()
  try {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    await c.env.DB.prepare(`
      UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, content_html=?, author_name=?, thumbnail=?, featured_image=?,
      category=?, tags=?, meta_title=?, meta_description=?, reading_time=?, is_published=?, is_featured=?,
      published_at=CASE WHEN ? = 1 AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END,
      updated_at=CURRENT_TIMESTAMP WHERE id=?
    `).bind(
      data.title, slug, data.excerpt || '', data.content || '', data.content_html || data.content || '',
      data.author_name || 'Admin', data.thumbnail || '', data.featured_image || data.thumbnail || '',
      data.category || '', data.tags || '', data.meta_title || data.title, data.meta_description || data.excerpt || '',
      data.reading_time || 5, data.is_published ? 1 : 0, data.is_featured ? 1 : 0,
      data.is_published ? 1 : 0, id
    ).run()
    return c.json({ success: true, slug })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Delete blog
cmsRoutes.delete('/blogs/:id', async (c) => {
  const id = c.req.param('id')
  try {
    await c.env.DB.prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Blog categories
cmsRoutes.get('/blog-categories', async (c) => {
  try {
    const cats = await c.env.DB.prepare('SELECT * FROM blog_categories ORDER BY sort_order').all()
    return c.json({ categories: cats.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

cmsRoutes.post('/blog-categories', async (c) => {
  const { name, description } = await c.req.json()
  try {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    await c.env.DB.prepare('INSERT INTO blog_categories (name, slug, description) VALUES (?, ?, ?)').bind(name, slug, description || '').run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// ========== COURSE EXTENSIONS ==========
// Course FAQs
cmsRoutes.get('/courses/:id/faqs', async (c) => {
  const id = c.req.param('id')
  try {
    const faqs = await c.env.DB.prepare('SELECT * FROM course_faqs WHERE course_id = ? AND is_active = 1 ORDER BY sort_order').bind(id).all()
    return c.json({ faqs: faqs.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

cmsRoutes.post('/courses/:id/faqs', async (c) => {
  const courseId = c.req.param('id')
  const { question, answer, sort_order } = await c.req.json()
  try {
    const result = await c.env.DB.prepare(
      'INSERT INTO course_faqs (course_id, question, answer, sort_order) VALUES (?, ?, ?, ?)'
    ).bind(courseId, question, answer, sort_order || 0).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

cmsRoutes.put('/faqs/:id', async (c) => {
  const id = c.req.param('id')
  const { question, answer, sort_order } = await c.req.json()
  try {
    await c.env.DB.prepare('UPDATE course_faqs SET question=?, answer=?, sort_order=? WHERE id=?').bind(question, answer, sort_order || 0, id).run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

cmsRoutes.delete('/faqs/:id', async (c) => {
  const id = c.req.param('id')
  try {
    await c.env.DB.prepare('UPDATE course_faqs SET is_active = 0 WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Course Documents (certificate previews, brochures)
cmsRoutes.get('/courses/:id/documents', async (c) => {
  const id = c.req.param('id')
  const type = c.req.query('type') || ''
  try {
    let sql = 'SELECT * FROM course_documents WHERE course_id = ?'
    const params: any[] = [id]
    if (type) { sql += ' AND doc_type = ?'; params.push(type) }
    sql += ' ORDER BY sort_order'
    const docs = await c.env.DB.prepare(sql).bind(...params).all()
    return c.json({ documents: docs.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

cmsRoutes.post('/courses/:id/documents', async (c) => {
  const courseId = c.req.param('id')
  const { doc_type, title, file_url } = await c.req.json()
  try {
    const result = await c.env.DB.prepare(
      'INSERT INTO course_documents (course_id, doc_type, title, file_url) VALUES (?, ?, ?, ?)'
    ).bind(courseId, doc_type, title || '', file_url).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

cmsRoutes.delete('/documents/:id', async (c) => {
  const id = c.req.param('id')
  try {
    await c.env.DB.prepare('DELETE FROM course_documents WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Update course highlights
cmsRoutes.put('/courses/:id/highlights', async (c) => {
  const id = c.req.param('id')
  const { highlights } = await c.req.json()
  try {
    await c.env.DB.prepare('UPDATE courses SET highlights = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(highlights, id).run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})
