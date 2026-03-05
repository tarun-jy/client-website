import { Hono } from 'hono'

type Bindings = { DB: D1Database }

export const adminRoutes = new Hono<{ Bindings: Bindings }>()

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

adminRoutes.use('/*', adminAuth)

// Dashboard stats
adminRoutes.get('/dashboard', async (c) => {
  try {
    const totalStudents = await c.env.DB.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'student'").first()
    const totalCourses = await c.env.DB.prepare('SELECT COUNT(*) as count FROM courses WHERE is_active = 1').first()
    const totalEnrollments = await c.env.DB.prepare('SELECT COUNT(*) as count FROM enrollments').first()
    const totalRevenue = await c.env.DB.prepare("SELECT COALESCE(SUM(payment_amount), 0) as total FROM enrollments WHERE payment_status = 'paid'").first()
    const newLeads = await c.env.DB.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'new'").first()
    const recentEnrollments = await c.env.DB.prepare(`
      SELECT e.*, u.name as student_name, u.email as student_email, c.title as course_title 
      FROM enrollments e JOIN users u ON e.user_id = u.id JOIN courses c ON e.course_id = c.id 
      ORDER BY e.enrolled_at DESC LIMIT 10
    `).all()
    const categoryStats = await c.env.DB.prepare(`
      SELECT cat.name, COUNT(e.id) as enrollments, SUM(e.payment_amount) as revenue
      FROM categories cat LEFT JOIN courses c ON cat.id = c.category_id LEFT JOIN enrollments e ON c.id = e.course_id
      GROUP BY cat.id ORDER BY enrollments DESC
    `).all()
    
    return c.json({
      stats: {
        totalStudents: totalStudents?.count || 0,
        totalCourses: totalCourses?.count || 0,
        totalEnrollments: totalEnrollments?.count || 0,
        totalRevenue: totalRevenue?.total || 0,
        newLeads: newLeads?.count || 0
      },
      recentEnrollments: recentEnrollments.results,
      categoryStats: categoryStats.results
    })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// List all students
adminRoutes.get('/students', async (c) => {
  const search = c.req.query('search') || ''
  const limit = parseInt(c.req.query('limit') || '20')
  const offset = parseInt(c.req.query('offset') || '0')
  try {
    let sql = "SELECT u.*, (SELECT COUNT(*) FROM enrollments WHERE user_id = u.id) as course_count FROM users u WHERE u.role = 'student'"
    const params: any[] = []
    if (search) { sql += ' AND (u.name LIKE ? OR u.email LIKE ?)'; params.push(`%${search}%`, `%${search}%`) }
    sql += ' ORDER BY u.created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)
    const students = await c.env.DB.prepare(sql).bind(...params).all()
    const total = await c.env.DB.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'student'").first()
    return c.json({ students: students.results, total: total?.count || 0 })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get student detail
adminRoutes.get('/students/:id', async (c) => {
  const id = c.req.param('id')
  try {
    const student = await c.env.DB.prepare('SELECT * FROM users WHERE id = ? AND role = ?').bind(id, 'student').first()
    if (!student) return c.json({ error: 'Student not found' }, 404)
    const enrollments = await c.env.DB.prepare(`
      SELECT e.*, c.title, c.slug, c.university FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE e.user_id = ?
    `).bind(id).all()
    return c.json({ student, enrollments: enrollments.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Toggle student active status
adminRoutes.put('/students/:id/toggle', async (c) => {
  const id = c.req.param('id')
  try {
    const user = await c.env.DB.prepare('SELECT is_active FROM users WHERE id = ?').bind(id).first()
    if (!user) return c.json({ error: 'User not found' }, 404)
    await c.env.DB.prepare('UPDATE users SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(user.is_active ? 0 : 1, id).run()
    return c.json({ success: true, is_active: !user.is_active })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Manage courses
adminRoutes.post('/courses', async (c) => {
  const data = await c.req.json()
  try {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const result = await c.env.DB.prepare(`
      INSERT INTO courses (title, slug, subtitle, short_description, description, category_id, university, instructor_name, instructor_title, 
      duration_weeks, price, original_price, emi_available, emi_amount, level, total_modules, total_hours, certificate_type, skills, highlights, 
      is_featured, is_trending, start_date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(data.title, slug, data.subtitle || '', data.short_description || '', data.description || '', data.category_id, data.university || '',
      data.instructor_name || '', data.instructor_title || '', data.duration_weeks || 0, data.price || 0, data.original_price || 0,
      data.emi_available ? 1 : 0, data.emi_amount || 0, data.level || 'Beginner', data.total_modules || 0, data.total_hours || 0,
      data.certificate_type || '', data.skills || '', data.highlights || '', data.is_featured ? 1 : 0, data.is_trending ? 1 : 0, data.start_date || ''
    ).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

adminRoutes.put('/courses/:id', async (c) => {
  const id = c.req.param('id')
  const data = await c.req.json()
  try {
    await c.env.DB.prepare(`
      UPDATE courses SET title=?, subtitle=?, short_description=?, description=?, category_id=?, university=?, instructor_name=?, instructor_title=?,
      duration_weeks=?, price=?, original_price=?, emi_available=?, emi_amount=?, level=?, total_modules=?, total_hours=?, certificate_type=?,
      skills=?, highlights=?, is_featured=?, is_trending=?, start_date=?, updated_at=CURRENT_TIMESTAMP WHERE id=?
    `).bind(data.title, data.subtitle, data.short_description, data.description, data.category_id, data.university, data.instructor_name,
      data.instructor_title, data.duration_weeks, data.price, data.original_price, data.emi_available ? 1 : 0, data.emi_amount, data.level,
      data.total_modules, data.total_hours, data.certificate_type, data.skills, data.highlights, data.is_featured ? 1 : 0, data.is_trending ? 1 : 0,
      data.start_date, id
    ).run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

adminRoutes.delete('/courses/:id', async (c) => {
  const id = c.req.param('id')
  try {
    await c.env.DB.prepare('UPDATE courses SET is_active = 0 WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Leads management
adminRoutes.get('/leads', async (c) => {
  try {
    const leads = await c.env.DB.prepare('SELECT * FROM leads ORDER BY created_at DESC').all()
    return c.json({ leads: leads.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

adminRoutes.put('/leads/:id', async (c) => {
  const id = c.req.param('id')
  const { status } = await c.req.json()
  try {
    await c.env.DB.prepare('UPDATE leads SET status = ? WHERE id = ?').bind(status, id).run()
    return c.json({ success: true })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Get all categories
adminRoutes.get('/categories', async (c) => {
  try {
    const categories = await c.env.DB.prepare('SELECT * FROM categories ORDER BY sort_order').all()
    return c.json({ categories: categories.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})

// Enrollments management
adminRoutes.get('/enrollments', async (c) => {
  try {
    const enrollments = await c.env.DB.prepare(`
      SELECT e.*, u.name as student_name, u.email as student_email, c.title as course_title, c.university
      FROM enrollments e JOIN users u ON e.user_id = u.id JOIN courses c ON e.course_id = c.id
      ORDER BY e.enrolled_at DESC
    `).all()
    return c.json({ enrollments: enrollments.results })
  } catch (e: any) { return c.json({ error: e.message }, 500) }
})
