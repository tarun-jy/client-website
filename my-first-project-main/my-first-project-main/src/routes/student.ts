import { Hono } from 'hono'

type Bindings = { DB: D1Database }

export const studentRoutes = new Hono<{ Bindings: Bindings }>()

// Middleware to verify student token
const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  try {
    const token = authHeader.substring(7)
    const decoded = JSON.parse(atob(token))
    if (decoded.exp < Date.now()) return c.json({ error: 'Token expired' }, 401)
    c.set('userId', decoded.id)
    c.set('userRole', decoded.role)
    await next()
  } catch {
    return c.json({ error: 'Invalid token' }, 401)
  }
}

studentRoutes.use('/*', authMiddleware)

// Get student dashboard data
studentRoutes.get('/dashboard', async (c) => {
  const userId = c.get('userId')
  try {
    const user = await c.env.DB.prepare('SELECT id, name, email, phone, city, qualification, avatar, created_at FROM users WHERE id = ?').bind(userId).first()
    const enrollments = await c.env.DB.prepare(`
      SELECT e.*, c.title, c.slug, c.thumbnail, c.duration_weeks, c.university, c.total_modules, c.total_hours, c.certificate_type, cat.name as category_name
      FROM enrollments e 
      JOIN courses c ON e.course_id = c.id 
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE e.user_id = ? ORDER BY e.enrolled_at DESC
    `).bind(userId).all()
    
    const totalCourses = enrollments.results.length
    const completedCourses = enrollments.results.filter((e: any) => e.status === 'completed').length
    const avgProgress = totalCourses > 0 ? Math.round(enrollments.results.reduce((a: number, e: any) => a + (e.progress || 0), 0) / totalCourses) : 0
    
    return c.json({ user, enrollments: enrollments.results, stats: { totalCourses, completedCourses, avgProgress } })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Enroll in a course
studentRoutes.post('/enroll', async (c) => {
  const userId = c.get('userId')
  const { courseId } = await c.req.json()
  try {
    const existing = await c.env.DB.prepare('SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?').bind(userId, courseId).first()
    if (existing) return c.json({ error: 'Already enrolled' }, 409)
    
    const course = await c.env.DB.prepare('SELECT id, price FROM courses WHERE id = ?').bind(courseId).first()
    if (!course) return c.json({ error: 'Course not found' }, 404)
    
    await c.env.DB.prepare(
      'INSERT INTO enrollments (user_id, course_id, payment_amount) VALUES (?, ?, ?)'
    ).bind(userId, courseId, course.price).run()
    
    await c.env.DB.prepare('UPDATE courses SET total_enrolled = total_enrolled + 1 WHERE id = ?').bind(courseId).run()
    
    return c.json({ success: true, message: 'Enrolled successfully' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Update course progress
studentRoutes.put('/progress', async (c) => {
  const userId = c.get('userId')
  const { courseId, progress } = await c.req.json()
  try {
    const status = progress >= 100 ? 'completed' : 'active'
    const completedAt = progress >= 100 ? new Date().toISOString() : null
    await c.env.DB.prepare(
      'UPDATE enrollments SET progress = ?, status = ?, completed_at = ? WHERE user_id = ? AND course_id = ?'
    ).bind(progress, status, completedAt, userId, courseId).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Update profile
studentRoutes.put('/profile', async (c) => {
  const userId = c.get('userId')
  const { name, phone, city, qualification } = await c.req.json()
  try {
    await c.env.DB.prepare(
      'UPDATE users SET name = ?, phone = ?, city = ?, qualification = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(name, phone, city, qualification, userId).run()
    const user = await c.env.DB.prepare('SELECT id, name, email, phone, city, qualification, avatar FROM users WHERE id = ?').bind(userId).first()
    return c.json({ success: true, user })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})
