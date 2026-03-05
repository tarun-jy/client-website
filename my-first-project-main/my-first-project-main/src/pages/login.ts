import { layout } from './layout'

export function loginPage() {
  return layout('Login', `
<section style="min-height:calc(100vh - 72px);display:flex;align-items:center;justify-content:center;background:var(--bg-gray);padding:48px 24px">
  <div style="width:100%;max-width:440px">
    <div style="text-align:center;margin-bottom:32px">
      <a href="/" class="nav-logo" style="font-size:28px;display:inline-flex;margin-bottom:12px"><span class="up">Upgrade</span><span class="edu">EDU</span></a>
      <h1 style="font-size:28px;font-weight:800;margin-bottom:6px;font-family:'Playfair Display',serif">Welcome Back</h1>
      <p style="color:var(--text-light);font-size:14px">Continue your learning journey</p>
    </div>
    
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-xl);padding:32px">
      <form onsubmit="handleLogin(event)">
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" placeholder="name@example.com" id="loginEmail" required>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div style="position:relative">
            <input type="password" class="form-input" placeholder="Enter your password" id="loginPassword" required style="padding-right:44px">
            <button type="button" onclick="togglePassword()" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-light);cursor:pointer"><i class="fas fa-eye" id="eyeIcon"></i></button>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
            <input type="checkbox" style="accent-color:var(--accent)"> Remember me
          </label>
          <a href="#" style="font-size:13px;color:var(--accent);font-weight:500">Forgot password?</a>
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block" id="loginBtn">
          <i class="fas fa-sign-in-alt"></i> Sign In
        </button>
      </form>
      
      <div style="margin-top:20px;text-align:center">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <div style="flex:1;height:1px;background:var(--border)"></div>
          <span style="font-size:12px;color:var(--text-lighter)">OR</span>
          <div style="flex:1;height:1px;background:var(--border)"></div>
        </div>
        <button class="btn btn-outline btn-block" style="margin-bottom:8px" disabled>
          <i class="fab fa-google" style="color:#4285f4"></i> Continue with Google
        </button>
        <button class="btn btn-outline btn-block" disabled>
          <i class="fab fa-linkedin-in" style="color:#0077b5"></i> Continue with LinkedIn
        </button>
      </div>
    </div>
    
    <p style="text-align:center;margin-top:20px;font-size:14px;color:var(--text-light)">
      Don't have an account? <a href="/register" style="color:var(--accent);font-weight:600">Sign up for free</a>
    </p>
    
    <!-- Demo Credentials -->
    <div style="background:rgba(37,99,235,.06);border:1px solid rgba(37,99,235,.15);border-radius:var(--radius-lg);padding:16px;margin-top:16px">
      <div style="font-size:12px;font-weight:700;color:var(--blue);margin-bottom:8px"><i class="fas fa-info-circle"></i> Demo Credentials</div>
      <div style="font-size:12px;color:var(--text-light);line-height:1.8">
        <strong>Admin:</strong> admin@upgradedu.com / admin123<br>
        <strong>Student:</strong> rahul@test.com / pass123
      </div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button onclick="fillDemo('admin')" class="btn btn-sm" style="background:rgba(37,99,235,.1);color:var(--blue);font-size:11px">Fill Admin</button>
        <button onclick="fillDemo('student')" class="btn btn-sm" style="background:rgba(37,99,235,.1);color:var(--blue);font-size:11px">Fill Student</button>
      </div>
    </div>
  </div>
</section>

<script>
function togglePassword(){
  const p=document.getElementById('loginPassword');
  const i=document.getElementById('eyeIcon');
  if(p.type==='password'){p.type='text';i.className='fas fa-eye-slash'}
  else{p.type='password';i.className='fas fa-eye'}
}

function fillDemo(role){
  if(role==='admin'){
    document.getElementById('loginEmail').value='admin@upgradedu.com';
    document.getElementById('loginPassword').value='admin123';
  }else{
    document.getElementById('loginEmail').value='rahul@test.com';
    document.getElementById('loginPassword').value='pass123';
  }
}

async function handleLogin(e){
  e.preventDefault();
  const btn=document.getElementById('loginBtn');
  btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Signing in...';
  try{
    const data=await api('/api/auth/login',{method:'POST',body:JSON.stringify({
      email:document.getElementById('loginEmail').value,
      password:document.getElementById('loginPassword').value
    })});
    setAuth({user:data.user,token:data.token});
    showToast('Welcome back, '+data.user.name+'!','success');
    const redirect=new URLSearchParams(window.location.search).get('redirect');
    setTimeout(()=>{
      if(data.user.role==='admin')window.location.href='/admin';
      else window.location.href=redirect||'/dashboard';
    },800);
  }catch(err){
    showToast(err.message,'error');
    btn.disabled=false;btn.innerHTML='<i class="fas fa-sign-in-alt"></i> Sign In';
  }
}

// Redirect if already logged in
if(getAuth()){
  const auth=getAuth();
  if(auth.user.role==='admin')window.location.href='/admin';
  else window.location.href='/dashboard';
}
</script>
`);
}
