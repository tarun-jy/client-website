import { layout } from './layout'

export function dashboardPage() {
  return layout('My Dashboard', `
<section style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:32px 0">
  <div class="container">
    <div style="display:flex;align-items:center;gap:16px">
      <div style="width:56px;height:56px;border-radius:16px;background:rgba(233,69,96,.2);display:flex;align-items:center;justify-content:center">
        <i class="fas fa-graduation-cap" style="font-size:24px;color:#e94560"></i>
      </div>
      <div>
        <h1 style="font-size:24px;font-weight:800;color:#fff" id="dashGreeting">My Dashboard</h1>
        <p style="color:rgba(255,255,255,.5);font-size:14px" id="dashSubtitle">Loading...</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <!-- Stats -->
    <div class="grid grid-4" style="margin-bottom:32px" id="dashStats">
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(233,69,96,.1)"><i class="fas fa-book" style="color:var(--accent)"></i></div>
        <div class="stat-value" id="statTotal">-</div>
        <div class="stat-label">Enrolled Programs</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(0,204,153,.1)"><i class="fas fa-check-circle" style="color:var(--green)"></i></div>
        <div class="stat-value" id="statCompleted">-</div>
        <div class="stat-label">Completed</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(244,121,32,.1)"><i class="fas fa-chart-line" style="color:var(--orange)"></i></div>
        <div class="stat-value" id="statProgress">-</div>
        <div class="stat-label">Avg. Progress</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(37,99,235,.1)"><i class="fas fa-certificate" style="color:var(--blue)"></i></div>
        <div class="stat-value" id="statCerts">-</div>
        <div class="stat-label">Certificates Earned</div>
      </div>
    </div>
    
    <!-- Tabs -->
    <div class="tabs">
      <div class="tab active" onclick="switchDashTab('courses')">My Courses</div>
      <div class="tab" onclick="switchDashTab('profile')">Profile</div>
      <div class="tab" onclick="switchDashTab('certificates')">Certificates</div>
    </div>
    
    <!-- My Courses Tab -->
    <div class="tab-content active" id="tab-courses">
      <div id="enrolledCourses">
        <div class="loader"><div class="spinner"></div></div>
      </div>
    </div>
    
    <!-- Profile Tab -->
    <div class="tab-content" id="tab-profile">
      <div style="max-width:560px">
        <h3 style="font-size:20px;font-weight:700;margin-bottom:24px">Edit Profile</h3>
        <form onsubmit="updateProfile(event)">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" id="profName">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="profEmail" disabled style="background:var(--bg-gray)">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-input" id="profPhone">
            </div>
            <div class="form-group">
              <label class="form-label">City</label>
              <input type="text" class="form-input" id="profCity">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Qualification</label>
            <select class="form-input" id="profQualification">
              <option value="">Select</option>
              <option>12th Pass</option><option>B.Tech / B.E.</option><option>B.Sc</option>
              <option>BCA</option><option>B.Com</option><option>BBA</option>
              <option>M.Tech / M.E.</option><option>M.Sc</option><option>MBA</option><option>Other</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary" id="profBtn">
            <i class="fas fa-save"></i> Update Profile
          </button>
        </form>
      </div>
    </div>
    
    <!-- Certificates Tab -->
    <div class="tab-content" id="tab-certificates">
      <div id="certificatesList">
        <div class="loader"><div class="spinner"></div></div>
      </div>
    </div>
  </div>
</section>

<script>
function switchDashTab(name){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('tab-'+name).classList.add('active');
}

async function loadDashboard(){
  const auth=getAuth();
  if(!auth){window.location.href='/login';return}
  
  try{
    const data=await api('/api/student/dashboard');
    const u=data.user;
    const s=data.stats;
    
    document.getElementById('dashGreeting').textContent='Welcome back, '+u.name+'!';
    document.getElementById('dashSubtitle').textContent='Continue learning and achieve your goals';
    document.getElementById('statTotal').textContent=s.totalCourses;
    document.getElementById('statCompleted').textContent=s.completedCourses;
    document.getElementById('statProgress').textContent=s.avgProgress+'%';
    document.getElementById('statCerts').textContent=s.completedCourses;
    
    // Profile
    document.getElementById('profName').value=u.name||'';
    document.getElementById('profEmail').value=u.email||'';
    document.getElementById('profPhone').value=u.phone||'';
    document.getElementById('profCity').value=u.city||'';
    document.getElementById('profQualification').value=u.qualification||'';
    
    // Enrolled courses
    const el=data.enrollments||[];
    if(!el.length){
      document.getElementById('enrolledCourses').innerHTML='<div class="empty"><i class="fas fa-book-open"></i><h3>No courses yet</h3><p>Start learning by enrolling in a program</p><a href="/courses" class="btn btn-primary">Browse Programs</a></div>';
    }else{
      document.getElementById('enrolledCourses').innerHTML=\`
        <div class="grid grid-2">
          \${el.map(e=>\`
            <div class="card" style="padding:24px">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
                <span class="badge \${e.status==='completed'?'badge-green':'badge-blue'}">\${e.status}</span>
                <span style="font-size:12px;color:var(--text-light)">\${e.category_name||''}</span>
              </div>
              <h3 style="font-size:16px;font-weight:700;margin-bottom:4px">\${e.title}</h3>
              <p style="font-size:13px;color:var(--orange);margin-bottom:12px">\${e.university}</p>
              <div style="display:flex;gap:16px;font-size:12px;color:var(--text-light);margin-bottom:16px">
                <span><i class="fas fa-clock"></i> \${e.duration_weeks} weeks</span>
                <span><i class="fas fa-layer-group"></i> \${e.total_modules} modules</span>
                <span><i class="fas fa-certificate"></i> \${e.certificate_type||'Certificate'}</span>
              </div>
              <div style="margin-bottom:12px">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px">
                  <span style="font-weight:600">Progress</span>
                  <span style="font-weight:700;color:\${e.progress>=100?'var(--green)':'var(--accent)'}">\${e.progress}%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width:\${e.progress}%"></div></div>
              </div>
              <div style="display:flex;gap:8px">
                <a href="/course/\${e.slug}" class="btn btn-primary btn-sm" style="flex:1">
                  \${e.status==='completed'?'<i class="fas fa-eye"></i> Review':'<i class="fas fa-play"></i> Continue'}
                </a>
                \${e.status!=='completed'?'<button onclick="updateProgress('+e.course_id+','+(Math.min(e.progress+10,100))+')" class="btn btn-outline btn-sm" title="Mark progress"><i class="fas fa-plus"></i></button>':''}
              </div>
            </div>
          \`).join('')}
        </div>
      \`;
    }
    
    // Certificates
    const completed=el.filter(e=>e.status==='completed');
    if(!completed.length){
      document.getElementById('certificatesList').innerHTML='<div class="empty"><i class="fas fa-award"></i><h3>No certificates yet</h3><p>Complete a program to earn your certificate</p></div>';
    }else{
      document.getElementById('certificatesList').innerHTML=\`
        <div class="grid grid-2">
          \${completed.map(e=>\`
            <div class="card" style="padding:24px;border:2px solid var(--green)">
              <div style="text-align:center">
                <div style="width:64px;height:64px;border-radius:50%;background:rgba(0,204,153,.1);display:flex;align-items:center;justify-content:center;margin:0 auto 12px">
                  <i class="fas fa-award" style="font-size:28px;color:var(--green)"></i>
                </div>
                <h3 style="font-size:16px;font-weight:700;margin-bottom:4px">\${e.certificate_type||'Certificate'}</h3>
                <p style="font-size:14px;color:var(--text-light);margin-bottom:4px">\${e.title}</p>
                <p style="font-size:12px;color:var(--orange);font-weight:600">\${e.university||''}</p>
                <p style="font-size:12px;color:var(--text-lighter);margin-top:8px">Completed on \${new Date(e.completed_at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</p>
              </div>
            </div>
          \`).join('')}
        </div>
      \`;
    }
  }catch(e){showToast(e.message,'error')}
}

async function updateProgress(courseId,progress){
  try{
    await api('/api/student/progress',{method:'PUT',body:JSON.stringify({courseId,progress})});
    showToast('Progress updated!','success');
    loadDashboard();
  }catch(e){showToast(e.message,'error')}
}

async function updateProfile(e){
  e.preventDefault();
  const btn=document.getElementById('profBtn');
  btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Saving...';
  try{
    const data=await api('/api/student/profile',{method:'PUT',body:JSON.stringify({
      name:document.getElementById('profName').value,
      phone:document.getElementById('profPhone').value,
      city:document.getElementById('profCity').value,
      qualification:document.getElementById('profQualification').value
    })});
    const auth=getAuth();
    auth.user={...auth.user,...data.user};
    setAuth(auth);
    showToast('Profile updated successfully!','success');
  }catch(e){showToast(e.message,'error')}
  finally{btn.disabled=false;btn.innerHTML='<i class="fas fa-save"></i> Update Profile'}
}

loadDashboard();
</script>
<style>
@media(max-width:768px){#dashStats{grid-template-columns:repeat(2,1fr) !important}#enrolledCourses .grid{grid-template-columns:1fr !important}}
</style>
`);
}
