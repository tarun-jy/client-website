import { Hono } from 'hono'

type Bindings = { DB: D1Database }

export const publicRoutes = new Hono<{ Bindings: Bindings }>()

// Get categories
publicRoutes.get('/categories', async (c) => {
  try {
    const cats = await c.env.DB.prepare('SELECT * FROM categories ORDER BY sort_order').all()
    return c.json({ categories: cats.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get partners
publicRoutes.get('/partners', async (c) => {
  try {
    const partners = await c.env.DB.prepare('SELECT * FROM partners WHERE is_active = 1 ORDER BY sort_order').all()
    return c.json({ partners: partners.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get testimonials
publicRoutes.get('/testimonials', async (c) => {
  try {
    const t = await c.env.DB.prepare('SELECT * FROM testimonials WHERE is_featured = 1 ORDER BY rating DESC LIMIT 8').all()
    return c.json({ testimonials: t.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Submit lead
publicRoutes.post('/lead', async (c) => {
  const { name, email, phone, course_interest, experience, message } = await c.req.json()
  if (!name || !email) return c.json({ error: 'Name and email are required' }, 400)
  try {
    await c.env.DB.prepare(
      'INSERT INTO leads (name, email, phone, course_interest, experience, message) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(name, email, phone || null, course_interest || null, experience || null, message || null).run()
    return c.json({ success: true, message: 'Thank you! Our counselor will contact you soon.' })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get published blog posts (public)
publicRoutes.get('/blogs', async (c) => {
  const category = c.req.query('category') || ''
  const tag = c.req.query('tag') || ''
  const limit = parseInt(c.req.query('limit') || '12')
  const offset = parseInt(c.req.query('offset') || '0')
  try {
    let sql = 'SELECT id, title, slug, excerpt, author_name, thumbnail, featured_image, category, tags, views, reading_time, is_featured, published_at, created_at FROM blog_posts WHERE is_published = 1'
    const params: any[] = []
    if (category) { sql += ' AND category = ?'; params.push(category) }
    if (tag) { sql += ' AND tags LIKE ?'; params.push(`%${tag}%`) }
    sql += ' ORDER BY is_featured DESC, published_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)
    const blogs = await c.env.DB.prepare(sql).bind(...params).all()
    const total = await c.env.DB.prepare('SELECT COUNT(*) as count FROM blog_posts WHERE is_published = 1').first()
    
    // Get distinct categories from published posts
    const categories = await c.env.DB.prepare("SELECT DISTINCT category FROM blog_posts WHERE is_published = 1 AND category != '' ORDER BY category").all()
    
    return c.json({ blogs: blogs.results, total: total?.count || 0, categories: categories.results.map((c: any) => c.category) })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get single blog post by slug (public)
publicRoutes.get('/blogs/:slug', async (c) => {
  const slug = c.req.param('slug')
  try {
    const blog = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1').bind(slug).first()
    if (!blog) return c.json({ error: 'Blog not found' }, 404)
    // Increment views
    await c.env.DB.prepare('UPDATE blog_posts SET views = views + 1 WHERE id = ?').bind(blog.id).run()
    // Get related posts
    const related = await c.env.DB.prepare(
      'SELECT id, title, slug, excerpt, thumbnail, featured_image, category, reading_time, published_at FROM blog_posts WHERE is_published = 1 AND category = ? AND id != ? ORDER BY published_at DESC LIMIT 3'
    ).bind(blog.category, blog.id).all()
    return c.json({ blog, related: related.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get published CMS page data
publicRoutes.get('/page/:key', async (c) => {
  const key = c.req.param('key')
  try {
    const page = await c.env.DB.prepare('SELECT page_key, title, layout_json, meta_title, meta_description FROM site_pages WHERE page_key = ? AND is_published = 1').bind(key).first()
    if (!page) return c.json({ error: 'Page not found' }, 404)
    return c.json({ page })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get site settings (public)
publicRoutes.get('/site-settings', async (c) => {
  try {
    const settings = await c.env.DB.prepare('SELECT * FROM site_settings').all()
    const map: Record<string, string> = {}
    settings.results.forEach((s: any) => { map[s.setting_key] = s.setting_value })
    return c.json({ settings: map })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get course FAQs (public)
publicRoutes.get('/courses/:id/faqs', async (c) => {
  const id = c.req.param('id')
  try {
    const faqs = await c.env.DB.prepare('SELECT id, question, answer, sort_order FROM course_faqs WHERE course_id = ? AND is_active = 1 ORDER BY sort_order').bind(id).all()
    return c.json({ faqs: faqs.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get course documents (public)
publicRoutes.get('/courses/:id/documents', async (c) => {
  const id = c.req.param('id')
  try {
    const docs = await c.env.DB.prepare('SELECT id, doc_type, title, file_url FROM course_documents WHERE course_id = ? ORDER BY sort_order').bind(id).all()
    return c.json({ documents: docs.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Site stats
publicRoutes.get('/stats', async (c) => {
  try {
    const students = await c.env.DB.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'student'").first()
    const courses = await c.env.DB.prepare('SELECT COUNT(*) as count FROM courses WHERE is_active = 1').first()
    const enrollments = await c.env.DB.prepare('SELECT COUNT(*) as count FROM enrollments').first()
    return c.json({
      learners: '10,00,000+',
      courses: courses?.count || 0,
      universities: '10+',
      countries: '85+',
      transitions: '50,000+',
      mentors: '1,000+'
    })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})
