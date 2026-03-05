import { layout } from './layout'

export function registerPage() {
  return layout('Register', `
<section style="min-height:calc(100vh - 72px);display:flex;align-items:center;justify-content:center;background:var(--bg-gray);padding:48px 24px">
  <div style="width:100%;max-width:480px">
    <div style="text-align:center;margin-bottom:32px">
      <a href="/" class="nav-logo" style="font-size:28px;display:inline-flex;margin-bottom:12px"><span class="up">Upgrade</span><span class="edu">EDU</span></a>
      <h1 style="font-size:28px;font-weight:800;margin-bottom:6px;font-family:'Playfair Display',serif">Create Your Account</h1>
      <p style="color:var(--text-light);font-size:14px">Start your learning journey today — It's free!</p>
    </div>
    
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-xl);padding:32px">
      <form onsubmit="handleRegister(event)">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" class="form-input" placeholder="Your full name" id="regName" required>
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-input" placeholder="+91 9876543210" id="regPhone">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address *</label>
          <input type="email" class="form-input" placeholder="name@example.com" id="regEmail" required>
        </div>
        <div class="form-group">
          <label class="form-label">Password *</label>
          <input type="password" class="form-input" placeholder="Minimum 6 characters" id="regPassword" required minlength="6">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group">
            <label class="form-label">City</label>
            <input type="text" class="form-input" placeholder="Your city" id="regCity">
          </div>
          <div class="form-group">
            <label class="form-label">Qualification</label>
            <select class="form-input" id="regQualification">
              <option value="">Select</option>
              <option>12th Pass</option>
              <option>B.Tech / B.E.</option>
              <option>B.Sc</option>
              <option>BCA</option>
              <option>B.Com</option>
              <option>BBA</option>
              <option>M.Tech / M.E.</option>
              <option>M.Sc</option>
              <option>MBA</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div style="margin-bottom:20px">
          <label style="display:flex;align-items:flex-start;gap:8px;font-size:13px;cursor:pointer;line-height:1.5">
            <input type="checkbox" required style="accent-color:var(--accent);margin-top:3px">
            I agree to the <a href="#" style="color:var(--accent)">Terms of Service</a> and <a href="#" style="color:var(--accent)">Privacy Policy</a>
          </label>
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block" id="regBtn">
          <i class="fas fa-user-plus"></i> Create Account
        </button>
      </form>
      
      <div style="margin-top:20px;text-align:center">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <div style="flex:1;height:1px;background:var(--border)"></div>
          <span style="font-size:12px;color:var(--text-lighter)">OR</span>
          <div style="flex:1;height:1px;background:var(--border)"></div>
        </div>
        <button class="btn btn-outline btn-block" style="margin-bottom:8px" disabled>
          <i class="fab fa-google" style="color:#4285f4"></i> Sign up with Google
        </button>
      </div>
    </div>
    
    <p style="text-align:center;margin-top:20px;font-size:14px;color:var(--text-light)">
      Already have an account? <a href="/login" style="color:var(--accent);font-weight:600">Sign in</a>
    </p>
  </div>
</section>

<script>
async function handleRegister(e){
  e.preventDefault();
  const btn=document.getElementById('regBtn');
  btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Creating account...';
  try{
    const data=await api('/api/auth/register',{method:'POST',body:JSON.stringify({
      name:document.getElementById('regName').value,
      email:document.getElementById('regEmail').value,
      password:document.getElementById('regPassword').value,
      phone:document.getElementById('regPhone').value,
      city:document.getElementById('regCity').value,
      qualification:document.getElementById('regQualification').value
    })});
    setAuth({user:data.user,token:data.token});
    showToast('Account created successfully! Welcome to UpgradeEDU','success');
    setTimeout(()=>window.location.href='/dashboard',1000);
  }catch(err){
    showToast(err.message,'error');
    btn.disabled=false;btn.innerHTML='<i class="fas fa-user-plus"></i> Create Account';
  }
}

if(getAuth())window.location.href='/dashboard';
</script>
`);
}
