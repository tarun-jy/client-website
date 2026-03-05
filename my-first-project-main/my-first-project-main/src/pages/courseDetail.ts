import { layout } from './layout'

export function courseDetailPage() {
  return layout('Course Details', `
<div id="courseContent">
  <div class="loader" style="padding:80px 0"><div class="spinner"></div></div>
</div>

<script>
async function loadCourseDetail(){
  const slug=window.location.pathname.split('/course/')[1];
  if(!slug)return;
  try{
    const data=await api('/api/courses/'+slug);
    const c=data.course;
    const modules=data.modules||[];
    const skills=(c.skills||'').split(',').filter(Boolean);
    const highlights=(c.highlights||'').split(',').filter(Boolean);
    const discount=c.original_price>c.price?Math.round((1-c.price/c.original_price)*100):0;
    
    document.title=c.title+' | UpgradeEDU';
    
    // Load FAQs and documents async
    let faqs=[],docs=[];
    try{const fd=await api('/api/public/courses/'+c.id+'/faqs');faqs=fd.faqs||[]}catch(e){}
    try{const dd=await api('/api/public/courses/'+c.id+'/documents');docs=dd.documents||[]}catch(e){}
    
    const certificates=docs.filter(d=>d.doc_type==='certificate');
    const brochures=docs.filter(d=>d.doc_type==='brochure');
    
    document.getElementById('courseContent').innerHTML=\`
    <!-- Course Header -->
    <section style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:48px 0">
      <div class="container">
        <div style="display:grid;grid-template-columns:1.2fr .8fr;gap:48px;align-items:start">
          <div>
            <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
              <span class="badge badge-blue">\${c.category_name||''}</span>
              <span class="badge badge-orange">\${c.level}</span>
              \${c.is_trending?'<span class="badge badge-red"><i class="fas fa-fire"></i> Trending</span>':''}
            </div>
            <h1 style="font-size:32px;font-weight:800;color:#fff;line-height:1.3;margin-bottom:8px;font-family:'Playfair Display',serif">\${c.title}</h1>
            <p style="font-size:16px;color:var(--orange);font-weight:600;margin-bottom:16px">\${c.subtitle||c.university}</p>
            <p style="font-size:15px;color:rgba(255,255,255,.7);line-height:1.7;margin-bottom:24px">\${c.short_description||''}</p>
            
            <div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:24px">
              <div style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.8);font-size:14px">
                <i class="fas fa-star" style="color:#f59e0b"></i> <strong>\${c.rating}</strong> (\${(c.total_reviews||0).toLocaleString()} reviews)
              </div>
              <div style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.8);font-size:14px">
                <i class="fas fa-users"></i> \${(c.total_enrolled||0).toLocaleString()} learners
              </div>
              <div style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.8);font-size:14px">
                <i class="fas fa-clock"></i> \${c.duration_weeks} weeks
              </div>
              <div style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.8);font-size:14px">
                <i class="fas fa-play-circle"></i> \${c.total_hours||0} hours
              </div>
            </div>
            
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center">
                <i class="fas fa-user" style="color:#fff"></i>
              </div>
              <div>
                <div style="font-size:14px;font-weight:600;color:#fff">\${c.instructor_name||'Expert Faculty'}</div>
                <div style="font-size:12px;color:rgba(255,255,255,.5)">\${c.instructor_title||''}</div>
              </div>
            </div>
          </div>
          
          <!-- Pricing Card -->
          <div style="background:#fff;border-radius:20px;padding:32px;box-shadow:0 20px 60px rgba(0,0,0,.3);position:sticky;top:96px">
            <div style="text-align:center;margin-bottom:20px">
              \${discount?'<span style="display:inline-block;padding:4px 12px;background:rgba(233,69,96,.1);color:var(--accent);font-size:13px;font-weight:700;border-radius:20px;margin-bottom:8px">'+discount+'% OFF</span>':''}
              <div style="font-size:36px;font-weight:800;color:var(--accent)">\${formatPrice(c.price)}</div>
              \${c.original_price>c.price?'<div style="font-size:15px;color:var(--text-lighter);text-decoration:line-through">'+formatPrice(c.original_price)+'</div>':''}
              \${c.emi_available?'<div style="font-size:13px;color:var(--green);font-weight:600;margin-top:4px">EMI starting '+formatPrice(c.emi_amount)+'/month</div>':''}
            </div>
            
            <div style="border-top:1px solid var(--border);padding-top:16px;margin-bottom:20px">
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px"><span style="color:var(--text-light)">Duration</span><strong>\${c.duration_weeks} weeks</strong></div>
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px"><span style="color:var(--text-light)">Modules</span><strong>\${c.total_modules||modules.length}</strong></div>
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px"><span style="color:var(--text-light)">Certificate</span><strong>\${c.certificate_type||'Certificate'}</strong></div>
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px"><span style="color:var(--text-light)">Language</span><strong>\${c.language||'English'}</strong></div>
              \${c.start_date?'<div style="display:flex;justify-content:space-between;font-size:13px"><span style="color:var(--text-light)">Next Batch</span><strong>'+c.start_date+'</strong></div>':''}
            </div>
            
            \${brochures.length?'<a href="'+brochures[0].file_url+'" target="_blank" class="btn btn-outline btn-block" style="margin-bottom:10px"><i class="fas fa-download"></i> Download Brochure</a>':''}
            
            <button onclick="enrollCourse(\${c.id})" class="btn btn-primary btn-lg btn-block" id="enrollBtn">
              <i class="fas fa-graduation-cap"></i> Enrol Now
            </button>
            <button onclick="window.location.href='/contact'" class="btn btn-outline btn-lg btn-block" style="margin-top:10px">
              <i class="fas fa-phone"></i> Talk to Counsellor
            </button>
            <p style="font-size:11px;color:var(--text-lighter);text-align:center;margin-top:12px">
              <i class="fas fa-shield-halved"></i> 7-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Course Content Tabs -->
    <section class="section">
      <div class="container">
        <div class="tabs">
          <div class="tab active" onclick="switchTab('overview')">Overview</div>
          <div class="tab" onclick="switchTab('curriculum')">Curriculum</div>
          <div class="tab" onclick="switchTab('skills')">Skills</div>
          \${faqs.length?'<div class="tab" onclick="switchTab(\\'faqs\\')">FAQs</div>':''}
          \${certificates.length?'<div class="tab" onclick="switchTab(\\'certificate\\')">Certificate</div>':''}
          <div class="tab" onclick="switchTab('reviews')">Reviews</div>
        </div>
        
        <div class="tab-content active" id="tab-overview">
          <div style="max-width:800px">
            <h3 style="font-size:22px;font-weight:700;margin-bottom:16px">About This Program</h3>
            <p style="font-size:15px;color:var(--text-light);line-height:1.8;margin-bottom:32px">\${c.description||c.short_description||'This comprehensive program is designed for working professionals...'}</p>
            
            \${highlights.length?'<h3 style="font-size:20px;font-weight:700;margin-bottom:16px">Program Highlights</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:32px">'+highlights.map(h=>'<div style="display:flex;gap:10px;padding:14px 16px;background:var(--bg-gray);border-radius:var(--radius-lg)"><i class="fas fa-check-circle" style="color:var(--green);margin-top:2px"></i><span style="font-size:14px">'+h.trim()+'</span></div>').join('')+'</div>':''}
            
            <h3 style="font-size:20px;font-weight:700;margin-bottom:16px">Who Should Enrol?</h3>
            <ul style="list-style:none;margin-bottom:32px">
              <li style="display:flex;gap:10px;margin-bottom:10px;font-size:14px;color:var(--text-light)"><i class="fas fa-user-check" style="color:var(--accent);margin-top:3px"></i> Working professionals looking for career advancement</li>
              <li style="display:flex;gap:10px;margin-bottom:10px;font-size:14px;color:var(--text-light)"><i class="fas fa-user-check" style="color:var(--accent);margin-top:3px"></i> Fresh graduates aiming for industry-relevant skills</li>
              <li style="display:flex;gap:10px;margin-bottom:10px;font-size:14px;color:var(--text-light)"><i class="fas fa-user-check" style="color:var(--accent);margin-top:3px"></i> Career switchers looking to enter a new domain</li>
              <li style="display:flex;gap:10px;margin-bottom:10px;font-size:14px;color:var(--text-light)"><i class="fas fa-user-check" style="color:var(--accent);margin-top:3px"></i> Entrepreneurs wanting to build domain expertise</li>
            </ul>
          </div>
        </div>
        
        <div class="tab-content" id="tab-curriculum">
          <h3 style="font-size:22px;font-weight:700;margin-bottom:24px">Program Curriculum</h3>
          <div style="max-width:800px">
            \${modules.length?modules.map((m,i)=>'<div style="border:1px solid var(--border);border-radius:var(--radius-lg);margin-bottom:12px;overflow:hidden"><div style="padding:18px 20px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background:var(--bg-gray)" onclick="this.parentElement.classList.toggle(\\'open\\')"><div style="display:flex;align-items:center;gap:12px"><span style="width:32px;height:32px;border-radius:8px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700">'+(i+1)+'</span><div><div style="font-size:15px;font-weight:600">'+m.title+'</div><div style="font-size:12px;color:var(--text-light);margin-top:2px">'+m.lessons_count+' lessons &middot; '+m.duration_hours+' hours</div></div></div><i class="fas fa-chevron-down" style="color:var(--text-light);font-size:12px;transition:transform .2s"></i></div><div style="padding:0 20px;max-height:0;overflow:hidden;transition:all .3s"><p style="padding:16px 0;font-size:14px;color:var(--text-light);line-height:1.7">'+(m.description||'Detailed module content')+'</p></div></div>').join(''):'<p style="color:var(--text-light)">Curriculum details will be available soon.</p>'}
          </div>
        </div>
        
        <div class="tab-content" id="tab-skills">
          <h3 style="font-size:22px;font-weight:700;margin-bottom:24px">Skills You'll Learn</h3>
          <div style="display:flex;flex-wrap:wrap;gap:10px">
            \${skills.map(s=>'<span class="chip" style="cursor:default">'+s.trim()+'</span>').join('')}
          </div>
        </div>
        
        \${faqs.length?'<div class="tab-content" id="tab-faqs"><h3 style="font-size:22px;font-weight:700;margin-bottom:24px">Frequently Asked Questions</h3><div style="max-width:800px">'+faqs.map((f,i)=>'<div style="border:1px solid var(--border);border-radius:var(--radius-lg);margin-bottom:12px;overflow:hidden"><div style="padding:18px 20px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background:var(--bg-gray)" onclick="this.parentElement.classList.toggle(\\'open\\')"><div style="display:flex;align-items:center;gap:12px"><span style="width:32px;height:32px;border-radius:8px;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700">Q</span><div style="font-size:15px;font-weight:600">'+f.question+'</div></div><i class="fas fa-chevron-down" style="color:var(--text-light);font-size:12px;transition:transform .2s"></i></div><div style="padding:0 20px;max-height:0;overflow:hidden;transition:all .3s"><p style="padding:16px 0;font-size:14px;color:var(--text-light);line-height:1.7">'+f.answer+'</p></div></div>').join('')+'</div></div>':''}
        
        \${certificates.length?'<div class="tab-content" id="tab-certificate"><h3 style="font-size:22px;font-weight:700;margin-bottom:24px">Certificate Preview</h3><div style="max-width:700px">'+certificates.map(d=>'<div style="border:2px solid var(--border);border-radius:var(--radius-xl);overflow:hidden;margin-bottom:16px"><img src="'+d.file_url+'" style="width:100%;display:block" alt="'+(d.title||'Certificate')+'"><div style="padding:16px;background:var(--bg-gray);text-align:center"><span style="font-size:14px;font-weight:600;color:var(--text)"><i class="fas fa-certificate" style="color:var(--accent);margin-right:6px"></i>'+(d.title||c.certificate_type||'Certificate of Completion')+'</span></div></div>').join('')+'</div>':''}
        
        <div class="tab-content" id="tab-reviews">
          <h3 style="font-size:22px;font-weight:700;margin-bottom:8px">Learner Reviews</h3>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
            <span style="font-size:48px;font-weight:800;color:var(--text)">\${c.rating}</span>
            <div>
              <div style="display:flex;gap:3px">\${Array(5).fill(0).map((_,i)=>i<Math.round(c.rating)?'<i class="fas fa-star" style="color:#f59e0b;font-size:16px"></i>':'<i class="far fa-star" style="color:#e2e8f0;font-size:16px"></i>').join('')}</div>
              <div style="font-size:13px;color:var(--text-light);margin-top:2px">\${(c.total_reviews||0).toLocaleString()} reviews</div>
            </div>
          </div>
          <div id="courseReviews">
            \${(data.testimonials||[]).map(t=>'<div style="padding:20px 0;border-bottom:1px solid var(--border)"><div style="display:flex;gap:3px;margin-bottom:8px">'+Array(t.rating).fill('<i class="fas fa-star" style="color:#f59e0b;font-size:12px"></i>').join('')+'</div><p style="font-size:14px;line-height:1.7;margin-bottom:10px">'+t.content+'</p><div style="font-size:13px;font-weight:600">'+t.user_name+' <span style="color:var(--text-light);font-weight:400">&middot; '+t.user_title+'</span></div></div>').join('')||'<p style="color:var(--text-light)">No reviews yet for this program.</p>'}
          </div>
        </div>
      </div>
    </section>\`;
    
    document.querySelectorAll('.open').forEach(el=>el.classList.remove('open'));
  }catch(e){
    document.getElementById('courseContent').innerHTML='<div class="empty" style="padding:80px 24px"><i class="fas fa-exclamation-circle"></i><h3>Course Not Found</h3><p>The program you are looking for does not exist.</p><a href="/courses" class="btn btn-primary">Browse Programs</a></div>';
  }
}

function switchTab(name){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('tab-'+name).classList.add('active');
}

async function enrollCourse(courseId){
  const auth=getAuth();
  if(!auth){window.location.href='/login?redirect='+encodeURIComponent(window.location.pathname);return}
  const btn=document.getElementById('enrollBtn');
  btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Processing...';
  try{
    await api('/api/student/enroll',{method:'POST',body:JSON.stringify({courseId})});
    showToast('Successfully enrolled! Redirecting to dashboard...','success');
    setTimeout(()=>window.location.href='/dashboard',1500);
  }catch(e){
    showToast(e.message,'error');
    btn.disabled=false;btn.innerHTML='<i class="fas fa-graduation-cap"></i> Enrol Now';
  }
}

// Accordion toggle CSS
const style=document.createElement('style');
style.textContent='.open>div:last-child{max-height:500px !important;padding:0 20px !important} .open i.fa-chevron-down{transform:rotate(180deg)}';
document.head.appendChild(style);

loadCourseDetail();
</script>
<style>
@media(max-width:768px){
  section:first-child .container>div{grid-template-columns:1fr !important}
  #tab-overview div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr !important}
}
</style>
`);
}
