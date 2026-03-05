import { layout } from './layout'

export function contactPage() {
  return layout('Contact Us', `
<section style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:64px 0">
  <div class="container" style="text-align:center">
    <h1 style="font-size:40px;font-weight:800;color:#fff;margin-bottom:12px;font-family:'Playfair Display',serif">Get in Touch</h1>
    <p style="color:rgba(255,255,255,.6);font-size:16px;max-width:500px;margin:0 auto">Have questions? Our team is here to help you find the right program</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:48px">
      <!-- Contact Info -->
      <div>
        <h2 style="font-size:24px;font-weight:800;margin-bottom:24px">Contact Information</h2>
        
        <div style="margin-bottom:28px">
          <div style="display:flex;gap:16px;margin-bottom:20px">
            <div style="width:48px;height:48px;border-radius:12px;background:rgba(233,69,96,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <i class="fas fa-phone" style="color:var(--accent)"></i>
            </div>
            <div>
              <div style="font-size:14px;font-weight:700;margin-bottom:2px">Phone</div>
              <div style="font-size:14px;color:var(--text-light)">+91 1800-210-2020 (Toll Free)</div>
              <div style="font-size:12px;color:var(--text-lighter)">Mon-Sat, 10AM - 7PM IST</div>
            </div>
          </div>
          <div style="display:flex;gap:16px;margin-bottom:20px">
            <div style="width:48px;height:48px;border-radius:12px;background:rgba(244,121,32,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <i class="fas fa-envelope" style="color:var(--orange)"></i>
            </div>
            <div>
              <div style="font-size:14px;font-weight:700;margin-bottom:2px">Email</div>
              <div style="font-size:14px;color:var(--text-light)">support@upgradeedu.com</div>
              <div style="font-size:12px;color:var(--text-lighter)">We respond within 24 hours</div>
            </div>
          </div>
          <div style="display:flex;gap:16px;margin-bottom:20px">
            <div style="width:48px;height:48px;border-radius:12px;background:rgba(0,204,153,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <i class="fas fa-map-marker-alt" style="color:var(--green)"></i>
            </div>
            <div>
              <div style="font-size:14px;font-weight:700;margin-bottom:2px">Head Office</div>
              <div style="font-size:14px;color:var(--text-light)">Nishuvi, 75 Dr. Annie Besant Road,</div>
              <div style="font-size:14px;color:var(--text-light)">Worli, Mumbai - 400018</div>
            </div>
          </div>
          <div style="display:flex;gap:16px">
            <div style="width:48px;height:48px;border-radius:12px;background:rgba(37,99,235,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <i class="fas fa-clock" style="color:var(--blue)"></i>
            </div>
            <div>
              <div style="font-size:14px;font-weight:700;margin-bottom:2px">Working Hours</div>
              <div style="font-size:14px;color:var(--text-light)">Monday - Saturday</div>
              <div style="font-size:14px;color:var(--text-light)">10:00 AM - 7:00 PM IST</div>
            </div>
          </div>
        </div>
        
        <div style="padding:20px;background:var(--bg-gray);border-radius:var(--radius-xl)">
          <h4 style="font-size:14px;font-weight:700;margin-bottom:8px">Follow Us</h4>
          <div style="display:flex;gap:12px">
            <a href="#" style="width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:var(--text-light);transition:all .2s;border:1px solid var(--border)"><i class="fab fa-facebook-f"></i></a>
            <a href="#" style="width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:var(--text-light);transition:all .2s;border:1px solid var(--border)"><i class="fab fa-twitter"></i></a>
            <a href="#" style="width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:var(--text-light);transition:all .2s;border:1px solid var(--border)"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" style="width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:var(--text-light);transition:all .2s;border:1px solid var(--border)"><i class="fab fa-instagram"></i></a>
            <a href="#" style="width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:var(--text-light);transition:all .2s;border:1px solid var(--border)"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-xl);padding:36px">
        <h3 style="font-size:20px;font-weight:700;margin-bottom:4px">Send us a Message</h3>
        <p style="font-size:13px;color:var(--text-light);margin-bottom:24px">Fill the form below and we'll get back to you</p>
        <form onsubmit="submitContactForm(event)">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" class="form-input" placeholder="Your name" id="contactName" required>
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-input" placeholder="+91 9876543210" id="contactPhone">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address *</label>
            <input type="email" class="form-input" placeholder="your@email.com" id="contactEmail" required>
          </div>
          <div class="form-group">
            <label class="form-label">Area of Interest</label>
            <select class="form-input" id="contactInterest">
              <option value="">Select</option>
              <option>Data Science & Analytics</option>
              <option>MBA / Management</option>
              <option>Software Development</option>
              <option>Machine Learning & AI</option>
              <option>Digital Marketing</option>
              <option>Cyber Security</option>
              <option>Product Management</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea class="form-input" placeholder="Tell us how we can help you..." id="contactMessage" rows="4"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-block" id="contactBtn">
            <i class="fas fa-paper-plane"></i> Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

<script>
async function submitContactForm(e){
  e.preventDefault();
  const btn=document.getElementById('contactBtn');
  btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...';
  try{
    await api('/api/public/lead',{method:'POST',body:JSON.stringify({
      name:document.getElementById('contactName').value,
      email:document.getElementById('contactEmail').value,
      phone:document.getElementById('contactPhone').value,
      course_interest:document.getElementById('contactInterest').value,
      message:document.getElementById('contactMessage').value
    })});
    showToast('Message sent successfully! We will contact you soon.','success');
    e.target.reset();
  }catch(err){showToast(err.message,'error')}
  finally{btn.disabled=false;btn.innerHTML='<i class="fas fa-paper-plane"></i> Send Message'}
}
</script>
<style>
@media(max-width:768px){section.section .container>div{grid-template-columns:1fr !important}}
</style>
`);
}
