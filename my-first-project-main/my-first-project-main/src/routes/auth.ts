import { Hono } from 'hono'

type Bindings = { DB: D1Database }

export const authRoutes = new Hono<{ Bindings: Bindings }>()

// Register
authRoutes.post('/register', async (c) => {
  const { name, email, phone, password, qualification, city } = await c.req.json()
  if (!name || !email || !password) {
    return c.json({ error: 'Name, email and password are required' }, 400)
  }
  try {
    const existing = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
    if (existing) {
      return c.json({ error: 'Email already registered' }, 409)
    }
    const result = await c.env.DB.prepare(
      'INSERT INTO users (name, email, phone, password_hash, qualification, city) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(name, email, phone || null, password, qualification || null, city || null).run()
    
    const user = await c.env.DB.prepare('SELECT id, name, email, role FROM users WHERE id = ?').bind(result.meta.last_row_id).first()
    return c.json({ success: true, user, token: btoa(JSON.stringify({ id: user.id, role: user.role, exp: Date.now() + 86400000 })) })
  } catch (e: any) {
    return c.json({ error: 'Registration failed: ' + e.message }, 500)
  }
})

// Login
authRoutes.post('/login', async (c) => {
  const { email, password } = await c.req.json()
  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }
  try {
    const user = await c.env.DB.prepare(
      'SELECT id, name, email, role, phone, city, qualification, avatar, is_active FROM users WHERE email = ? AND password_hash = ?'
    ).bind(email, password).first()
    
    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 401)
    }
    if (!user.is_active) {
      return c.json({ error: 'Account is deactivated' }, 403)
    }
    const token = btoa(JSON.stringify({ id: user.id, role: user.role, exp: Date.now() + 86400000 }))
    return c.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, city: user.city, qualification: user.qualification, avatar: user.avatar }, token })
  } catch (e: any) {
    return c.json({ error: 'Login failed: ' + e.message }, 500)
  }
})

// Verify token
authRoutes.post('/verify', async (c) => {
  const { token } = await c.req.json()
  try {
    const decoded = JSON.parse(atob(token))
    if (decoded.exp < Date.now()) {
      return c.json({ valid: false, error: 'Token expired' }, 401)
    }
    const user = await c.env.DB.prepare('SELECT id, name, email, role, avatar FROM users WHERE id = ?').bind(decoded.id).first()
    if (!user) return c.json({ valid: false }, 401)
    return c.json({ valid: true, user })
  } catch {
    return c.json({ valid: false }, 401)
  }
})
