import { Hono } from 'hono'

type Bindings = { DB: D1Database }

export const courseRoutes = new Hono<{ Bindings: Bindings }>()

// List courses with filters
courseRoutes.get('/', async (c) => {
  const category = c.req.query('category')
  const level = c.req.query('level')
  const search = c.req.query('search')
  const featured = c.req.query('featured')
  const trending = c.req.query('trending')
  const limit = parseInt(c.req.query('limit') || '20')
  const offset = parseInt(c.req.query('offset') || '0')

  let sql = 'SELECT c.*, cat.name as category_name, cat.slug as category_slug FROM courses c LEFT JOIN categories cat ON c.category_id = cat.id WHERE c.is_active = 1'
  const params: any[] = []

  if (category) { sql += ' AND cat.slug = ?'; params.push(category) }
  if (level) { sql += ' AND c.level = ?'; params.push(level) }
  if (search) { sql += ' AND (c.title LIKE ? OR c.short_description LIKE ?)'; params.push(`%${search}%`, `%${search}%`) }
  if (featured === '1') { sql += ' AND c.is_featured = 1' }
  if (trending === '1') { sql += ' AND c.is_trending = 1' }
  
  sql += ' ORDER BY c.is_featured DESC, c.total_enrolled DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)

  try {
    const courses = await c.env.DB.prepare(sql).bind(...params).all()
    const countSql = 'SELECT COUNT(*) as total FROM courses WHERE is_active = 1'
    const count = await c.env.DB.prepare(countSql).first()
    return c.json({ courses: courses.results, total: count?.total || 0 })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Get single course by slug
courseRoutes.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  try {
    const course = await c.env.DB.prepare(
      'SELECT c.*, cat.name as category_name FROM courses c LEFT JOIN categories cat ON c.category_id = cat.id WHERE c.slug = ?'
    ).bind(slug).first()
    if (!course) return c.json({ error: 'Course not found' }, 404)

    const modules = await c.env.DB.prepare(
      'SELECT * FROM course_modules WHERE course_id = ? ORDER BY sort_order'
    ).bind(course.id).all()

    const testimonials = await c.env.DB.prepare(
      'SELECT * FROM testimonials WHERE course_id = ? ORDER BY rating DESC LIMIT 5'
    ).bind(course.id).all()

    return c.json({ course, modules: modules.results, testimonials: testimonials.results })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})
