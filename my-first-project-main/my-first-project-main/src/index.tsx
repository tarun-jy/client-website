import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authRoutes } from './routes/auth'
import { courseRoutes } from './routes/courses'
import { adminRoutes } from './routes/admin'
import { studentRoutes } from './routes/student'
import { publicRoutes } from './routes/public'
import { cmsRoutes } from './routes/cms'
import { pageRoutes } from './routes/pages'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())

// API Routes
app.route('/api/auth', authRoutes)
app.route('/api/courses', courseRoutes)
app.route('/api/admin', adminRoutes)
app.route('/api/student', studentRoutes)
app.route('/api/public', publicRoutes)
app.route('/api/cms', cmsRoutes)

// Page Routes (HTML)
app.route('/', pageRoutes)

export default app
