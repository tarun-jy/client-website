import { layout } from './layout'

export function aboutPage() {
  return layout('About Us', `
<section style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:64px 0">
  <div class="container" style="text-align:center">
    <h1 style="font-size:40px;font-weight:800;color:#fff;margin-bottom:12px;font-family:'Playfair Display',serif">About UpgradeEDU</h1>
    <p style="color:rgba(255,255,255,.6);font-size:16px;max-width:600px;margin:0 auto">India's leading online higher education platform powering career success for millions</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-bottom:64px">
      <div>
        <div class="badge badge-red" style="margin-bottom:12px">Our Story</div>
        <h2 style="font-size:28px;font-weight:800;line-height:1.3;margin-bottom:16px">Transforming Lives Through Quality Education</h2>
        <p style="color:var(--text-light);line-height:1.8;margin-bottom:16px">Founded in 2015, UpgradeEDU was born from a simple belief — that quality education should be accessible to every working professional, regardless of their location or schedule.</p>
        <p style="color:var(--text-light);line-height:1.8;margin-bottom:16px">Today, we partner with over 10 of India's most prestigious universities — including IITs, IIMs, and international institutions like Liverpool Business School — to deliver industry-relevant programs that create real career impact.</p>
        <p style="color:var(--text-light);line-height:1.8">Our platform has powered career transitions for over 50,000 professionals and serves more than 10 lakh learners across 85+ countries worldwide.</p>
      </div>
      <div style="background:linear-gradient(135deg,rgba(233,69,96,.08),rgba(244,121,32,.08));border-radius:24px;padding:48px;text-align:center">
        <div style="font-size:80px;font-weight:900;background:linear-gradient(135deg,#e94560,#f47920);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1">2015</div>
        <div style="font-size:18px;font-weight:700;color:var(--text);margin-top:8px">Year Founded</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:32px">
          <div><div style="font-size:32px;font-weight:800;color:var(--accent)">10L+</div><div style="font-size:13px;color:var(--text-light)">Learners</div></div>
          <div><div style="font-size:32px;font-weight:800;color:var(--orange)">85+</div><div style="font-size:13px;color:var(--text-light)">Countries</div></div>
          <div><div style="font-size:32px;font-weight:800;color:var(--green)">10+</div><div style="font-size:13px;color:var(--text-light)">University Partners</div></div>
          <div><div style="font-size:32px;font-weight:800;color:var(--blue)">50K+</div><div style="font-size:13px;color:var(--text-light)">Career Transitions</div></div>
        </div>
      </div>
    </div>

    <!-- Values -->
    <div style="text-align:center;margin-bottom:40px">
      <h2 class="section-title">Our Core Values</h2>
    </div>
    <div class="grid grid-3" style="margin-bottom:64px">
      <div style="text-align:center;padding:32px 24px;border:1px solid var(--border);border-radius:var(--radius-xl)">
        <div style="width:64px;height:64px;border-radius:50%;background:rgba(233,69,96,.1);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
          <i class="fas fa-bullseye" style="font-size:24px;color:var(--accent)"></i>
        </div>
        <h3 style="font-size:18px;font-weight:700;margin-bottom:8px">Outcome-Driven</h3>
        <p style="color:var(--text-light);font-size:14px;line-height:1.7">Every program is designed with career outcomes in mind. We measure our success by your success.</p>
      </div>
      <div style="text-align:center;padding:32px 24px;border:1px solid var(--border);border-radius:var(--radius-xl)">
        <div style="width:64px;height:64px;border-radius:50%;background:rgba(244,121,32,.1);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
          <i class="fas fa-handshake" style="font-size:24px;color:var(--orange)"></i>
        </div>
        <h3 style="font-size:18px;font-weight:700;margin-bottom:8px">Integrity First</h3>
        <p style="color:var(--text-light);font-size:14px;line-height:1.7">We maintain the highest standards of academic integrity and transparent business practices.</p>
      </div>
      <div style="text-align:center;padding:32px 24px;border:1px solid var(--border);border-radius:var(--radius-xl)">
        <div style="width:64px;height:64px;border-radius:50%;background:rgba(0,204,153,.1);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
          <i class="fas fa-lightbulb" style="font-size:24px;color:var(--green)"></i>
        </div>
        <h3 style="font-size:18px;font-weight:700;margin-bottom:8px">Innovation</h3>
        <p style="color:var(--text-light);font-size:14px;line-height:1.7">We continuously evolve our learning platform with cutting-edge technology and pedagogy.</p>
      </div>
    </div>

    <!-- Leadership -->
    <div style="text-align:center;margin-bottom:40px">
      <h2 class="section-title">Leadership Team</h2>
    </div>
    <div class="grid grid-4">
      <div style="text-align:center">
        <div style="width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#e94560,#f47920);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:#fff;font-size:32px;font-weight:700">RK</div>
        <h4 style="font-size:16px;font-weight:700">Ronnie Kumar</h4>
        <p style="font-size:13px;color:var(--text-light)">Co-founder & CEO</p>
      </div>
      <div style="text-align:center">
        <div style="width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#0c9);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:#fff;font-size:32px;font-weight:700">PM</div>
        <h4 style="font-size:16px;font-weight:700">Phalgun Mittapalli</h4>
        <p style="font-size:13px;color:var(--text-light)">Co-founder & CTO</p>
      </div>
      <div style="text-align:center">
        <div style="width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#f47920,#f59e0b);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:#fff;font-size:32px;font-weight:700">MS</div>
        <h4 style="font-size:16px;font-weight:700">Mayank Singh</h4>
        <p style="font-size:13px;color:var(--text-light)">Co-founder & COO</p>
      </div>
      <div style="text-align:center">
        <div style="width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#ec4899);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:#fff;font-size:32px;font-weight:700">AR</div>
        <h4 style="font-size:16px;font-weight:700">Arjun Reddy</h4>
        <p style="font-size:13px;color:var(--text-light)">VP Engineering</p>
      </div>
    </div>
  </div>
</section>
<style>
@media(max-width:768px){section.section .container>div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr !important}}
</style>
`);
}
