import { layout } from './layout'

export function blogDetailPage() {
  return layout('Blog Post', `
<div id="blogContent">
  <div class="loader" style="padding:80px 0"><div class="spinner"></div></div>
</div>

<script>
async function loadBlogDetail() {
  const slug = window.location.pathname.split('/blog/')[1];
  if (!slug) return;
  try {
    const data = await api('/api/public/blogs/' + slug);
    const b = data.blog;
    const related = data.related || [];
    const tags = (b.tags || '').split(',').filter(Boolean);
    const date = b.published_at ? new Date(b.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    
    document.title = (b.meta_title || b.title) + ' | UpgradeEdu Blog';
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', b.meta_description || b.excerpt || '');
    
    document.getElementById('blogContent').innerHTML = \`
    <!-- Blog Header -->
    <section style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:48px 0 56px">
      <div class="container" style="max-width:900px">
        <div style="margin-bottom:16px">
          <a href="/blog" style="color:rgba(255,255,255,.5);font-size:13px;display:inline-flex;align-items:center;gap:6px"><i class="fas fa-arrow-left"></i> Back to Blog</a>
        </div>
        <span class="badge badge-blue" style="margin-bottom:16px">\${b.category || 'General'}</span>
        <h1 style="font-size:40px;font-weight:800;color:#fff;line-height:1.25;margin-bottom:20px;font-family:'Playfair Display',serif">\${b.title}</h1>
        <p style="font-size:17px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:24px">\${b.excerpt || ''}</p>
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--orange));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:15px">\${(b.author_name || 'A').charAt(0)}</div>
            <div>
              <div style="font-size:14px;font-weight:600;color:#fff">\${b.author_name || 'Admin'}</div>
              <div style="font-size:12px;color:rgba(255,255,255,.4)">\${date}</div>
            </div>
          </div>
          <span style="width:1px;height:24px;background:rgba(255,255,255,.15)"></span>
          <span style="font-size:13px;color:rgba(255,255,255,.4)"><i class="fas fa-clock"></i> \${b.reading_time || 5} min read</span>
          <span style="font-size:13px;color:rgba(255,255,255,.4)"><i class="fas fa-eye"></i> \${(b.views || 0).toLocaleString()} views</span>
        </div>
      </div>
    </section>
    
    \${(b.featured_image || b.thumbnail) ? '<div style="max-width:900px;margin:-32px auto 0;padding:0 24px;position:relative;z-index:2"><img src="'+(b.featured_image || b.thumbnail)+'" style="width:100%;border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);max-height:480px;object-fit:cover" alt="'+b.title+'"></div>' : ''}
    
    <!-- Blog Content -->
    <section style="padding:48px 0 80px">
      <div class="container" style="max-width:800px">
        <div class="blog-content" style="font-size:16px;line-height:1.9;color:var(--text)">
          \${b.content_html || b.content || '<p>Content coming soon...</p>'}
        </div>
        
        \${tags.length ? '<div style="margin-top:40px;padding-top:24px;border-top:1px solid var(--border)"><div style="font-size:13px;font-weight:600;color:var(--text-light);margin-bottom:12px">Tags</div><div style="display:flex;flex-wrap:wrap;gap:8px">' + tags.map(t => '<a href="/blog?tag='+t.trim()+'" class="chip" style="font-size:12px">'+t.trim()+'</a>').join('') + '</div></div>' : ''}
        
        <!-- Share -->
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid var(--border);display:flex;align-items:center;gap:12px">
          <span style="font-size:13px;font-weight:600;color:var(--text-light)">Share:</span>
          <a href="https://twitter.com/intent/tweet?url=\${encodeURIComponent(window.location.href)}&text=\${encodeURIComponent(b.title)}" target="_blank" style="width:36px;height:36px;border-radius:50%;background:var(--bg-gray);display:flex;align-items:center;justify-content:center;color:var(--text-light)"><i class="fab fa-twitter"></i></a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=\${encodeURIComponent(window.location.href)}&title=\${encodeURIComponent(b.title)}" target="_blank" style="width:36px;height:36px;border-radius:50%;background:var(--bg-gray);display:flex;align-items:center;justify-content:center;color:var(--text-light)"><i class="fab fa-linkedin-in"></i></a>
          <button onclick="navigator.clipboard.writeText(window.location.href);showToast('Link copied!','success')" style="width:36px;height:36px;border-radius:50%;background:var(--bg-gray);display:flex;align-items:center;justify-content:center;color:var(--text-light)"><i class="fas fa-link"></i></button>
        </div>
      </div>
    </section>
    
    \${related.length ? '<section style="padding:0 0 80px"><div class="container" style="max-width:900px"><h3 style="font-size:24px;font-weight:700;margin-bottom:24px">Related Articles</h3><div class="grid grid-3">' + related.map(r => '<a href="/blog/'+r.slug+'" class="card" style="display:block"><div style="background:linear-gradient(135deg,#1a1a2e,#0f3460);height:160px;display:flex;align-items:center;justify-content:center">'+(r.featured_image||r.thumbnail?'<img src="'+(r.featured_image||r.thumbnail)+'" style="width:100%;height:100%;object-fit:cover">':'<i class="fas fa-file-alt" style="font-size:28px;color:rgba(255,255,255,.3)"></i>')+'</div><div style="padding:20px"><span style="font-size:11px;color:var(--accent);text-transform:uppercase;letter-spacing:.5px;font-weight:600">'+(r.category||'')+'</span><h4 style="font-size:15px;font-weight:700;margin:8px 0;line-height:1.4">'+r.title+'</h4><span style="font-size:12px;color:var(--text-light)"><i class="fas fa-clock"></i> '+(r.reading_time||5)+' min read</span></div></a>').join('') + '</div></div></section>' : ''}
    
    <!-- CTA -->
    <section style="background:linear-gradient(135deg,var(--accent),var(--orange));padding:56px 0">
      <div class="container" style="text-align:center;max-width:600px">
        <h3 style="font-size:28px;font-weight:800;color:#fff;margin-bottom:12px">Ready to Start Your Journey?</h3>
        <p style="color:rgba(255,255,255,.85);margin-bottom:24px;font-size:15px">Explore our programs and take the next step in your career</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="/courses" class="btn btn-lg" style="background:#fff;color:var(--accent);font-weight:700"><i class="fas fa-graduation-cap"></i> Explore Programs</a>
          <a href="/blog" class="btn btn-lg" style="background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.3)"><i class="fas fa-newspaper"></i> More Articles</a>
        </div>
      </div>
    </section>
    \`;
  } catch (e) {
    document.getElementById('blogContent').innerHTML = '<div class="empty" style="padding:80px 24px"><i class="fas fa-exclamation-circle"></i><h3>Article Not Found</h3><p>The article you are looking for does not exist or has been removed.</p><a href="/blog" class="btn btn-primary">Browse Articles</a></div>';
  }
}

loadBlogDetail();
</script>
<style>
.blog-content h2{font-size:24px;font-weight:700;margin:32px 0 16px;color:var(--text)}
.blog-content h3{font-size:20px;font-weight:700;margin:28px 0 12px;color:var(--text)}
.blog-content p{margin-bottom:20px;color:#374151}
.blog-content ul,.blog-content ol{margin:16px 0;padding-left:24px}
.blog-content li{margin-bottom:8px;color:#374151}
.blog-content a{color:var(--accent);text-decoration:underline}
.blog-content blockquote{border-left:3px solid var(--accent);padding:16px 20px;margin:24px 0;background:var(--bg-gray);border-radius:0 var(--radius) var(--radius) 0;font-style:italic;color:var(--text-light)}
.blog-content code{background:var(--bg-gray);padding:2px 6px;border-radius:4px;font-size:14px;color:var(--accent)}
.blog-content pre{background:#1a1a2e;color:#e2e8f0;padding:20px;border-radius:var(--radius-lg);overflow-x:auto;margin:24px 0}
.blog-content pre code{background:transparent;color:inherit;padding:0}
.blog-content img{width:100%;border-radius:var(--radius-lg);margin:24px 0}
@media(max-width:768px){
  .blog-content{font-size:15px}
  #blogContent section:first-child h1{font-size:28px !important}
}
</style>
`);
}
