-- CMS: Site Pages (stores full page layout as JSON)
CREATE TABLE IF NOT EXISTS site_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  layout_json TEXT DEFAULT '[]',
  draft_json TEXT DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  is_published INTEGER DEFAULT 1,
  published_at DATETIME,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CMS: Site Settings (header, footer, global CTA, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Blog: Enhanced blog_posts with SEO and more fields
-- Add new columns to existing blog_posts table
ALTER TABLE blog_posts ADD COLUMN meta_title TEXT;
ALTER TABLE blog_posts ADD COLUMN meta_description TEXT;
ALTER TABLE blog_posts ADD COLUMN featured_image TEXT;
ALTER TABLE blog_posts ADD COLUMN content_html TEXT;
ALTER TABLE blog_posts ADD COLUMN reading_time INTEGER DEFAULT 5;
ALTER TABLE blog_posts ADD COLUMN is_featured INTEGER DEFAULT 0;
ALTER TABLE blog_posts ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Blog Categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Course FAQs
CREATE TABLE IF NOT EXISTS course_faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Course Documents (certificates, brochures)
CREATE TABLE IF NOT EXISTS course_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  doc_type TEXT NOT NULL CHECK(doc_type IN ('certificate', 'brochure')),
  title TEXT,
  file_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_site_pages_key ON site_pages(page_key);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_course_faqs_course ON course_faqs(course_id);
CREATE INDEX IF NOT EXISTS idx_course_docs_course ON course_documents(course_id);
CREATE INDEX IF NOT EXISTS idx_blog_featured ON blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published);
