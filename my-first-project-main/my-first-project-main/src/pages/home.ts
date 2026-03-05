import { layout } from './layout'

export function homePage() {
  return layout('Home', `
<!-- Hero Section -->
<section style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;opacity:.06">
    <div style="position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,#e94560 0%,transparent 70%);top:-200px;right:-100px"></div>
    <div style="position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,#f47920 0%,transparent 70%);bottom:-100px;left:-100px"></div>
  </div>
  <div class="container" style="padding:80px 24px 60px;position:relative">
    <div style="display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center">
      <div>
        <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 16px;background:rgba(255,255,255,.1);border-radius:24px;margin-bottom:24px;backdrop-filter:blur(8px)">
          <span style="width:8px;height:8px;border-radius:50%;background:#0c9;display:inline-block"></span>
          <span style="color:rgba(255,255,255,.9);font-size:13px;font-weight:500">Admissions Open for April 2026 Batch</span>
        </div>
        <h1 style="font-size:48px;font-weight:800;color:#fff;line-height:1.15;margin-bottom:20px;font-family:'Playfair Display',serif">
          India's #1 Online<br>
          <span style="background:linear-gradient(135deg,#e94560,#f47920);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Higher Education</span><br>
          Platform
        </h1>
        <p style="font-size:17px;color:rgba(255,255,255,.7);line-height:1.7;margin-bottom:32px;max-width:520px">
          Get degrees and certificates from India's top universities — IITs, IIMs, IIIT Bangalore and global institutions. Advance your career with industry-relevant programs.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:36px">
          <a href="/courses" class="btn btn-primary btn-lg" style="font-size:15px">
            <i class="fas fa-search"></i> Explore Programs
          </a>
          <a href="/register" class="btn btn-lg" style="background:rgba(255,255,255,.1);color:#fff;backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.15)">
            <i class="fas fa-play-circle"></i> Request a Callback
          </a>
        </div>
        <div style="display:flex;gap:32px;flex-wrap:wrap">
          <div style="text-align:left">
            <div style="font-size:28px;font-weight:800;color:#fff">10L+</div>
            <div style="font-size:12px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.5px">Learners</div>
          </div>
          <div style="width:1px;background:rgba(255,255,255,.1)"></div>
          <div style="text-align:left">
            <div style="font-size:28px;font-weight:800;color:#fff">85+</div>
            <div style="font-size:12px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.5px">Countries</div>
          </div>
          <div style="width:1px;background:rgba(255,255,255,.1)"></div>
          <div style="text-align:left">
            <div style="font-size:28px;font-weight:800;color:#fff">300+</div>
            <div style="font-size:12px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.5px">Programs</div>
          </div>
          <div style="width:1px;background:rgba(255,255,255,.1)"></div>
          <div style="text-align:left">
            <div style="font-size:28px;font-weight:800;color:#fff">50K+</div>
            <div style="font-size:12px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.5px">Career Transitions</div>
          </div>
        </div>
      </div>
      
      <!-- Lead Form -->
      <div style="background:#fff;border-radius:20px;padding:36px 32px;box-shadow:0 20px 60px rgba(0,0,0,.3)" id="heroForm">
        <h3 style="font-size:20px;font-weight:700;color:var(--text);margin-bottom:4px">Book a Free Counselling Session</h3>
        <p style="font-size:13px;color:var(--text-light);margin-bottom:24px">Our career experts will help you find the right program</p>
        <form onsubmit="submitHeroForm(event)">
          <div class="form-group">
            <input type="text" class="form-input" placeholder="Full Name *" id="heroName" required>
          </div>
          <div class="form-group">
            <input type="email" class="form-input" placeholder="Email Address *" id="heroEmail" required>
          </div>
          <div class="form-group">
            <input type="tel" class="form-input" placeholder="Phone Number *" id="heroPhone" required>
          </div>
          <div class="form-group">
            <select class="form-input" id="heroInterest">
              <option value="">Select Area of Interest</option>
              <option>Data Science & Analytics</option>
              <option>MBA / Management</option>
              <option>Software Development</option>
              <option>Machine Learning & AI</option>
              <option>Digital Marketing</option>
              <option>Cyber Security</option>
              <option>Product Management</option>
            </select>
          </div>
          <div class="form-group">
            <select class="form-input" id="heroExp">
              <option value="">Years of Experience</option>
              <option>0-2 years</option>
              <option>2-5 years</option>
              <option>5-8 years</option>
              <option>8-12 years</option>
              <option>12+ years</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-block" id="heroSubmitBtn">
            <i class="fas fa-paper-plane"></i> Get Free Counselling
          </button>
          <p style="font-size:11px;color:var(--text-lighter);text-align:center;margin-top:12px">
            <i class="fas fa-lock" style="font-size:10px"></i> Your information is secure and confidential
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- University Partners Strip -->
<section style="background:#fff;border-bottom:1px solid var(--border);padding:28px 0">
  <div class="container">
    <div style="display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap;opacity:.6">
      <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:var(--text-light);white-space:nowrap">Our University Partners</span>
      <div style="display:flex;align-items:center;gap:36px;flex-wrap:wrap;justify-content:center">
        <span style="font-size:15px;font-weight:700;color:var(--text)">IIT Madras</span>
        <span style="font-size:15px;font-weight:700;color:var(--text)">IIM Kozhikode</span>
        <span style="font-size:15px;font-weight:700;color:var(--text)">IIIT Bangalore</span>
        <span style="font-size:15px;font-weight:700;color:var(--text)">IIT Delhi</span>
        <span style="font-size:15px;font-weight:700;color:var(--text)">MICA</span>
        <span style="font-size:15px;font-weight:700;color:var(--text)">Liverpool</span>
        <span style="font-size:15px;font-weight:700;color:var(--text)">Duke CE</span>
        <span style="font-size:15px;font-weight:700;color:var(--text)">IIT Kanpur</span>
      </div>
    </div>
  </div>
</section>

<!-- Trending Programs -->
<section class="section" style="background:var(--bg-gray)">
  <div class="container">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:40px;flex-wrap:wrap;gap:16px">
      <div>
        <div class="badge badge-red" style="margin-bottom:12px"><i class="fas fa-fire"></i> Trending Now</div>
        <h2 class="section-title">Our Most Popular Programs</h2>
        <p class="section-subtitle">Chosen by thousands of learners to transform their careers</p>
      </div>
      <a href="/courses" class="btn btn-outline btn-sm">View All Programs <i class="fas fa-arrow-right"></i></a>
    </div>
    <div class="grid grid-3" id="trendingCourses">
      <div class="loader"><div class="spinner"></div></div>
    </div>
  </div>
</section>

<!-- Categories Section -->
<section class="section">
  <div class="container">
    <div style="text-align:center;margin-bottom:48px">
      <h2 class="section-title">Explore Programs by Domain</h2>
      <p class="section-subtitle" style="margin:12px auto 0">Choose from 8+ specialized domains with 300+ programs</p>
    </div>
    <div class="grid grid-4" id="categoriesGrid">
      <div class="loader"><div class="spinner"></div></div>
    </div>
  </div>
</section>

<!-- Why UpgradeEDU -->
<section class="section" style="background:linear-gradient(135deg,#1a1a2e,#16213e)">
  <div class="container">
    <div style="text-align:center;margin-bottom:48px">
      <h2 class="section-title" style="color:#fff">Why 10 Lakh+ Learners Choose Us</h2>
      <p class="section-subtitle" style="color:rgba(255,255,255,.6);margin:12px auto 0">Built for working professionals who want to advance their careers</p>
    </div>
    <div class="grid grid-4">
      <div style="text-align:center;padding:32px 20px">
        <div style="width:64px;height:64px;border-radius:16px;background:rgba(233,69,96,.15);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
          <i class="fas fa-university" style="font-size:24px;color:#e94560"></i>
        </div>
        <h4 style="color:#fff;font-size:16px;font-weight:700;margin-bottom:8px">Top University Degrees</h4>
        <p style="color:rgba(255,255,255,.5);font-size:13px;line-height:1.7">Earn globally recognized degrees from IITs, IIMs, and international universities</p>
      </div>
      <div style="text-align:center;padding:32px 20px">
        <div style="width:64px;height:64px;border-radius:16px;background:rgba(244,121,32,.15);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
          <i class="fas fa-chalkboard-teacher" style="font-size:24px;color:#f47920"></i>
        </div>
        <h4 style="color:#fff;font-size:16px;font-weight:700;margin-bottom:8px">Expert Mentorship</h4>
        <p style="color:rgba(255,255,255,.5);font-size:13px;line-height:1.7">1-on-1 mentorship from 1000+ industry experts and university professors</p>
      </div>
      <div style="text-align:center;padding:32px 20px">
        <div style="width:64px;height:64px;border-radius:16px;background:rgba(0,204,153,.15);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
          <i class="fas fa-laptop-code" style="font-size:24px;color:#0c9"></i>
        </div>
        <h4 style="color:#fff;font-size:16px;font-weight:700;margin-bottom:8px">Hands-on Projects</h4>
        <p style="color:rgba(255,255,255,.5);font-size:13px;line-height:1.7">Industry-relevant projects and case studies with real datasets and tools</p>
      </div>
      <div style="text-align:center;padding:32px 20px">
        <div style="width:64px;height:64px;border-radius:16px;background:rgba(37,99,235,.15);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
          <i class="fas fa-briefcase" style="font-size:24px;color:#2563eb"></i>
        </div>
        <h4 style="color:#fff;font-size:16px;font-weight:700;margin-bottom:8px">Career Assistance</h4>
        <p style="color:rgba(255,255,255,.5);font-size:13px;line-height:1.7">Placement support, resume building, and interview preparation services</p>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="section">
  <div class="container">
    <div style="text-align:center;margin-bottom:48px">
      <div class="badge badge-green" style="margin-bottom:12px"><i class="fas fa-star"></i> Success Stories</div>
      <h2 class="section-title">Hear From Our Learners</h2>
      <p class="section-subtitle" style="margin:12px auto 0">Real stories from professionals who transformed their careers</p>
    </div>
    <div class="grid grid-3" id="testimonialGrid">
      <div class="loader"><div class="spinner"></div></div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section style="background:var(--bg-gray);padding:64px 0">
  <div class="container">
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:24px;text-align:center">
      <div>
        <div style="font-size:40px;font-weight:800;color:var(--accent);line-height:1">10L+</div>
        <div style="font-size:13px;color:var(--text-light);margin-top:6px">Paid Learners</div>
      </div>
      <div>
        <div style="font-size:40px;font-weight:800;color:var(--orange);line-height:1">300+</div>
        <div style="font-size:13px;color:var(--text-light);margin-top:6px">Programs</div>
      </div>
      <div>
        <div style="font-size:40px;font-weight:800;color:var(--green);line-height:1">85+</div>
        <div style="font-size:13px;color:var(--text-light);margin-top:6px">Countries</div>
      </div>
      <div>
        <div style="font-size:40px;font-weight:800;color:var(--blue);line-height:1">50K+</div>
        <div style="font-size:13px;color:var(--text-light);margin-top:6px">Career Transitions</div>
      </div>
      <div>
        <div style="font-size:40px;font-weight:800;color:var(--text);line-height:1">1000+</div>
        <div style="font-size:13px;color:var(--text-light);margin-top:6px">Expert Mentors</div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section style="background:linear-gradient(135deg,#e94560 0%,#f47920 100%);padding:72px 0">
  <div class="container" style="text-align:center">
    <h2 style="font-size:36px;font-weight:800;color:#fff;margin-bottom:12px;font-family:'Playfair Display',serif">Ready to Transform Your Career?</h2>
    <p style="font-size:17px;color:rgba(255,255,255,.85);margin-bottom:32px;max-width:520px;margin-left:auto;margin-right:auto">Join 10 lakh+ learners who are advancing their careers with world-class programs</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="/courses" class="btn btn-lg" style="background:#fff;color:var(--accent);font-weight:700">
        <i class="fas fa-graduation-cap"></i> Browse Programs
      </a>
      <a href="/register" class="btn btn-lg" style="background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.3);backdrop-filter:blur(4px)">
        <i class="fas fa-user-plus"></i> Sign Up Free
      </a>
    </div>
  </div>
</section>

<script>
// Load trending courses
async function loadTrending(){
  try{
    const data=await api('/api/courses?trending=1&limit=6');
    const grid=document.getElementById('trendingCourses');
    if(!data.courses?.length){grid.innerHTML='<p>No courses found</p>';return}
    grid.innerHTML=data.courses.map(c=>\`
      <a href="/course/\${c.slug}" class="card" style="display:block">
        <div style="padding:24px 24px 0">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <span class="badge badge-blue">\${c.category_name||'General'}</span>
            <span class="badge badge-orange">\${c.level}</span>
          </div>
          <h3 style="font-size:17px;font-weight:700;line-height:1.4;margin-bottom:8px;min-height:48px">\${c.title}</h3>
          <p style="font-size:13px;color:var(--text-light);line-height:1.6;margin-bottom:12px">\${c.university}</p>
          <div style="display:flex;gap:16px;font-size:12px;color:var(--text-light);margin-bottom:16px">
            <span><i class="fas fa-clock"></i> \${c.duration_weeks} weeks</span>
            <span><i class="fas fa-star" style="color:#f59e0b"></i> \${c.rating}</span>
            <span><i class="fas fa-users"></i> \${(c.total_enrolled||0).toLocaleString()}</span>
          </div>
        </div>
        <div style="padding:16px 24px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
          <div>
            <span style="font-size:20px;font-weight:800;color:var(--accent)">\${formatPrice(c.price)}</span>
            \${c.original_price>c.price?\`<span style="font-size:13px;color:var(--text-lighter);text-decoration:line-through;margin-left:8px">\${formatPrice(c.original_price)}</span>\`:''}
          </div>
          \${c.emi_available?\`<span style="font-size:12px;color:var(--green);font-weight:600">EMI from \${formatPrice(c.emi_amount)}/mo</span>\`:''}
        </div>
      </a>
    \`).join('');
  }catch(e){console.error(e)}
}

// Load categories
async function loadCategories(){
  try{
    const data=await api('/api/public/categories');
    const grid=document.getElementById('categoriesGrid');
    const colors=['#e94560','#f47920','#0c9','#2563eb','#8b5cf6','#ec4899','#14b8a6','#f59e0b'];
    grid.innerHTML=data.categories.map((c,i)=>\`
      <a href="/courses?category=\${c.slug}" class="card" style="display:block;padding:28px 24px;text-align:center">
        <div style="width:56px;height:56px;border-radius:14px;background:\${colors[i%8]}15;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
          <i class="fas \${c.icon||'fa-book'}" style="font-size:22px;color:\${colors[i%8]}"></i>
        </div>
        <h4 style="font-size:15px;font-weight:700;margin-bottom:6px">\${c.name}</h4>
        <p style="font-size:12px;color:var(--text-light);line-height:1.6">\${c.description?.substring(0,80)||''}</p>
      </a>
    \`).join('');
  }catch(e){console.error(e)}
}

// Load testimonials
async function loadTestimonials(){
  try{
    const data=await api('/api/public/testimonials');
    const grid=document.getElementById('testimonialGrid');
    grid.innerHTML=data.testimonials.slice(0,6).map(t=>\`
      <div class="card" style="padding:28px 24px">
        <div style="display:flex;gap:4px;margin-bottom:16px">
          \${Array(t.rating).fill('<i class="fas fa-star" style="color:#f59e0b;font-size:13px"></i>').join('')}
        </div>
        <p style="font-size:14px;color:var(--text);line-height:1.7;margin-bottom:20px;min-height:80px">"\${t.content.substring(0,180)}..."</p>
        <div style="display:flex;align-items:center;gap:12px;border-top:1px solid var(--border);padding-top:16px">
          <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--orange));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:15px">\${t.user_name.charAt(0)}</div>
          <div>
            <div style="font-size:14px;font-weight:600">\${t.user_name}</div>
            <div style="font-size:12px;color:var(--text-light)">\${t.user_title}, \${t.user_company}</div>
          </div>
        </div>
      </div>
    \`).join('');
  }catch(e){console.error(e)}
}

// Hero form submit
async function submitHeroForm(e){
  e.preventDefault();
  const btn=document.getElementById('heroSubmitBtn');
  btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Submitting...';
  try{
    await api('/api/public/lead',{method:'POST',body:JSON.stringify({
      name:document.getElementById('heroName').value,
      email:document.getElementById('heroEmail').value,
      phone:document.getElementById('heroPhone').value,
      course_interest:document.getElementById('heroInterest').value,
      experience:document.getElementById('heroExp').value
    })});
    showToast('Thank you! Our counselor will contact you within 24 hours.','success');
    e.target.reset();
  }catch(err){showToast(err.message,'error')}
  finally{btn.disabled=false;btn.innerHTML='<i class="fas fa-paper-plane"></i> Get Free Counselling'}
}

loadTrending();loadCategories();loadTestimonials();
</script>
`, `
<style>
@media(max-width:768px){
  #heroForm{margin-top:32px}
  section:first-child .container>div{grid-template-columns:1fr !important}
  section:last-of-type+section .container>div{grid-template-columns:repeat(2,1fr) !important}
}
@media(max-width:480px){
  section:last-of-type+section .container>div{grid-template-columns:1fr !important}
}
</style>
`);
}
