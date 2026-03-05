# UpgradeEDU - Online Higher Education Platform

## Project Overview
- **Name**: UpgradeEDU
- **Goal**: A full-featured EdTech platform similar to upGrad.com with course browsing, student enrollment, learning dashboard, and admin management
- **Tech Stack**: Hono + TypeScript + Cloudflare Pages + D1 Database + Vanilla JS Frontend

## Live URL
- **Platform**: https://3000-iece7hq0txz859976p203-b9b802c4.sandbox.novita.ai

## Features

### Public Pages
- **Homepage** - Hero section, lead form, trending courses, categories, testimonials, university partners, stats
- **Course Listing** - Filter by category/level/search, sort by price/rating/popularity
- **Course Detail** - Full course info, curriculum modules, skills, reviews, enroll CTA
- **About Us** - Company story, values, leadership team
- **Contact** - Contact form, office info, social links

### Student Features
- **Registration** - Full signup with name, email, phone, city, qualification
- **Login** - JWT-based authentication with demo credentials
- **Dashboard** - Enrolled courses with progress tracking, profile edit, certificates
- **Course Enrollment** - One-click enrollment from course detail page
- **Progress Tracking** - Update progress for each enrolled course

### Admin Panel
- **Dashboard** - Total students, courses, enrollments, revenue overview
- **Course Management** - Create, edit, delete courses with full field control
- **Student Management** - View all students, search, view details, activate/deactivate
- **Enrollment Tracking** - View all enrollments with progress and payment status
- **Lead Management** - View and update lead status (new/contacted/converted/closed)

## Demo Credentials
- **Admin**: admin@upgradedu.com / admin123
- **Student**: rahul@test.com / pass123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login (returns JWT token)
- `POST /api/auth/verify` - Verify token

### Courses (Public)
- `GET /api/courses` - List courses (params: category, level, search, featured, trending, limit, offset)
- `GET /api/courses/:slug` - Course detail with modules and testimonials

### Public
- `GET /api/public/categories` - All categories
- `GET /api/public/partners` - University partners
- `GET /api/public/testimonials` - Featured testimonials
- `GET /api/public/blogs` - Blog posts
- `GET /api/public/stats` - Platform statistics
- `POST /api/public/lead` - Submit lead/inquiry form

### Student (Auth Required)
- `GET /api/student/dashboard` - Dashboard data with enrollments
- `POST /api/student/enroll` - Enroll in a course
- `PUT /api/student/progress` - Update course progress
- `PUT /api/student/profile` - Update profile

### Admin (Admin Auth Required)
- `GET /api/admin/dashboard` - Admin stats and analytics
- `GET /api/admin/students` - List students (with search)
- `GET /api/admin/students/:id` - Student detail
- `PUT /api/admin/students/:id/toggle` - Toggle student status
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course (soft)
- `GET /api/admin/leads` - List leads
- `PUT /api/admin/leads/:id` - Update lead status
- `GET /api/admin/categories` - List categories
- `GET /api/admin/enrollments` - List all enrollments

## Data Architecture
- **Database**: Cloudflare D1 (SQLite)
- **Tables**: users, categories, courses, course_modules, enrollments, testimonials, leads, partners, blog_posts
- **Auth**: JWT tokens (base64 encoded, stored in localStorage)

## Page Routes
| Route | Description |
|-------|------------|
| `/` | Homepage |
| `/courses` | Course listing with filters |
| `/course/:slug` | Course detail page |
| `/login` | Student/Admin login |
| `/register` | New student registration |
| `/dashboard` | Student learning dashboard |
| `/admin` | Admin panel (admin only) |
| `/about` | About us page |
| `/contact` | Contact form page |

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active (Development)
- **Database**: D1 with local SQLite for development
- **Last Updated**: 2026-03-03
