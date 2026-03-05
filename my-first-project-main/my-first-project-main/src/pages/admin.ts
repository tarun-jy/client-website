import { layout } from './layout'

export function adminPage() {
  return layout('Admin Panel', `
<div style="display:flex;min-height:calc(100vh - 72px)">
  <!-- Sidebar -->
  <aside style="width:250px;background:var(--primary);color:#fff;padding:24px 0;flex-shrink:0;position:sticky;top:72px;height:calc(100vh - 72px);overflow-y:auto" id="adminSidebar">
    <div style="padding:0 20px 20px;border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,.4);margin-bottom:8px">Admin Panel</div>
      <div style="font-size:15px;font-weight:600" id="adminName">Administrator</div>
    </div>
    <nav style="padding:12px 0">
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,.3);padding:8px 20px 4px">LMS</div>
      <a onclick="switchAdminTab('dashboard')" class="admin-nav active" id="nav-dashboard"><i class="fas fa-chart-pie"></i> Dashboard</a>
      <a onclick="switchAdminTab('courses')" class="admin-nav" id="nav-courses"><i class="fas fa-graduation-cap"></i> Courses</a>
      <a onclick="switchAdminTab('students')" class="admin-nav" id="nav-students"><i class="fas fa-users"></i> Students</a>
      <a onclick="switchAdminTab('enrollments')" class="admin-nav" id="nav-enrollments"><i class="fas fa-clipboard-list"></i> Enrollments</a>
      <a onclick="switchAdminTab('leads')" class="admin-nav" id="nav-leads"><i class="fas fa-phone-alt"></i> Leads</a>
      
      <div style="height:1px;background:rgba(255,255,255,.06);margin:12px 0"></div>
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,.3);padding:8px 20px 4px">CMS</div>
      <a onclick="switchAdminTab('blog')" class="admin-nav" id="nav-blog"><i class="fas fa-newspaper"></i> Blog Manager</a>
      <a onclick="switchAdminTab('siteeditor')" class="admin-nav" id="nav-siteeditor"><i class="fas fa-palette"></i> Website Manager</a>
      <a onclick="switchAdminTab('courseext')" class="admin-nav" id="nav-courseext"><i class="fas fa-puzzle-piece"></i> Course Extensions</a>
    </nav>
  </aside>

  <!-- Main Content -->
  <div style="flex:1;padding:32px;background:var(--bg-gray);overflow-y:auto">
    <!-- Dashboard Tab -->
    <div class="admin-tab active" id="atab-dashboard">
      <h2 style="font-size:24px;font-weight:800;margin-bottom:24px">Dashboard Overview</h2>
      <div class="grid grid-4" style="margin-bottom:32px" id="adminStats"></div>
      <div class="grid grid-2">
        <div style="background:#fff;border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px">
          <h3 style="font-size:16px;font-weight:700;margin-bottom:16px">Recent Enrollments</h3>
          <div id="recentEnrollments"><div class="loader"><div class="spinner"></div></div></div>
        </div>
        <div style="background:#fff;border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px">
          <h3 style="font-size:16px;font-weight:700;margin-bottom:16px">Revenue by Category</h3>
          <div id="categoryStats"><div class="loader"><div class="spinner"></div></div></div>
        </div>
      </div>
    </div>

    <!-- Courses Tab -->
    <div class="admin-tab" id="atab-courses">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <h2 style="font-size:24px;font-weight:800">Manage Courses</h2>
        <button onclick="openCourseModal()" class="btn btn-primary"><i class="fas fa-plus"></i> Add Course</button>
      </div>
      <div id="adminCourses"><div class="loader"><div class="spinner"></div></div></div>
    </div>

    <!-- Students Tab -->
    <div class="admin-tab" id="atab-students">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <h2 style="font-size:24px;font-weight:800">Students</h2>
        <input type="text" class="form-input" style="width:280px" placeholder="Search students..." oninput="searchStudents(this.value)">
      </div>
      <div id="adminStudents"><div class="loader"><div class="spinner"></div></div></div>
    </div>

    <!-- Enrollments Tab -->
    <div class="admin-tab" id="atab-enrollments">
      <h2 style="font-size:24px;font-weight:800;margin-bottom:24px">All Enrollments</h2>
      <div id="adminEnrollments"><div class="loader"><div class="spinner"></div></div></div>
    </div>

    <!-- Leads Tab -->
    <div class="admin-tab" id="atab-leads">
      <h2 style="font-size:24px;font-weight:800;margin-bottom:24px">Leads & Inquiries</h2>
      <div id="adminLeads"><div class="loader"><div class="spinner"></div></div></div>
    </div>

    <!-- Blog Manager Tab -->
    <div class="admin-tab" id="atab-blog">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <h2 style="font-size:24px;font-weight:800">Blog Manager</h2>
        <div style="display:flex;gap:8px">
          <select class="form-input" style="width:140px" id="blogFilterStatus" onchange="loadAdminBlogs()">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <button onclick="openBlogModal()" class="btn btn-primary"><i class="fas fa-plus"></i> New Article</button>
        </div>
      </div>
      <div id="adminBlogs"><div class="loader"><div class="spinner"></div></div></div>
    </div>

    <!-- Website Manager Tab -->
    <div class="admin-tab" id="atab-siteeditor">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <h2 style="font-size:24px;font-weight:800">Website Manager</h2>
        <div style="display:flex;gap:8px">
          <button onclick="openPageEditor()" class="btn btn-primary"><i class="fas fa-plus"></i> New Page</button>
        </div>
      </div>
      
      <!-- Page list -->
      <div style="background:#fff;border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;margin-bottom:24px">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:16px">Managed Pages</h3>
        <div id="cmsPageList"><div class="loader"><div class="spinner"></div></div></div>
      </div>
      
      <!-- Site Settings -->
      <div style="background:#fff;border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:16px">Site Settings</h3>
        <div class="grid grid-2" style="gap:16px">
          <div class="form-group">
            <label class="form-label">Header Announcement</label>
            <input type="text" class="form-input" id="ss_announcement" placeholder="e.g., Admissions Open for April 2026 Batch">
          </div>
          <div class="form-group">
            <label class="form-label">Hero CTA Text</label>
            <input type="text" class="form-input" id="ss_hero_cta" placeholder="e.g., Explore Programs">
          </div>
          <div class="form-group">
            <label class="form-label">Footer Copyright Text</label>
            <input type="text" class="form-input" id="ss_footer_copyright" placeholder="e.g., 2026 UpgradeEDU. All rights reserved.">
          </div>
          <div class="form-group">
            <label class="form-label">Contact Email</label>
            <input type="text" class="form-input" id="ss_contact_email" placeholder="e.g., hello@upgradeedu.com">
          </div>
        </div>
        <button onclick="saveSiteSettings()" class="btn btn-primary" style="margin-top:8px"><i class="fas fa-save"></i> Save Settings</button>
      </div>
    </div>

    <!-- Course Extensions Tab -->
    <div class="admin-tab" id="atab-courseext">
      <h2 style="font-size:24px;font-weight:800;margin-bottom:24px">Course Extensions</h2>
      <div class="form-group">
        <label class="form-label">Select Course</label>
        <select class="form-input" id="ceSelectCourse" onchange="loadCourseExtensions(this.value)" style="max-width:400px">
          <option value="">-- Select a course --</option>
        </select>
      </div>
      
      <div id="courseExtContent" style="display:none">
        <!-- FAQs -->
        <div style="background:#fff;border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;margin-bottom:24px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:16px;font-weight:700"><i class="fas fa-question-circle" style="color:var(--accent);margin-right:6px"></i>FAQs</h3>
            <button onclick="openFaqModal()" class="btn btn-outline btn-sm"><i class="fas fa-plus"></i> Add FAQ</button>
          </div>
          <div id="ceFaqList"></div>
        </div>
        
        <!-- Documents -->
        <div style="background:#fff;border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;margin-bottom:24px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:16px;font-weight:700"><i class="fas fa-file-pdf" style="color:var(--orange);margin-right:6px"></i>Documents (Certificate Preview & Brochure)</h3>
            <button onclick="openDocModal()" class="btn btn-outline btn-sm"><i class="fas fa-plus"></i> Add Document</button>
          </div>
          <div id="ceDocList"></div>
        </div>
        
        <!-- Highlights Editor -->
        <div style="background:#fff;border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px">
          <h3 style="font-size:16px;font-weight:700;margin-bottom:16px"><i class="fas fa-star" style="color:var(--green);margin-right:6px"></i>Highlights</h3>
          <textarea class="form-input" id="ceHighlights" rows="4" placeholder="Comma separated highlights, e.g.: Industry projects,Live sessions,Career assistance"></textarea>
          <button onclick="saveHighlights()" class="btn btn-primary btn-sm" style="margin-top:10px"><i class="fas fa-save"></i> Save Highlights</button>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- Course Modal -->
<div class="modal-overlay" id="courseModal">
  <div class="modal" style="max-width:640px">
    <div class="modal-header">
      <h3 id="courseModalTitle">Add New Course</h3>
      <div class="modal-close" onclick="closeCourseModal()"><i class="fas fa-times"></i></div>
    </div>
    <div class="modal-body">
      <form onsubmit="saveCourse(event)" id="courseForm">
        <div class="form-group"><label class="form-label">Course Title *</label><input type="text" class="form-input" id="cf_title" required></div>
        <div class="form-group"><label class="form-label">Subtitle</label><input type="text" class="form-input" id="cf_subtitle"></div>
        <div class="form-group"><label class="form-label">Short Description</label><textarea class="form-input" id="cf_short_description" rows="2"></textarea></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group"><label class="form-label">Category *</label><select class="form-input" id="cf_category_id" required></select></div>
          <div class="form-group"><label class="form-label">University</label><input type="text" class="form-input" id="cf_university"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group"><label class="form-label">Instructor</label><input type="text" class="form-input" id="cf_instructor_name"></div>
          <div class="form-group"><label class="form-label">Instructor Title</label><input type="text" class="form-input" id="cf_instructor_title"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
          <div class="form-group"><label class="form-label">Price (INR) *</label><input type="number" class="form-input" id="cf_price" required></div>
          <div class="form-group"><label class="form-label">Original Price</label><input type="number" class="form-input" id="cf_original_price"></div>
          <div class="form-group"><label class="form-label">EMI Amount</label><input type="number" class="form-input" id="cf_emi_amount"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
          <div class="form-group"><label class="form-label">Duration (weeks)</label><input type="number" class="form-input" id="cf_duration_weeks"></div>
          <div class="form-group"><label class="form-label">Level</label><select class="form-input" id="cf_level"><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Executive</option></select></div>
          <div class="form-group"><label class="form-label">Start Date</label><input type="date" class="form-input" id="cf_start_date"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group"><label class="form-label">Total Modules</label><input type="number" class="form-input" id="cf_total_modules"></div>
          <div class="form-group"><label class="form-label">Total Hours</label><input type="number" class="form-input" id="cf_total_hours"></div>
        </div>
        <div class="form-group"><label class="form-label">Certificate Type</label><input type="text" class="form-input" id="cf_certificate_type" placeholder="e.g., PG Certificate, MSc Degree"></div>
        <div class="form-group"><label class="form-label">Skills (comma-separated)</label><input type="text" class="form-input" id="cf_skills" placeholder="Python,ML,Deep Learning"></div>
        <div class="form-group"><label class="form-label">Highlights (comma-separated)</label><textarea class="form-input" id="cf_highlights" rows="2" placeholder="Industry projects,Live mentorship"></textarea></div>
        <div style="display:flex;gap:16px">
          <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" id="cf_is_featured" style="accent-color:var(--accent)"> Featured</label>
          <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" id="cf_is_trending" style="accent-color:var(--accent)"> Trending</label>
          <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" id="cf_emi_available" style="accent-color:var(--accent)"> EMI Available</label>
        </div>
        <input type="hidden" id="cf_edit_id">
        <div class="modal-footer" style="padding:16px 0 0;border-top:0">
          <button type="button" onclick="closeCourseModal()" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary" id="cf_submit">Save Course</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Student Detail Modal -->
<div class="modal-overlay" id="studentModal">
  <div class="modal" style="max-width:600px">
    <div class="modal-header"><h3>Student Details</h3><div class="modal-close" onclick="closeStudentModal()"><i class="fas fa-times"></i></div></div>
    <div class="modal-body" id="studentDetail"><div class="loader"><div class="spinner"></div></div></div>
  </div>
</div>

<!-- Blog Modal -->
<div class="modal-overlay" id="blogModal">
  <div class="modal" style="max-width:720px">
    <div class="modal-header">
      <h3 id="blogModalTitle">New Article</h3>
      <div class="modal-close" onclick="closeBlogModal()"><i class="fas fa-times"></i></div>
    </div>
    <div class="modal-body">
      <form onsubmit="saveBlog(event)" id="blogForm">
        <div class="form-group"><label class="form-label">Title *</label><input type="text" class="form-input" id="bf_title" required></div>
        <div class="form-group"><label class="form-label">Excerpt</label><textarea class="form-input" id="bf_excerpt" rows="2" placeholder="Brief summary for listings..."></textarea></div>
        <div class="form-group"><label class="form-label">Content (HTML supported)</label><textarea class="form-input" id="bf_content" rows="10" placeholder="Write your article content here... HTML tags are supported."></textarea></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group"><label class="form-label">Author</label><input type="text" class="form-input" id="bf_author" placeholder="Author name"></div>
          <div class="form-group"><label class="form-label">Category</label><input type="text" class="form-input" id="bf_category" placeholder="e.g., Data Science, Career"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group"><label class="form-label">Tags (comma-separated)</label><input type="text" class="form-input" id="bf_tags" placeholder="career,tech,guide"></div>
          <div class="form-group"><label class="form-label">Reading Time (min)</label><input type="number" class="form-input" id="bf_reading_time" value="5"></div>
        </div>
        <div class="form-group"><label class="form-label">Featured Image URL</label><input type="text" class="form-input" id="bf_image" placeholder="https://..."></div>
        <div style="padding:16px;background:var(--bg-gray);border-radius:var(--radius-lg);margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px;color:var(--text-light)">SEO Settings</h4>
          <div class="form-group" style="margin-bottom:12px"><label class="form-label">Meta Title</label><input type="text" class="form-input" id="bf_meta_title" placeholder="Custom SEO title (defaults to article title)"></div>
          <div class="form-group" style="margin-bottom:0"><label class="form-label">Meta Description</label><textarea class="form-input" id="bf_meta_description" rows="2" placeholder="SEO description (defaults to excerpt)"></textarea></div>
        </div>
        <div style="display:flex;gap:16px">
          <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" id="bf_published" style="accent-color:var(--green)"> Published</label>
          <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" id="bf_featured" style="accent-color:var(--accent)"> Featured</label>
        </div>
        <input type="hidden" id="bf_edit_id">
        <div class="modal-footer" style="padding:16px 0 0;border-top:0">
          <button type="button" onclick="closeBlogModal()" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary" id="bf_submit">Save Article</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Page Editor Modal -->
<div class="modal-overlay" id="pageEditorModal">
  <div class="modal" style="max-width:900px;max-height:95vh">
    <div class="modal-header">
      <h3 id="pageEditorTitle">Page Editor</h3>
      <div class="modal-close" onclick="closePageEditor()"><i class="fas fa-times"></i></div>
    </div>
    <div class="modal-body" style="padding:0;max-height:70vh;overflow-y:auto">
      <div style="padding:24px;border-bottom:1px solid var(--border)">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group" style="margin-bottom:0"><label class="form-label">Page Key *</label><input type="text" class="form-input" id="pe_key" placeholder="e.g., homepage, about-us" required></div>
          <div class="form-group" style="margin-bottom:0"><label class="form-label">Page Title</label><input type="text" class="form-input" id="pe_title" placeholder="Page title"></div>
        </div>
      </div>
      
      <!-- Section Builder -->
      <div style="padding:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <h4 style="font-size:15px;font-weight:700">Page Sections</h4>
          <div style="display:flex;gap:6px">
            <button type="button" onclick="addSection('hero')" class="btn btn-outline btn-sm"><i class="fas fa-image"></i> Hero</button>
            <button type="button" onclick="addSection('text')" class="btn btn-outline btn-sm"><i class="fas fa-paragraph"></i> Text</button>
            <button type="button" onclick="addSection('cards')" class="btn btn-outline btn-sm"><i class="fas fa-th-large"></i> Cards</button>
            <button type="button" onclick="addSection('cta')" class="btn btn-outline btn-sm"><i class="fas fa-bullhorn"></i> CTA</button>
            <button type="button" onclick="addSection('features')" class="btn btn-outline btn-sm"><i class="fas fa-list"></i> Features</button>
          </div>
        </div>
        <div id="pageSections" style="min-height:100px;border:2px dashed var(--border);border-radius:var(--radius-lg);padding:12px">
          <div class="empty" style="padding:32px"><i class="fas fa-layer-group"></i><p style="font-size:13px;color:var(--text-light)">Add sections using the buttons above. Drag to reorder.</p></div>
        </div>
      </div>
      
      <!-- SEO Settings -->
      <div style="padding:0 24px 24px">
        <div style="padding:16px;background:var(--bg-gray);border-radius:var(--radius-lg)">
          <h4 style="font-size:13px;font-weight:700;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px;color:var(--text-light)">SEO</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="form-group" style="margin-bottom:0"><label class="form-label">Meta Title</label><input type="text" class="form-input" id="pe_meta_title"></div>
            <div class="form-group" style="margin-bottom:0"><label class="form-label">Meta Description</label><input type="text" class="form-input" id="pe_meta_desc"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" onclick="closePageEditor()" class="btn btn-outline">Cancel</button>
      <button type="button" onclick="savePageDraft()" class="btn btn-outline" style="border-color:var(--orange);color:var(--orange)"><i class="fas fa-save"></i> Save Draft</button>
      <button type="button" onclick="publishPage()" class="btn btn-primary"><i class="fas fa-globe"></i> Publish</button>
    </div>
  </div>
</div>

<!-- FAQ Modal -->
<div class="modal-overlay" id="faqModal">
  <div class="modal" style="max-width:560px">
    <div class="modal-header"><h3 id="faqModalTitle">Add FAQ</h3><div class="modal-close" onclick="closeFaqModal()"><i class="fas fa-times"></i></div></div>
    <div class="modal-body">
      <form onsubmit="saveFaq(event)" id="faqForm">
        <div class="form-group"><label class="form-label">Question *</label><input type="text" class="form-input" id="fq_question" required></div>
        <div class="form-group"><label class="form-label">Answer *</label><textarea class="form-input" id="fq_answer" rows="4" required></textarea></div>
        <div class="form-group"><label class="form-label">Sort Order</label><input type="number" class="form-input" id="fq_order" value="0"></div>
        <input type="hidden" id="fq_edit_id">
        <div class="modal-footer" style="padding:16px 0 0;border-top:0">
          <button type="button" onclick="closeFaqModal()" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary">Save FAQ</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Document Modal -->
<div class="modal-overlay" id="docModal">
  <div class="modal" style="max-width:500px">
    <div class="modal-header"><h3>Add Document</h3><div class="modal-close" onclick="closeDocModal()"><i class="fas fa-times"></i></div></div>
    <div class="modal-body">
      <form onsubmit="saveDoc(event)" id="docForm">
        <div class="form-group"><label class="form-label">Type *</label><select class="form-input" id="dc_type" required><option value="certificate">Certificate Preview</option><option value="brochure">Brochure PDF</option></select></div>
        <div class="form-group"><label class="form-label">Title</label><input type="text" class="form-input" id="dc_title" placeholder="e.g., Sample Certificate"></div>
        <div class="form-group"><label class="form-label">File URL *</label><input type="text" class="form-input" id="dc_url" required placeholder="https://..."></div>
        <div class="modal-footer" style="padding:16px 0 0;border-top:0">
          <button type="button" onclick="closeDocModal()" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Document</button>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
.admin-nav{display:flex;align-items:center;gap:10px;padding:10px 20px;font-size:14px;color:rgba(255,255,255,.6);cursor:pointer;transition:all .2s;border-left:3px solid transparent}
.admin-nav:hover{color:#fff;background:rgba(255,255,255,.05)}
.admin-nav.active{color:#fff;background:rgba(233,69,96,.15);border-left-color:var(--accent)}
.admin-nav i{width:18px;text-align:center;font-size:15px}
.admin-tab{display:none}
.admin-tab.active{display:block}
.section-item{border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:8px;background:#fff;display:flex;align-items:center;gap:12px;cursor:grab}
.section-item:active{cursor:grabbing;box-shadow:var(--shadow-md)}
.section-item .drag-handle{color:var(--text-lighter);font-size:16px}
.section-item .section-info{flex:1}
.section-item .section-actions{display:flex;gap:4px}
@media(max-width:768px){
  #adminSidebar{display:none}
  .admin-tab .grid-4{grid-template-columns:repeat(2,1fr) !important}
  .admin-tab .grid-2{grid-template-columns:1fr !important}
}
</style>

<script>
// Check admin auth
(function(){
  const auth=getAuth();
  if(!auth||auth.user.role!=='admin'){window.location.href='/login';return}
  const el=document.getElementById('adminName');
  if(el)el.textContent=auth.user.name;
})();

function switchAdminTab(name){
  document.querySelectorAll('.admin-nav').forEach(n=>n.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('nav-'+name).classList.add('active');
  document.getElementById('atab-'+name).classList.add('active');
  
  if(name==='dashboard')loadAdminDashboard();
  if(name==='courses')loadAdminCourses();
  if(name==='students')loadAdminStudents();
  if(name==='enrollments')loadAdminEnrollments();
  if(name==='leads')loadAdminLeads();
  if(name==='blog')loadAdminBlogs();
  if(name==='siteeditor')loadCmsPages();
  if(name==='courseext')loadCourseSelector();
}

// ============ DASHBOARD ============
async function loadAdminDashboard(){
  try{
    const data=await api('/api/admin/dashboard');
    const s=data.stats;
    document.getElementById('adminStats').innerHTML=\`
      <div class="stat-card"><div class="stat-icon" style="background:rgba(233,69,96,.1)"><i class="fas fa-users" style="color:var(--accent)"></i></div><div class="stat-value">\${s.totalStudents}</div><div class="stat-label">Total Students</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(244,121,32,.1)"><i class="fas fa-graduation-cap" style="color:var(--orange)"></i></div><div class="stat-value">\${s.totalCourses}</div><div class="stat-label">Active Courses</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(0,204,153,.1)"><i class="fas fa-clipboard-check" style="color:var(--green)"></i></div><div class="stat-value">\${s.totalEnrollments}</div><div class="stat-label">Total Enrollments</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(37,99,235,.1)"><i class="fas fa-indian-rupee-sign" style="color:var(--blue)"></i></div><div class="stat-value">\${formatPrice(s.totalRevenue)}</div><div class="stat-label">Total Revenue</div></div>
    \`;
    document.getElementById('recentEnrollments').innerHTML=data.recentEnrollments.length?\`
      <div>\${data.recentEnrollments.slice(0,5).map(e=>\`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)">
          <div><div style="font-size:14px;font-weight:600">\${e.student_name}</div><div style="font-size:12px;color:var(--text-light)">\${e.course_title}</div></div>
          <span class="badge \${e.payment_status==='paid'?'badge-green':'badge-orange'}">\${e.payment_status}</span>
        </div>\`).join('')}</div>
    \`:'<p style="color:var(--text-light)">No enrollments yet</p>';
    document.getElementById('categoryStats').innerHTML=data.categoryStats.length?\`
      <div>\${data.categoryStats.map(c=>\`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:14px;font-weight:500">\${c.name}</span>
          <div style="text-align:right"><div style="font-size:14px;font-weight:700">\${c.enrollments||0} enrolled</div><div style="font-size:12px;color:var(--green)">\${formatPrice(c.revenue||0)}</div></div>
        </div>\`).join('')}</div>
    \`:'<p style="color:var(--text-light)">No data</p>';
  }catch(e){showToast(e.message,'error')}
}

// ============ COURSES ============
async function loadAdminCourses(){
  try{
    const data=await api('/api/courses?limit=50');
    document.getElementById('adminCourses').innerHTML=\`
      <div class="table-wrap"><table>
        <thead><tr><th>Course</th><th>University</th><th>Price</th><th>Enrolled</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>\${(data.courses||[]).map(c=>\`
          <tr>
            <td><div style="font-weight:600;font-size:14px">\${c.title}</div><div style="font-size:12px;color:var(--text-light)">\${c.level} &middot; \${c.duration_weeks}w</div></td>
            <td style="font-size:13px">\${c.university||'-'}</td>
            <td style="font-weight:600">\${formatPrice(c.price)}</td>
            <td>\${(c.total_enrolled||0).toLocaleString()}</td>
            <td><i class="fas fa-star" style="color:#f59e0b;font-size:11px"></i> \${c.rating}</td>
            <td>\${c.is_featured?'<span class="badge badge-red">Featured</span>':''}\${c.is_trending?'<span class="badge badge-orange">Trending</span>':''}</td>
            <td>
              <button onclick="editCourse(\${c.id})" class="btn btn-outline btn-sm" style="padding:4px 10px"><i class="fas fa-edit"></i></button>
              <button onclick="deleteCourse(\${c.id})" class="btn btn-danger btn-sm" style="padding:4px 10px"><i class="fas fa-trash"></i></button>
            </td>
          </tr>\`).join('')}</tbody>
      </table></div>
    \`;
  }catch(e){showToast(e.message,'error')}
}

// ============ STUDENTS ============
let searchStudentTimeout;
function searchStudents(q){clearTimeout(searchStudentTimeout);searchStudentTimeout=setTimeout(()=>loadAdminStudents(q),300)}

async function loadAdminStudents(search=''){
  try{
    const data=await api('/api/admin/students?search='+encodeURIComponent(search));
    document.getElementById('adminStudents').innerHTML=\`
      <div class="table-wrap"><table>
        <thead><tr><th>Student</th><th>Email</th><th>Phone</th><th>City</th><th>Courses</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>\${(data.students||[]).map(s=>\`
          <tr>
            <td style="font-weight:600">\${s.name}</td>
            <td style="font-size:13px">\${s.email}</td>
            <td style="font-size:13px">\${s.phone||'-'}</td>
            <td style="font-size:13px">\${s.city||'-'}</td>
            <td><span class="badge badge-blue">\${s.course_count}</span></td>
            <td>\${s.is_active?'<span class="badge badge-green">Active</span>':'<span class="badge badge-red">Inactive</span>'}</td>
            <td>
              <button onclick="viewStudent(\${s.id})" class="btn btn-outline btn-sm" style="padding:4px 10px"><i class="fas fa-eye"></i></button>
              <button onclick="toggleStudent(\${s.id})" class="btn btn-sm \${s.is_active?'btn-danger':'btn-green'}" style="padding:4px 10px"><i class="fas fa-\${s.is_active?'ban':'check'}"></i></button>
            </td>
          </tr>\`).join('')}</tbody>
      </table></div>
    \`;
  }catch(e){showToast(e.message,'error')}
}

// ============ ENROLLMENTS ============
async function loadAdminEnrollments(){
  try{
    const data=await api('/api/admin/enrollments');
    document.getElementById('adminEnrollments').innerHTML=\`
      <div class="table-wrap"><table>
        <thead><tr><th>Student</th><th>Course</th><th>University</th><th>Progress</th><th>Status</th><th>Payment</th><th>Date</th></tr></thead>
        <tbody>\${(data.enrollments||[]).map(e=>\`
          <tr>
            <td><div style="font-weight:600">\${e.student_name}</div><div style="font-size:12px;color:var(--text-light)">\${e.student_email}</div></td>
            <td style="font-size:13px;font-weight:500">\${e.course_title}</td>
            <td style="font-size:13px">\${e.university||''}</td>
            <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar" style="width:80px"><div class="progress-fill" style="width:\${e.progress}%"></div></div><span style="font-size:12px;font-weight:600">\${e.progress}%</span></div></td>
            <td><span class="badge \${e.status==='completed'?'badge-green':e.status==='active'?'badge-blue':'badge-orange'}">\${e.status}</span></td>
            <td style="font-weight:600">\${formatPrice(e.payment_amount)}</td>
            <td style="font-size:13px;color:var(--text-light)">\${new Date(e.enrolled_at).toLocaleDateString('en-IN')}</td>
          </tr>\`).join('')}</tbody>
      </table></div>
    \`;
  }catch(e){showToast(e.message,'error')}
}

// ============ LEADS ============
async function loadAdminLeads(){
  try{
    const data=await api('/api/admin/leads');
    document.getElementById('adminLeads').innerHTML=\`
      <div class="table-wrap"><table>
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Interest</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>\${(data.leads||[]).map(l=>\`
          <tr>
            <td style="font-weight:600">\${l.name}</td>
            <td style="font-size:13px">\${l.email}</td>
            <td style="font-size:13px">\${l.phone||'-'}</td>
            <td style="font-size:13px">\${l.course_interest||'-'}</td>
            <td><span class="badge \${{new:'badge-blue',contacted:'badge-orange',converted:'badge-green',closed:'badge-red'}[l.status]||'badge-blue'}">\${l.status}</span></td>
            <td style="font-size:13px;color:var(--text-light)">\${new Date(l.created_at).toLocaleDateString('en-IN')}</td>
            <td>
              <select class="form-input" style="padding:4px 8px;font-size:12px;width:auto" onchange="updateLead(\${l.id},this.value)">
                <option value="new" \${l.status==='new'?'selected':''}>New</option>
                <option value="contacted" \${l.status==='contacted'?'selected':''}>Contacted</option>
                <option value="converted" \${l.status==='converted'?'selected':''}>Converted</option>
                <option value="closed" \${l.status==='closed'?'selected':''}>Closed</option>
              </select>
            </td>
          </tr>\`).join('')}</tbody>
      </table></div>
    \`;
  }catch(e){showToast(e.message,'error')}
}

// ============ BLOG MANAGER ============
async function loadAdminBlogs(){
  try{
    const status=document.getElementById('blogFilterStatus').value;
    const data=await api('/api/cms/blogs?status='+status);
    document.getElementById('adminBlogs').innerHTML=\`
      <div class="table-wrap"><table>
        <thead><tr><th>Title</th><th>Author</th><th>Category</th><th>Views</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>\${(data.blogs||[]).map(b=>\`
          <tr>
            <td><div style="font-weight:600;font-size:14px">\${b.title}</div><div style="font-size:12px;color:var(--text-light)">/blog/\${b.slug}</div></td>
            <td style="font-size:13px">\${b.author_name||'-'}</td>
            <td><span class="badge badge-blue">\${b.category||'General'}</span></td>
            <td style="font-size:13px">\${(b.views||0).toLocaleString()}</td>
            <td>\${b.is_published?'<span class="badge badge-green">Published</span>':'<span class="badge badge-orange">Draft</span>'}\${b.is_featured?'<span class="badge badge-red" style="margin-left:4px">Featured</span>':''}</td>
            <td style="font-size:13px;color:var(--text-light)">\${new Date(b.created_at).toLocaleDateString('en-IN')}</td>
            <td>
              <button onclick="editBlog(\${b.id})" class="btn btn-outline btn-sm" style="padding:4px 10px"><i class="fas fa-edit"></i></button>
              <button onclick="deleteBlog(\${b.id})" class="btn btn-danger btn-sm" style="padding:4px 10px"><i class="fas fa-trash"></i></button>
            </td>
          </tr>\`).join('')}</tbody>
      </table></div>
    \`;
    if(!(data.blogs||[]).length) document.getElementById('adminBlogs').innerHTML='<div class="empty"><i class="fas fa-newspaper"></i><h3>No Articles</h3><p>Create your first blog article</p></div>';
  }catch(e){showToast(e.message,'error')}
}

function openBlogModal(blog){
  document.getElementById('blogModal').classList.add('open');
  document.getElementById('blogModalTitle').textContent=blog?'Edit Article':'New Article';
  document.getElementById('blogForm').reset();
  document.getElementById('bf_edit_id').value='';
  if(blog){
    document.getElementById('bf_edit_id').value=blog.id;
    document.getElementById('bf_title').value=blog.title||'';
    document.getElementById('bf_excerpt').value=blog.excerpt||'';
    document.getElementById('bf_content').value=blog.content||blog.content_html||'';
    document.getElementById('bf_author').value=blog.author_name||'';
    document.getElementById('bf_category').value=blog.category||'';
    document.getElementById('bf_tags').value=blog.tags||'';
    document.getElementById('bf_reading_time').value=blog.reading_time||5;
    document.getElementById('bf_image').value=blog.featured_image||blog.thumbnail||'';
    document.getElementById('bf_meta_title').value=blog.meta_title||'';
    document.getElementById('bf_meta_description').value=blog.meta_description||'';
    document.getElementById('bf_published').checked=!!blog.is_published;
    document.getElementById('bf_featured').checked=!!blog.is_featured;
  }
}
function closeBlogModal(){document.getElementById('blogModal').classList.remove('open')}

async function saveBlog(e){
  e.preventDefault();
  const editId=document.getElementById('bf_edit_id').value;
  const body={
    title:document.getElementById('bf_title').value,
    excerpt:document.getElementById('bf_excerpt').value,
    content:document.getElementById('bf_content').value,
    content_html:document.getElementById('bf_content').value,
    author_name:document.getElementById('bf_author').value,
    category:document.getElementById('bf_category').value,
    tags:document.getElementById('bf_tags').value,
    reading_time:parseInt(document.getElementById('bf_reading_time').value)||5,
    featured_image:document.getElementById('bf_image').value,
    thumbnail:document.getElementById('bf_image').value,
    meta_title:document.getElementById('bf_meta_title').value,
    meta_description:document.getElementById('bf_meta_description').value,
    is_published:document.getElementById('bf_published').checked,
    is_featured:document.getElementById('bf_featured').checked
  };
  try{
    if(editId){await api('/api/cms/blogs/'+editId,{method:'PUT',body:JSON.stringify(body)})}
    else{await api('/api/cms/blogs',{method:'POST',body:JSON.stringify(body)})}
    showToast(editId?'Article updated':'Article created','success');
    closeBlogModal();loadAdminBlogs();
  }catch(e){showToast(e.message,'error')}
}

async function editBlog(id){
  try{const data=await api('/api/cms/blogs/'+id);openBlogModal(data.blog)}catch(e){showToast(e.message,'error')}
}

async function deleteBlog(id){
  if(!confirm('Delete this article permanently?'))return;
  try{await api('/api/cms/blogs/'+id,{method:'DELETE'});showToast('Article deleted','success');loadAdminBlogs()}catch(e){showToast(e.message,'error')}
}

// ============ WEBSITE MANAGER ============
let pageSections = [];
let editingPageKey = null;

async function loadCmsPages(){
  try{
    const data=await api('/api/cms/pages');
    const list=document.getElementById('cmsPageList');
    if(!(data.pages||[]).length){list.innerHTML='<p style="color:var(--text-light);font-size:13px">No managed pages yet. Click "New Page" to create one.</p>';return;}
    list.innerHTML=\`
      <div class="table-wrap"><table>
        <thead><tr><th>Page</th><th>Key</th><th>Status</th><th>Last Updated</th><th>Actions</th></tr></thead>
        <tbody>\${data.pages.map(p=>\`
          <tr>
            <td style="font-weight:600">\${p.title}</td>
            <td style="font-size:13px;color:var(--text-light)">\${p.page_key}</td>
            <td>\${p.is_published?'<span class="badge badge-green">Published</span>':'<span class="badge badge-orange">Draft</span>'}</td>
            <td style="font-size:13px;color:var(--text-light)">\${new Date(p.updated_at).toLocaleDateString('en-IN')}</td>
            <td>
              <button onclick="editPage('\${p.page_key}')" class="btn btn-outline btn-sm" style="padding:4px 10px"><i class="fas fa-edit"></i></button>
              <button onclick="deletePage('\${p.page_key}')" class="btn btn-danger btn-sm" style="padding:4px 10px"><i class="fas fa-trash"></i></button>
            </td>
          </tr>\`).join('')}</tbody>
      </table></div>
    \`;
    // Load settings
    try{
      const sdata=await api('/api/cms/settings');
      const ss=sdata.settings||{};
      document.getElementById('ss_announcement').value=ss.announcement||'';
      document.getElementById('ss_hero_cta').value=ss.hero_cta||'';
      document.getElementById('ss_footer_copyright').value=ss.footer_copyright||'';
      document.getElementById('ss_contact_email').value=ss.contact_email||'';
    }catch(e){}
  }catch(e){showToast(e.message,'error')}
}

async function saveSiteSettings(){
  try{
    await api('/api/cms/settings',{method:'PUT',body:JSON.stringify({settings:{
      announcement:document.getElementById('ss_announcement').value,
      hero_cta:document.getElementById('ss_hero_cta').value,
      footer_copyright:document.getElementById('ss_footer_copyright').value,
      contact_email:document.getElementById('ss_contact_email').value
    }})});
    showToast('Site settings saved','success');
  }catch(e){showToast(e.message,'error')}
}

function openPageEditor(pageData){
  document.getElementById('pageEditorModal').classList.add('open');
  pageSections=[];
  editingPageKey=null;
  document.getElementById('pe_key').value='';
  document.getElementById('pe_title').value='';
  document.getElementById('pe_meta_title').value='';
  document.getElementById('pe_meta_desc').value='';
  
  if(pageData){
    editingPageKey=pageData.page_key;
    document.getElementById('pe_key').value=pageData.page_key;
    document.getElementById('pe_key').disabled=true;
    document.getElementById('pe_title').value=pageData.title||'';
    document.getElementById('pe_meta_title').value=pageData.meta_title||'';
    document.getElementById('pe_meta_desc').value=pageData.meta_description||'';
    try{pageSections=JSON.parse(pageData.draft_json||pageData.layout_json||'[]')}catch(e){pageSections=[]}
  }else{
    document.getElementById('pe_key').disabled=false;
  }
  renderSections();
}
function closePageEditor(){document.getElementById('pageEditorModal').classList.remove('open');document.getElementById('pe_key').disabled=false;}

function addSection(type){
  const templates={
    hero:{type:'hero',heading:'Your Headline Here',subheading:'Describe your value proposition',btnText:'Get Started',btnUrl:'/courses',bgColor:'#1a1a2e'},
    text:{type:'text',heading:'Section Title',content:'Add your content here. This is a rich text block where you can add paragraphs, lists, and more.'},
    cards:{type:'cards',heading:'Features',items:[{title:'Card 1',description:'Description for card 1',icon:'fa-star'},{title:'Card 2',description:'Description for card 2',icon:'fa-rocket'},{title:'Card 3',description:'Description for card 3',icon:'fa-heart'}]},
    cta:{type:'cta',heading:'Ready to Get Started?',subheading:'Join thousands of learners today',btnText:'Explore Programs',btnUrl:'/courses',bgGradient:'#e94560,#f47920'},
    features:{type:'features',heading:'Key Features',items:[{title:'Feature 1',description:'Feature description',icon:'fa-check-circle'},{title:'Feature 2',description:'Feature description',icon:'fa-check-circle'}]}
  };
  pageSections.push({...templates[type],id:Date.now()});
  renderSections();
}

function renderSections(){
  const container=document.getElementById('pageSections');
  if(!pageSections.length){
    container.innerHTML='<div class="empty" style="padding:32px"><i class="fas fa-layer-group"></i><p style="font-size:13px;color:var(--text-light)">Add sections using the buttons above</p></div>';
    return;
  }
  container.innerHTML=pageSections.map((s,i)=>\`
    <div class="section-item" draggable="true" data-idx="\${i}" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="dropSection(event)">
      <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
      <div class="section-info">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="badge \${{hero:'badge-red',text:'badge-blue',cards:'badge-orange',cta:'badge-green',features:'badge-blue'}[s.type]||'badge-blue'}">\${s.type}</span>
          <span style="font-size:14px;font-weight:600">\${s.heading||s.type}</span>
        </div>
      </div>
      <div class="section-actions">
        <button onclick="editSection(\${i})" class="btn btn-outline btn-sm" style="padding:4px 8px"><i class="fas fa-edit"></i></button>
        <button onclick="moveSection(\${i},-1)" class="btn btn-outline btn-sm" style="padding:4px 8px" \${i===0?'disabled':''}><i class="fas fa-arrow-up"></i></button>
        <button onclick="moveSection(\${i},1)" class="btn btn-outline btn-sm" style="padding:4px 8px" \${i===pageSections.length-1?'disabled':''}><i class="fas fa-arrow-down"></i></button>
        <button onclick="removeSection(\${i})" class="btn btn-danger btn-sm" style="padding:4px 8px"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  \`).join('');
}

let dragIdx=null;
function dragStart(e){dragIdx=parseInt(e.target.closest('.section-item').dataset.idx)}
function dragOver(e){e.preventDefault()}
function dropSection(e){
  e.preventDefault();
  const toIdx=parseInt(e.target.closest('.section-item').dataset.idx);
  if(dragIdx===null||dragIdx===toIdx)return;
  const item=pageSections.splice(dragIdx,1)[0];
  pageSections.splice(toIdx,0,item);
  renderSections();
}

function moveSection(i,dir){
  const ni=i+dir;
  if(ni<0||ni>=pageSections.length)return;
  [pageSections[i],pageSections[ni]]=[pageSections[ni],pageSections[i]];
  renderSections();
}

function removeSection(i){
  if(!confirm('Remove this section?'))return;
  pageSections.splice(i,1);
  renderSections();
}

function editSection(i){
  const s=pageSections[i];
  const heading=prompt('Section Heading:',s.heading||'');
  if(heading!==null)s.heading=heading;
  if(s.type==='hero'||s.type==='cta'){
    const sub=prompt('Subheading:',s.subheading||'');
    if(sub!==null)s.subheading=sub;
    const btn=prompt('Button Text:',s.btnText||'');
    if(btn!==null)s.btnText=btn;
    const url=prompt('Button URL:',s.btnUrl||'/');
    if(url!==null)s.btnUrl=url;
  }
  if(s.type==='text'){
    const content=prompt('Content:',s.content||'');
    if(content!==null)s.content=content;
  }
  if(s.type==='cards'||s.type==='features'){
    const count=prompt('Number of items:',String(s.items?.length||3));
    if(count!==null){
      const n=parseInt(count)||3;
      s.items=s.items||[];
      while(s.items.length<n)s.items.push({title:'New Item',description:'Description',icon:'fa-star'});
      s.items.length=n;
      for(let j=0;j<n;j++){
        const t=prompt('Item '+(j+1)+' title:',s.items[j].title);
        if(t!==null)s.items[j].title=t;
        const d=prompt('Item '+(j+1)+' description:',s.items[j].description);
        if(d!==null)s.items[j].description=d;
      }
    }
  }
  renderSections();
}

async function savePageDraft(){
  const key=document.getElementById('pe_key').value.trim();
  if(!key){showToast('Page key is required','error');return}
  try{
    await api('/api/cms/pages/'+key+'/draft',{method:'PUT',body:JSON.stringify({
      draft_json:pageSections,
      title:document.getElementById('pe_title').value,
      meta_title:document.getElementById('pe_meta_title').value,
      meta_description:document.getElementById('pe_meta_desc').value
    })});
    showToast('Draft saved','success');
    editingPageKey=key;
  }catch(e){showToast(e.message,'error')}
}

async function publishPage(){
  const key=document.getElementById('pe_key').value.trim();
  if(!key){showToast('Page key is required','error');return}
  try{
    // Save draft first, then publish
    await api('/api/cms/pages/'+key+'/draft',{method:'PUT',body:JSON.stringify({
      draft_json:pageSections,
      title:document.getElementById('pe_title').value,
      meta_title:document.getElementById('pe_meta_title').value,
      meta_description:document.getElementById('pe_meta_desc').value
    })});
    await api('/api/cms/pages/'+key+'/publish',{method:'PUT'});
    showToast('Page published!','success');
    closePageEditor();loadCmsPages();
  }catch(e){showToast(e.message,'error')}
}

async function editPage(key){
  try{const data=await api('/api/cms/pages/'+key);openPageEditor(data.page)}catch(e){showToast(e.message,'error')}
}

async function deletePage(key){
  if(!confirm('Delete this page?'))return;
  try{await api('/api/cms/pages/'+key,{method:'DELETE'});showToast('Page deleted','success');loadCmsPages()}catch(e){showToast(e.message,'error')}
}

// ============ COURSE EXTENSIONS ============
let selectedCourseId = null;

async function loadCourseSelector(){
  try{
    const data=await api('/api/courses?limit=50');
    const sel=document.getElementById('ceSelectCourse');
    sel.innerHTML='<option value="">-- Select a course --</option>';
    (data.courses||[]).forEach(c=>{const o=document.createElement('option');o.value=c.id;o.textContent=c.title+' ('+c.university+')';sel.appendChild(o)});
  }catch(e){showToast(e.message,'error')}
}

async function loadCourseExtensions(courseId){
  if(!courseId){document.getElementById('courseExtContent').style.display='none';return}
  selectedCourseId=courseId;
  document.getElementById('courseExtContent').style.display='block';
  
  // Load FAQs
  try{
    const fdata=await api('/api/cms/courses/'+courseId+'/faqs');
    const list=document.getElementById('ceFaqList');
    if(!(fdata.faqs||[]).length){list.innerHTML='<p style="font-size:13px;color:var(--text-light)">No FAQs yet</p>';return;}
    list.innerHTML=(fdata.faqs||[]).map(f=>\`
      <div style="padding:12px;border:1px solid var(--border);border-radius:var(--radius);margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;align-items:start">
          <div style="flex:1"><div style="font-weight:600;font-size:14px;margin-bottom:4px">Q: \${f.question}</div><div style="font-size:13px;color:var(--text-light)">A: \${f.answer.substring(0,150)}\${f.answer.length>150?'...':''}</div></div>
          <div style="display:flex;gap:4px;margin-left:12px">
            <button onclick="editFaq(\${f.id},'\${encodeURIComponent(f.question)}','\${encodeURIComponent(f.answer)}',\${f.sort_order})" class="btn btn-outline btn-sm" style="padding:4px 8px"><i class="fas fa-edit"></i></button>
            <button onclick="deleteFaq(\${f.id})" class="btn btn-danger btn-sm" style="padding:4px 8px"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    \`).join('');
  }catch(e){document.getElementById('ceFaqList').innerHTML='<p style="color:var(--accent)">Error loading FAQs</p>'}
  
  // Load docs
  try{
    const ddata=await api('/api/cms/courses/'+courseId+'/documents');
    const list=document.getElementById('ceDocList');
    if(!(ddata.documents||[]).length){list.innerHTML='<p style="font-size:13px;color:var(--text-light)">No documents yet</p>';}
    else{list.innerHTML=(ddata.documents||[]).map(d=>\`
      <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--border);border-radius:var(--radius);margin-bottom:8px">
        <i class="fas \${d.doc_type==='certificate'?'fa-certificate':'fa-file-pdf'}" style="font-size:20px;color:\${d.doc_type==='certificate'?'var(--accent)':'var(--orange)'}"></i>
        <div style="flex:1">
          <div style="font-weight:600;font-size:14px">\${d.title||d.doc_type}</div>
          <div style="font-size:12px;color:var(--text-light)"><span class="badge \${d.doc_type==='certificate'?'badge-red':'badge-orange'}" style="font-size:10px">\${d.doc_type}</span> <a href="\${d.file_url}" target="_blank" style="color:var(--blue);margin-left:4px">View</a></div>
        </div>
        <button onclick="deleteDoc(\${d.id})" class="btn btn-danger btn-sm" style="padding:4px 8px"><i class="fas fa-trash"></i></button>
      </div>
    \`).join('');}
  }catch(e){document.getElementById('ceDocList').innerHTML='<p style="color:var(--accent)">Error loading documents</p>'}
  
  // Load highlights
  try{
    const data=await api('/api/courses?limit=50');
    const course=(data.courses||[]).find(c=>String(c.id)===String(courseId));
    if(course)document.getElementById('ceHighlights').value=course.highlights||'';
  }catch(e){}
}

// FAQ Modal
function openFaqModal(faq){
  document.getElementById('faqModal').classList.add('open');
  document.getElementById('faqForm').reset();
  document.getElementById('fq_edit_id').value='';
  if(faq){
    document.getElementById('fq_edit_id').value=faq.id;
    document.getElementById('fq_question').value=faq.question;
    document.getElementById('fq_answer').value=faq.answer;
    document.getElementById('fq_order').value=faq.sort_order||0;
    document.getElementById('faqModalTitle').textContent='Edit FAQ';
  }else{
    document.getElementById('faqModalTitle').textContent='Add FAQ';
  }
}
function closeFaqModal(){document.getElementById('faqModal').classList.remove('open')}

function editFaq(id,q,a,order){
  openFaqModal({id,question:decodeURIComponent(q),answer:decodeURIComponent(a),sort_order:order});
}

async function saveFaq(e){
  e.preventDefault();
  const editId=document.getElementById('fq_edit_id').value;
  const body={question:document.getElementById('fq_question').value,answer:document.getElementById('fq_answer').value,sort_order:parseInt(document.getElementById('fq_order').value)||0};
  try{
    if(editId){await api('/api/cms/faqs/'+editId,{method:'PUT',body:JSON.stringify(body)})}
    else{await api('/api/cms/courses/'+selectedCourseId+'/faqs',{method:'POST',body:JSON.stringify(body)})}
    showToast('FAQ saved','success');closeFaqModal();loadCourseExtensions(selectedCourseId);
  }catch(e){showToast(e.message,'error')}
}

async function deleteFaq(id){
  if(!confirm('Delete this FAQ?'))return;
  try{await api('/api/cms/faqs/'+id,{method:'DELETE'});showToast('FAQ deleted','success');loadCourseExtensions(selectedCourseId)}catch(e){showToast(e.message,'error')}
}

// Doc Modal
function openDocModal(){document.getElementById('docModal').classList.add('open');document.getElementById('docForm').reset()}
function closeDocModal(){document.getElementById('docModal').classList.remove('open')}

async function saveDoc(e){
  e.preventDefault();
  try{
    await api('/api/cms/courses/'+selectedCourseId+'/documents',{method:'POST',body:JSON.stringify({
      doc_type:document.getElementById('dc_type').value,
      title:document.getElementById('dc_title').value,
      file_url:document.getElementById('dc_url').value
    })});
    showToast('Document added','success');closeDocModal();loadCourseExtensions(selectedCourseId);
  }catch(e){showToast(e.message,'error')}
}

async function deleteDoc(id){
  if(!confirm('Delete this document?'))return;
  try{await api('/api/cms/documents/'+id,{method:'DELETE'});showToast('Deleted','success');loadCourseExtensions(selectedCourseId)}catch(e){showToast(e.message,'error')}
}

async function saveHighlights(){
  if(!selectedCourseId)return;
  try{
    await api('/api/cms/courses/'+selectedCourseId+'/highlights',{method:'PUT',body:JSON.stringify({highlights:document.getElementById('ceHighlights').value})});
    showToast('Highlights saved','success');
  }catch(e){showToast(e.message,'error')}
}

// ============ SHARED (Students, Courses, Leads) ============
async function viewStudent(id){
  document.getElementById('studentModal').classList.add('open');
  try{
    const data=await api('/api/admin/students/'+id);
    const s=data.student;
    document.getElementById('studentDetail').innerHTML=\`
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)">
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--orange));display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;font-weight:700">\${s.name.charAt(0)}</div>
        <div><div style="font-size:18px;font-weight:700">\${s.name}</div><div style="font-size:13px;color:var(--text-light)">\${s.email} &middot; \${s.phone||''}</div><div style="font-size:12px;color:var(--text-light)">\${s.city||''} &middot; \${s.qualification||''}</div></div>
      </div>
      <h4 style="font-size:15px;font-weight:700;margin-bottom:12px">Enrolled Courses (\${data.enrollments.length})</h4>
      \${data.enrollments.map(e=>\`
        <div style="padding:12px;border:1px solid var(--border);border-radius:var(--radius);margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div><div style="font-weight:600;font-size:14px">\${e.title}</div><div style="font-size:12px;color:var(--text-light)">\${e.university}</div></div>
            <span class="badge \${e.status==='completed'?'badge-green':'badge-blue'}">\${e.progress}%</span>
          </div>
        </div>
      \`).join('')}
    \`;
  }catch(e){showToast(e.message,'error')}
}

function closeStudentModal(){document.getElementById('studentModal').classList.remove('open')}

async function toggleStudent(id){
  if(!confirm('Toggle student status?'))return;
  try{await api('/api/admin/students/'+id+'/toggle',{method:'PUT'});showToast('Status updated','success');loadAdminStudents()}catch(e){showToast(e.message,'error')}
}

async function updateLead(id,status){
  try{await api('/api/admin/leads/'+id,{method:'PUT',body:JSON.stringify({status})});showToast('Lead updated','success')}catch(e){showToast(e.message,'error')}
}

// Course modal
let adminCategories=[];
async function loadAdminCategories(){
  try{const data=await api('/api/admin/categories');adminCategories=data.categories;
    const sel=document.getElementById('cf_category_id');sel.innerHTML='<option value="">Select Category</option>';
    adminCategories.forEach(c=>{const o=document.createElement('option');o.value=c.id;o.textContent=c.name;sel.appendChild(o)})
  }catch(e){}
}

function openCourseModal(course){
  document.getElementById('courseModal').classList.add('open');
  document.getElementById('courseModalTitle').textContent=course?'Edit Course':'Add New Course';
  document.getElementById('courseForm').reset();
  document.getElementById('cf_edit_id').value='';
  if(course){
    document.getElementById('cf_edit_id').value=course.id;
    ['title','subtitle','short_description','university','instructor_name','instructor_title','price','original_price','emi_amount','duration_weeks','level','start_date','total_modules','total_hours','certificate_type','skills','highlights'].forEach(f=>{
      const el=document.getElementById('cf_'+f);if(el)el.value=course[f]||'';
    });
    document.getElementById('cf_category_id').value=course.category_id||'';
    document.getElementById('cf_is_featured').checked=!!course.is_featured;
    document.getElementById('cf_is_trending').checked=!!course.is_trending;
    document.getElementById('cf_emi_available').checked=!!course.emi_available;
  }
}
function closeCourseModal(){document.getElementById('courseModal').classList.remove('open')}

async function saveCourse(e){
  e.preventDefault();
  const editId=document.getElementById('cf_edit_id').value;
  const body={};
  ['title','subtitle','short_description','university','instructor_name','instructor_title','certificate_type','skills','highlights','level','start_date'].forEach(f=>body[f]=document.getElementById('cf_'+f).value);
  ['price','original_price','emi_amount','duration_weeks','total_modules','total_hours'].forEach(f=>body[f]=parseFloat(document.getElementById('cf_'+f).value)||0);
  body.category_id=parseInt(document.getElementById('cf_category_id').value)||null;
  body.is_featured=document.getElementById('cf_is_featured').checked;
  body.is_trending=document.getElementById('cf_is_trending').checked;
  body.emi_available=document.getElementById('cf_emi_available').checked;
  
  try{
    if(editId){await api('/api/admin/courses/'+editId,{method:'PUT',body:JSON.stringify(body)})}
    else{await api('/api/admin/courses',{method:'POST',body:JSON.stringify(body)})}
    showToast(editId?'Course updated':'Course created','success');
    closeCourseModal();loadAdminCourses();
  }catch(e){showToast(e.message,'error')}
}

async function editCourse(id){
  try{
    const data=await api('/api/courses?limit=50');
    const course=(data.courses||[]).find(c=>c.id===id);
    if(course)openCourseModal(course);
  }catch(e){showToast(e.message,'error')}
}

async function deleteCourse(id){
  if(!confirm('Are you sure you want to delete this course?'))return;
  try{await api('/api/admin/courses/'+id,{method:'DELETE'});showToast('Course deleted','success');loadAdminCourses()}catch(e){showToast(e.message,'error')}
}

// Init
loadAdminCategories();
loadAdminDashboard();
</script>
`);
}
