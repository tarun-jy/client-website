export function layout(title: string, body: string, extraHead: string = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | UpgradeEdu - Online Courses & Degrees</title>
<meta name="description" content="India's leading online higher education platform. Get degrees and certificates from top universities like IITs, IIMs.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --primary:#1a1a2e;--primary-light:#16213e;--accent:#e94560;--accent-hover:#c23152;
  --orange:#f47920;--orange-hover:#d96810;--green:#0c9;--blue:#2563eb;
  --text:#1a1a2e;--text-light:#64748b;--text-lighter:#94a3b8;
  --bg:#ffffff;--bg-gray:#f8fafc;--bg-dark:#0f172a;
  --border:#e2e8f0;--shadow:0 1px 3px rgba(0,0,0,.08);
  --shadow-md:0 4px 12px rgba(0,0,0,.1);--shadow-lg:0 10px 40px rgba(0,0,0,.12);
  --radius:8px;--radius-lg:12px;--radius-xl:16px;
  --transition:all .2s ease;
}
html{scroll-behavior:smooth;font-size:16px}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;color:var(--text);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}
a{text-decoration:none;color:inherit;transition:var(--transition)}
img{max-width:100%;height:auto}
button{cursor:pointer;border:none;outline:none;font-family:inherit}
input,select,textarea{font-family:inherit;outline:none}

/* Navbar */
.navbar{position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--bg);border-bottom:1px solid var(--border);transition:var(--transition)}
.navbar.scrolled{box-shadow:var(--shadow-md)}
.nav-container{max-width:1280px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:72px}
.nav-logo{display:flex;align-items:center;gap:3px;font-size:24px;font-weight:800;letter-spacing:-.5px}
.nav-logo .up{color:var(--accent)}
.nav-logo .grade{color:var(--primary)}
.nav-logo .edu{color:var(--orange);font-size:13px;font-weight:600;background:var(--orange);color:#fff;padding:1px 6px;border-radius:4px;margin-left:2px;position:relative;top:-6px}
.nav-links{display:flex;align-items:center;gap:8px}
.nav-link{padding:8px 16px;font-size:14px;font-weight:500;color:var(--text);border-radius:var(--radius);transition:var(--transition)}
.nav-link:hover{background:var(--bg-gray);color:var(--accent)}
.nav-link.active{color:var(--accent);font-weight:600}
.nav-cta{display:flex;align-items:center;gap:12px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 24px;font-size:14px;font-weight:600;border-radius:var(--radius);transition:var(--transition);white-space:nowrap}
.btn-primary{background:var(--accent);color:#fff}
.btn-primary:hover{background:var(--accent-hover);transform:translateY(-1px);box-shadow:0 4px 12px rgba(233,69,96,.3)}
.btn-orange{background:var(--orange);color:#fff}
.btn-orange:hover{background:var(--orange-hover);transform:translateY(-1px);box-shadow:0 4px 12px rgba(244,121,32,.3)}
.btn-outline{border:1.5px solid var(--border);color:var(--text);background:transparent}
.btn-outline:hover{border-color:var(--accent);color:var(--accent);background:rgba(233,69,96,.04)}
.btn-ghost{color:var(--text);background:transparent}
.btn-ghost:hover{background:var(--bg-gray)}
.btn-sm{padding:6px 16px;font-size:13px}
.btn-lg{padding:14px 32px;font-size:15px}
.btn-block{width:100%}
.btn-green{background:var(--green);color:#fff}
.btn-green:hover{background:#0a6;transform:translateY(-1px)}
.btn-danger{background:#ef4444;color:#fff}
.btn-danger:hover{background:#dc2626}

/* Mobile Nav */
.nav-toggle{display:none;background:none;border:none;font-size:24px;color:var(--text);padding:8px}
.mobile-menu{display:none;position:fixed;top:72px;left:0;right:0;background:var(--bg);border-bottom:1px solid var(--border);padding:16px 24px;box-shadow:var(--shadow-lg)}
.mobile-menu.open{display:block}
.mobile-menu .nav-link{display:block;padding:12px 0;font-size:15px}
.mobile-menu .nav-cta{margin-top:16px;flex-direction:column}
.mobile-menu .nav-cta .btn{width:100%;justify-content:center}

/* User menu */
.user-menu{position:relative}
.user-avatar{width:36px;height:36px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;cursor:pointer;transition:var(--transition)}
.user-avatar:hover{transform:scale(1.05)}
.user-dropdown{position:absolute;top:48px;right:0;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);min-width:200px;display:none;overflow:hidden}
.user-dropdown.open{display:block}
.user-dropdown a{display:block;padding:10px 16px;font-size:14px;color:var(--text);transition:var(--transition)}
.user-dropdown a:hover{background:var(--bg-gray);color:var(--accent)}
.user-dropdown .divider{height:1px;background:var(--border);margin:4px 0}

/* Container */
.container{max-width:1280px;margin:0 auto;padding:0 24px}
.section{padding:80px 0}
.section-sm{padding:48px 0}

/* Typography */
h1{font-family:'Playfair Display',serif}
.section-title{font-size:36px;font-weight:800;line-height:1.2;margin-bottom:12px;color:var(--text)}
.section-subtitle{font-size:16px;color:var(--text-light);max-width:600px;line-height:1.7}
.text-accent{color:var(--accent)}
.text-orange{color:var(--orange)}
.text-green{color:var(--green)}

/* Cards */
.card{background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-xl);overflow:hidden;transition:var(--transition)}
.card:hover{box-shadow:var(--shadow-lg);transform:translateY(-4px);border-color:transparent}

/* Grid */
.grid{display:grid;gap:24px}
.grid-2{grid-template-columns:repeat(2,1fr)}
.grid-3{grid-template-columns:repeat(3,1fr)}
.grid-4{grid-template-columns:repeat(4,1fr)}

/* Form elements */
.form-group{margin-bottom:20px}
.form-label{display:block;font-size:13px;font-weight:600;color:var(--text);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.form-input{width:100%;padding:12px 16px;border:1.5px solid var(--border);border-radius:var(--radius);font-size:14px;transition:var(--transition);background:var(--bg)}
.form-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(233,69,96,.1)}
.form-input::placeholder{color:var(--text-lighter)}
select.form-input{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2364748b' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}
textarea.form-input{resize:vertical;min-height:100px}

/* Badge */
.badge{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;font-size:11px;font-weight:600;border-radius:20px;text-transform:uppercase;letter-spacing:.5px}
.badge-red{background:rgba(233,69,96,.1);color:var(--accent)}
.badge-orange{background:rgba(244,121,32,.1);color:var(--orange)}
.badge-green{background:rgba(0,204,153,.1);color:#059669}
.badge-blue{background:rgba(37,99,235,.1);color:var(--blue)}

/* Toast */
.toast{position:fixed;top:88px;right:24px;z-index:9999;padding:14px 20px;border-radius:var(--radius-lg);font-size:14px;font-weight:500;box-shadow:var(--shadow-lg);transform:translateX(120%);transition:transform .3s ease;max-width:360px}
.toast.show{transform:translateX(0)}
.toast-success{background:#059669;color:#fff}
.toast-error{background:#ef4444;color:#fff}
.toast-info{background:var(--blue);color:#fff}

/* Footer */
.footer{background:var(--bg-dark);color:#cbd5e1;padding:64px 0 0}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px}
.footer-brand{font-size:14px;line-height:1.8;color:#94a3b8}
.footer h4{font-size:14px;font-weight:700;color:#fff;margin-bottom:16px;text-transform:uppercase;letter-spacing:.5px}
.footer-links{list-style:none}
.footer-links li{margin-bottom:8px}
.footer-links a{font-size:14px;color:#94a3b8;transition:var(--transition)}
.footer-links a:hover{color:#fff;padding-left:4px}
.footer-bottom{margin-top:48px;padding:20px 0;border-top:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#64748b}
.footer-social{display:flex;gap:16px}
.footer-social a{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#94a3b8;transition:var(--transition)}
.footer-social a:hover{background:var(--accent);color:#fff;transform:translateY(-2px)}

/* Loader */
.loader{display:flex;align-items:center;justify-content:center;padding:40px}
.spinner{width:36px;height:36px;border:3px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* Responsive */
@media(max-width:1024px){
  .grid-4{grid-template-columns:repeat(2,1fr)}
  .grid-3{grid-template-columns:repeat(2,1fr)}
  .footer-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:768px){
  .nav-links{display:none}
  .nav-cta{display:none}
  .nav-toggle{display:block}
  .grid-2,.grid-3,.grid-4{grid-template-columns:1fr}
  .section{padding:48px 0}
  .section-title{font-size:28px}
  .footer-grid{grid-template-columns:1fr}
  .footer-bottom{flex-direction:column;gap:12px;text-align:center}
  .hero-content h1{font-size:32px !important}
}

/* Animations */
@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.animate{animation:fadeInUp .5s ease forwards;opacity:0}
.delay-1{animation-delay:.1s}.delay-2{animation-delay:.2s}.delay-3{animation-delay:.3s}.delay-4{animation-delay:.4s}

/* Tab system */
.tabs{display:flex;gap:0;border-bottom:2px solid var(--border);margin-bottom:24px}
.tab{padding:12px 24px;font-size:14px;font-weight:500;color:var(--text-light);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;transition:var(--transition)}
.tab:hover{color:var(--text)}
.tab.active{color:var(--accent);border-bottom-color:var(--accent);font-weight:600}
.tab-content{display:none}
.tab-content.active{display:block}

/* Table */
.table-wrap{overflow-x:auto;border:1px solid var(--border);border-radius:var(--radius-lg)}
table{width:100%;border-collapse:collapse}
th{text-align:left;padding:12px 16px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-light);background:var(--bg-gray);border-bottom:1px solid var(--border)}
td{padding:12px 16px;font-size:14px;border-bottom:1px solid var(--border)}
tr:last-child td{border-bottom:none}
tr:hover td{background:rgba(233,69,96,.02)}

/* Progress bar */
.progress-bar{height:6px;background:var(--border);border-radius:3px;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--orange));border-radius:3px;transition:width .5s ease}

/* Modal */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:none;align-items:center;justify-content:center;padding:24px}
.modal-overlay.open{display:flex}
.modal{background:var(--bg);border-radius:var(--radius-xl);width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-lg)}
.modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border)}
.modal-header h3{font-size:18px;font-weight:700}
.modal-close{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--bg-gray);cursor:pointer;transition:var(--transition)}
.modal-close:hover{background:rgba(233,69,96,.1);color:var(--accent)}
.modal-body{padding:24px}
.modal-footer{padding:16px 24px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:12px}

/* Stat card */
.stat-card{background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;transition:var(--transition)}
.stat-card:hover{box-shadow:var(--shadow-md)}
.stat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:12px}
.stat-value{font-size:28px;font-weight:800;color:var(--text);line-height:1}
.stat-label{font-size:13px;color:var(--text-light);margin-top:4px}

/* Chip */
.chip{display:inline-flex;align-items:center;padding:6px 14px;font-size:13px;font-weight:500;border-radius:20px;background:var(--bg-gray);color:var(--text);transition:var(--transition);cursor:pointer;border:1.5px solid transparent}
.chip:hover,.chip.active{background:rgba(233,69,96,.08);color:var(--accent);border-color:var(--accent)}

/* Empty state */
.empty{text-align:center;padding:60px 24px}
.empty i{font-size:48px;color:var(--text-lighter);margin-bottom:16px}
.empty h3{font-size:20px;margin-bottom:8px}
.empty p{color:var(--text-light);margin-bottom:24px}
</style>
${extraHead}
</head>
<body>

<!-- Navbar -->
<nav class="navbar" id="navbar">
  <div class="nav-container">
    <a href="/" class="nav-logo"><span class="up">Upgrade</span><span class="edu">EDU</span></a>
    <div class="nav-links" id="navLinks">
      <a href="/courses" class="nav-link">Courses</a>
      <a href="/courses?category=data-science" class="nav-link">Data Science</a>
      <a href="/courses?category=management" class="nav-link">Management</a>
      <a href="/courses?category=software-technology" class="nav-link">Technology</a>
      <a href="/blog" class="nav-link">Blog</a>
      <a href="/about" class="nav-link">About</a>
      <a href="/contact" class="nav-link">Contact</a>
    </div>
    <div class="nav-cta" id="navCta">
      <div id="authButtons">
        <a href="/login" class="btn btn-outline btn-sm">Login</a>
        <a href="/register" class="btn btn-primary btn-sm">Register Free</a>
      </div>
      <div id="userMenu" class="user-menu" style="display:none">
        <div class="user-avatar" onclick="toggleUserMenu()" id="userAvatar">U</div>
        <div class="user-dropdown" id="userDropdown">
          <div style="padding:12px 16px;border-bottom:1px solid var(--border)">
            <div style="font-weight:600;font-size:14px" id="userName">User</div>
            <div style="font-size:12px;color:var(--text-light)" id="userEmail">user@email.com</div>
          </div>
          <a href="/dashboard" id="myLearningLink"><i class="fas fa-graduation-cap" style="width:20px"></i> My Learning</a>
          <a href="/dashboard"><i class="fas fa-user" style="width:20px"></i> Profile</a>
          <div class="divider"></div>
          <a href="#" onclick="logout()" style="color:var(--accent)"><i class="fas fa-sign-out-alt" style="width:20px"></i> Logout</a>
        </div>
      </div>
    </div>
    <button class="nav-toggle" onclick="toggleMobileMenu()"><i class="fas fa-bars"></i></button>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a href="/courses" class="nav-link">All Courses</a>
    <a href="/courses?category=data-science" class="nav-link">Data Science</a>
    <a href="/courses?category=management" class="nav-link">Management</a>
    <a href="/courses?category=software-technology" class="nav-link">Technology</a>
    <a href="/blog" class="nav-link">Blog</a>
    <a href="/about" class="nav-link">About</a>
    <a href="/contact" class="nav-link">Contact</a>
    <div class="nav-cta" id="mobileCta">
      <a href="/login" class="btn btn-outline btn-sm">Login</a>
      <a href="/register" class="btn btn-primary btn-sm">Register Free</a>
    </div>
  </div>
</nav>

<!-- Shared Scripts (must load before page content) -->
<script>
// Auth state management
const AUTH_KEY = 'upgradeEdu_auth';
function getAuth(){try{return JSON.parse(localStorage.getItem(AUTH_KEY))}catch{return null}}
function setAuth(d){localStorage.setItem(AUTH_KEY,JSON.stringify(d))}
function clearAuth(){localStorage.removeItem(AUTH_KEY)}

function checkAuth(){
  const auth=getAuth();
  if(auth&&auth.token&&auth.user){
    document.getElementById('authButtons').style.display='none';
    document.getElementById('userMenu').style.display='block';
    document.getElementById('userAvatar').textContent=auth.user.name.charAt(0).toUpperCase();
    document.getElementById('userName').textContent=auth.user.name;
    document.getElementById('userEmail').textContent=auth.user.email;
    if(auth.user.role==='admin'){
      const dd=document.getElementById('userDropdown');
      const adminLink=document.createElement('a');
      adminLink.href='/admin';
      adminLink.innerHTML='<i class="fas fa-cog" style="width:20px"></i> Admin Panel';
      dd.insertBefore(adminLink,dd.querySelector('.divider'));
      // Hide My Learning for admin
      const mlLink=document.getElementById('myLearningLink');
      if(mlLink)mlLink.style.display='none';
    }
  }
}

function toggleUserMenu(){document.getElementById('userDropdown').classList.toggle('open')}
function toggleMobileMenu(){document.getElementById('mobileMenu').classList.toggle('open')}
function logout(){clearAuth();window.location.href='/'}

function showToast(msg,type='success'){
  const t=document.getElementById('toast');
  t.textContent=msg;t.className='toast toast-'+type+' show';
  setTimeout(()=>t.classList.remove('show'),3500);
}

function formatPrice(p){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(p)}

// Navbar scroll
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>10);
});

// Close dropdowns on outside click
document.addEventListener('click',(e)=>{
  if(!e.target.closest('.user-menu'))document.getElementById('userDropdown')?.classList.remove('open');
  if(!e.target.closest('.nav-toggle')&&!e.target.closest('.mobile-menu'))document.getElementById('mobileMenu')?.classList.remove('open');
});

// API helper
async function api(url,options={}){
  const auth=getAuth();
  const headers={'Content-Type':'application/json',...(options.headers||{})};
  if(auth?.token)headers['Authorization']='Bearer '+auth.token;
  const res=await fetch(url,{...options,headers});
  const data=await res.json();
  if(!res.ok)throw new Error(data.error||'Something went wrong');
  return data;
}

checkAuth();
</script>

<!-- Main Content -->
<main style="padding-top:72px">
${body}
</main>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="/" class="nav-logo" style="font-size:28px;margin-bottom:16px;display:inline-flex"><span class="up">Upgrade</span><span class="edu">EDU</span></a>
        <p class="footer-brand" style="margin-top:16px">India's leading online higher education platform. We partner with world-class universities and industry leaders to offer programs in Data Science, Management, Technology, and more.</p>
        <div class="footer-social" style="margin-top:20px">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div>
        <h4>Popular Programs</h4>
        <ul class="footer-links">
          <li><a href="/courses?category=data-science">Data Science</a></li>
          <li><a href="/courses?category=management">Management</a></li>
          <li><a href="/courses?category=software-technology">Software & Tech</a></li>
          <li><a href="/courses?category=machine-learning-ai">AI & ML</a></li>
          <li><a href="/courses?category=digital-marketing">Digital Marketing</a></li>
          <li><a href="/courses?category=cyber-security">Cyber Security</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul class="footer-links">
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Partners</a></li>
        </ul>
      </div>
      <div>
        <h4>Support</h4>
        <ul class="footer-links">
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Refund Policy</a></li>
          <li><a href="#">Grievance</a></li>
          <li><a href="#">Report an Issue</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 UpgradeEDU. All rights reserved. Made with <i class="fas fa-heart" style="color:var(--accent);font-size:11px"></i> in India</span>
      <span>Recognised by UGC | Member of NASSCOM | ISO 27001 Certified</span>
    </div>
  </div>
</footer>

<!-- Toast -->
<div class="toast" id="toast"></div>
</body>
</html>`;
}
