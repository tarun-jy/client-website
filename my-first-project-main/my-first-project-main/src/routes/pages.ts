import { Hono } from 'hono'
import { homePage } from '../pages/home'
import { coursesPage } from '../pages/courses'
import { courseDetailPage } from '../pages/courseDetail'
import { loginPage } from '../pages/login'
import { registerPage } from '../pages/register'
import { dashboardPage } from '../pages/dashboard'
import { adminPage } from '../pages/admin'
import { aboutPage } from '../pages/about'
import { contactPage } from '../pages/contact'
import { blogPage } from '../pages/blog'
import { blogDetailPage } from '../pages/blogDetail'

type Bindings = { DB: D1Database }

export const pageRoutes = new Hono<{ Bindings: Bindings }>()

pageRoutes.get('/', (c) => c.html(homePage()))
pageRoutes.get('/courses', (c) => c.html(coursesPage()))
pageRoutes.get('/course/:slug', (c) => c.html(courseDetailPage()))
pageRoutes.get('/login', (c) => c.html(loginPage()))
pageRoutes.get('/register', (c) => c.html(registerPage()))
pageRoutes.get('/dashboard', (c) => c.html(dashboardPage()))
pageRoutes.get('/admin', (c) => c.html(adminPage()))
pageRoutes.get('/about', (c) => c.html(aboutPage()))
pageRoutes.get('/contact', (c) => c.html(contactPage()))
pageRoutes.get('/blog', (c) => c.html(blogPage()))
pageRoutes.get('/blog/:slug', (c) => c.html(blogDetailPage()))
