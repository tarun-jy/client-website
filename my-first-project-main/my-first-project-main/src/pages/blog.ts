import { layout } from './layout'

export function blogPage() {
  return layout('Blog', `
<section style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:48px 0">
  <div class="container">
    <div style="max-width:700px">
      <div class="badge badge-orange" style="margin-bottom:12px"><i class="fas fa-newspaper"></i> Blog & Insights</div>
      <h1 style="font-size:40px;font-weight:800;color:#fff;line-height:1.2;margin-bottom:12px;font-family:'Playfair Display',serif">Knowledge Hub</h1>
      <p style="font-size:16px;color:rgba(255,255,255,.6);line-height:1.7">Expert insights, career guides, and industry trends from top educators and professionals.</p>
    </div>
  </div>
</section>

<!-- Category Filters -->
<section style="border-bottom:1px solid var(--border);background:#fff;position:sticky;top:72px;z-index:50">
  <div class="container">
    <div style="display:flex;gap:8px;overflow-x:auto;padding:14px 0" id="blogFilters">
      <button class="chip active" onclick="filterBlogs('')">All Posts</button>
    </div>
  </div>
</section>

<!-- Blog Grid -->
<section class="section" style="background:var(--bg-gray)">
  <div class="container">
    <!-- Featured Post -->
    <div id="featuredPost" style="margin-bottom:48px"></div>
    
    <!-- Blog Grid -->
    <div class="grid grid-3" id="blogGrid">
      <div class="loader" style="grid-column:1/-1"><div class="spinner"></div></div>
    </div>
    
    <!-- Load More -->
    <div style="text-align:center;margin-top:40px" id="blogLoadMore"></div>
  </div>
</section>

<script>
let currentCategory = '';
let blogOffset = 0;
const BLOG_LIMIT = 9;

async function loadBlogs(append = false) {
  try {
    let url = '/api/public/blogs?limit=' + BLOG_LIMIT + '&offset=' + blogOffset;
    if (currentCategory) url += '&category=' + encodeURIComponent(currentCategory);
    const data = await api(url);
    const grid = document.getElementById('blogGrid');
    const featured = document.getElementById('featuredPost');
    
    if (!append) {
      // Show featured post (first featured or first post)
      const feat = data.blogs.find(b => b.is_featured) || data.blogs[0];
      if (feat && blogOffset === 0) {
        featured.innerHTML = \`
          <a href="/blog/\${feat.slug}" class="card" style="display:grid;grid-template-columns:1.2fr 1fr;overflow:hidden">
            <div style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:40px;display:flex;flex-direction:column;justify-content:center">
              <span class="badge badge-red" style="width:fit-content;margin-bottom:16px"><i class="fas fa-star"></i> Featured</span>
              <span style="font-size:12px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">\${feat.category || 'General'}</span>
              <h2 style="font-size:28px;font-weight:800;color:#fff;line-height:1.3;margin-bottom:12px">\${feat.title}</h2>
              <p style="font-size:14px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:20px">\${(feat.excerpt || '').substring(0, 200)}</p>
              <div style="display:flex;align-items:center;gap:16px">
                <span style="font-size:13px;color:rgba(255,255,255,.5)"><i class="fas fa-user"></i> \${feat.author_name}</span>
                <span style="font-size:13px;color:rgba(255,255,255,.5)"><i class="fas fa-clock"></i> \${feat.reading_time || 5} min read</span>
                <span style="font-size:13px;color:rgba(255,255,255,.5)"><i class="fas fa-eye"></i> \${(feat.views || 0).toLocaleString()}</span>
              </div>
            </div>
            <div style="background:linear-gradient(135deg,var(--accent),var(--orange));display:flex;align-items:center;justify-content:center;min-height:300px">
              \${feat.featured_image || feat.thumbnail ? '<img src="'+(feat.featured_image || feat.thumbnail)+'" style="width:100%;height:100%;object-fit:cover">' : '<i class="fas fa-newspaper" style="font-size:64px;color:rgba(255,255,255,.3)"></i>'}
            </div>
          </a>
        \`;
      } else {
        featured.innerHTML = '';
      }
      
      // Filter out featured from grid
      const gridBlogs = data.blogs.filter(b => !feat || b.id !== feat.id);
      grid.innerHTML = gridBlogs.map(b => blogCard(b)).join('');
    } else {
      grid.innerHTML += data.blogs.map(b => blogCard(b)).join('');
    }
    
    // Load more button
    const loadMore = document.getElementById('blogLoadMore');
    if (data.blogs.length >= BLOG_LIMIT) {
      loadMore.innerHTML = '<button onclick="loadMoreBlogs()" class="btn btn-outline">Load More Articles <i class="fas fa-arrow-down"></i></button>';
    } else {
      loadMore.innerHTML = '';
    }
    
    // Update category filters
    if (!append && data.categories) {
      const filters = document.getElementById('blogFilters');
      filters.innerHTML = '<button class="chip ' + (!currentCategory ? 'active' : '') + '" onclick="filterBlogs(\\'\\')">All Posts</button>';
      data.categories.forEach(cat => {
        filters.innerHTML += '<button class="chip ' + (currentCategory === cat ? 'active' : '') + '" onclick="filterBlogs(\\'' + cat + '\\')">' + cat + '</button>';
      });
    }
    
    if (!data.blogs.length && !append) {
      grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><i class="fas fa-newspaper"></i><h3>No Articles Yet</h3><p>Check back soon for new content.</p></div>';
    }
  } catch (e) { console.error(e) }
}

function blogCard(b) {
  const date = b.published_at ? new Date(b.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  return \`
    <a href="/blog/\${b.slug}" class="card" style="display:flex;flex-direction:column">
      <div style="background:linear-gradient(135deg,\${getRandomGradient()});height:200px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">
        \${b.featured_image || b.thumbnail ? '<img src="'+(b.featured_image || b.thumbnail)+'" style="width:100%;height:100%;object-fit:cover">' : '<i class="fas fa-file-alt" style="font-size:36px;color:rgba(255,255,255,.3)"></i>'}
        <div style="position:absolute;top:12px;left:12px">
          <span class="badge badge-blue" style="background:rgba(0,0,0,.5);color:#fff;backdrop-filter:blur(4px)">\${b.category || 'General'}</span>
        </div>
      </div>
      <div style="padding:24px;flex:1;display:flex;flex-direction:column">
        <h3 style="font-size:17px;font-weight:700;line-height:1.4;margin-bottom:10px">\${b.title}</h3>
        <p style="font-size:13px;color:var(--text-light);line-height:1.7;margin-bottom:16px;flex:1">\${(b.excerpt || '').substring(0, 150)}...</p>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--text-lighter);border-top:1px solid var(--border);padding-top:14px">
          <span><i class="fas fa-user"></i> \${b.author_name}</span>
          <div style="display:flex;gap:12px">
            <span><i class="fas fa-clock"></i> \${b.reading_time || 5} min</span>
            <span><i class="fas fa-eye"></i> \${(b.views || 0).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </a>
  \`;
}

function getRandomGradient() {
  const gradients = ['#1a1a2e,#16213e', '#e94560,#f47920', '#0f3460,#16213e', '#2563eb,#7c3aed', '#059669,#0c9', '#f59e0b,#f47920'];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

function filterBlogs(cat) {
  currentCategory = cat;
  blogOffset = 0;
  document.querySelectorAll('#blogFilters .chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  loadBlogs();
}

function loadMoreBlogs() {
  blogOffset += BLOG_LIMIT;
  loadBlogs(true);
}

loadBlogs();
</script>
<style>
@media(max-width:768px){
  #featuredPost .card{grid-template-columns:1fr !important}
  #featuredPost .card>div:last-child{min-height:200px !important}
}
</style>
`, `
<meta property="og:title" content="Blog | UpgradeEdu">
<meta property="og:description" content="Expert insights, career guides, and industry trends from top educators.">
`);
}
