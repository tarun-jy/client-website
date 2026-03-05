import { layout } from './layout'

export function coursesPage() {
  return layout('All Programs', `
<section style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:48px 0">
  <div class="container">
    <h1 style="font-size:36px;font-weight:800;color:#fff;margin-bottom:8px;font-family:'Playfair Display',serif">Explore All Programs</h1>
    <p style="color:rgba(255,255,255,.6);font-size:15px">Discover world-class programs from India's top universities</p>
    <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap" id="filterChips"></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div style="display:grid;grid-template-columns:280px 1fr;gap:32px">
      <!-- Sidebar Filters -->
      <div>
        <div style="position:sticky;top:96px">
          <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px">
            <h3 style="font-size:16px;font-weight:700;margin-bottom:20px"><i class="fas fa-filter" style="color:var(--accent);margin-right:8px"></i>Filters</h3>
            
            <!-- Search -->
            <div class="form-group">
              <label class="form-label">Search</label>
              <input type="text" class="form-input" placeholder="Search programs..." id="searchInput" oninput="debounceSearch()">
            </div>
            
            <!-- Category -->
            <div class="form-group">
              <label class="form-label">Category</label>
              <select class="form-input" id="categoryFilter" onchange="loadCourses()">
                <option value="">All Categories</option>
              </select>
            </div>
            
            <!-- Level -->
            <div class="form-group">
              <label class="form-label">Level</label>
              <select class="form-input" id="levelFilter" onchange="loadCourses()">
                <option value="">All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Executive</option>
              </select>
            </div>
            
            <button onclick="resetFilters()" class="btn btn-outline btn-sm btn-block" style="margin-top:8px">
              <i class="fas fa-redo"></i> Reset Filters
            </button>
          </div>
        </div>
      </div>
      
      <!-- Course Grid -->
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
          <div id="resultCount" style="font-size:14px;color:var(--text-light)">Loading programs...</div>
          <select class="form-input" style="width:auto;padding:8px 32px 8px 12px" id="sortFilter" onchange="loadCourses()">
            <option value="">Sort: Recommended</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
        <div id="coursesGrid" class="grid grid-2">
          <div class="loader"><div class="spinner"></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
let searchTimeout;
function debounceSearch(){clearTimeout(searchTimeout);searchTimeout=setTimeout(loadCourses,400)}

async function loadCourses(){
  const grid=document.getElementById('coursesGrid');
  const category=document.getElementById('categoryFilter').value;
  const level=document.getElementById('levelFilter').value;
  const search=document.getElementById('searchInput').value;
  
  let url='/api/courses?limit=20';
  if(category)url+='&category='+category;
  if(level)url+='&level='+level;
  if(search)url+='&search='+encodeURIComponent(search);
  
  try{
    const data=await api(url);
    let courses=data.courses||[];
    const sort=document.getElementById('sortFilter').value;
    if(sort==='price_low')courses.sort((a,b)=>a.price-b.price);
    if(sort==='price_high')courses.sort((a,b)=>b.price-a.price);
    if(sort==='rating')courses.sort((a,b)=>b.rating-a.rating);
    if(sort==='popular')courses.sort((a,b)=>b.total_enrolled-a.total_enrolled);
    
    document.getElementById('resultCount').textContent=courses.length+' program'+(courses.length!==1?'s':'')+' found';
    
    if(!courses.length){
      grid.innerHTML='<div class="empty" style="grid-column:1/-1"><i class="fas fa-search"></i><h3>No programs found</h3><p>Try adjusting your filters</p></div>';
      return;
    }
    
    grid.innerHTML=courses.map(c=>\`
      <a href="/course/\${c.slug}" class="card" style="display:block">
        <div style="padding:24px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap">
            <span class="badge badge-blue">\${c.category_name||''}</span>
            <span class="badge badge-orange">\${c.level}</span>
            \${c.is_trending?\`<span class="badge badge-red"><i class="fas fa-fire"></i> Trending</span>\`:''}
          </div>
          <h3 style="font-size:16px;font-weight:700;line-height:1.4;margin-bottom:6px">\${c.title}</h3>
          <p style="font-size:13px;color:var(--orange);font-weight:600;margin-bottom:10px">\${c.university}</p>
          <p style="font-size:13px;color:var(--text-light);line-height:1.6;margin-bottom:14px">\${c.short_description?.substring(0,120)||''}...</p>
          <div style="display:flex;gap:16px;font-size:12px;color:var(--text-light);margin-bottom:16px;flex-wrap:wrap">
            <span><i class="far fa-clock"></i> \${c.duration_weeks} weeks</span>
            <span><i class="fas fa-star" style="color:#f59e0b"></i> \${c.rating} (\${c.total_reviews?.toLocaleString()})</span>
            <span><i class="fas fa-users"></i> \${(c.total_enrolled||0).toLocaleString()} learners</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--border)">
            <div>
              <span style="font-size:22px;font-weight:800;color:var(--accent)">\${formatPrice(c.price)}</span>
              \${c.original_price>c.price?\`<span style="font-size:12px;color:var(--text-lighter);text-decoration:line-through;margin-left:6px">\${formatPrice(c.original_price)}</span>\`:''}
            </div>
            <span class="btn btn-primary btn-sm">View Details <i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      </a>
    \`).join('');
  }catch(e){grid.innerHTML='<p style="color:red">Error loading courses</p>'}
}

async function loadFilterCategories(){
  try{
    const data=await api('/api/public/categories');
    const sel=document.getElementById('categoryFilter');
    data.categories.forEach(c=>{
      const opt=document.createElement('option');
      opt.value=c.slug;opt.textContent=c.name;
      sel.appendChild(opt);
    });
    // Set from URL param
    const urlCat=new URLSearchParams(window.location.search).get('category');
    if(urlCat)sel.value=urlCat;
  }catch(e){}
}

function resetFilters(){
  document.getElementById('searchInput').value='';
  document.getElementById('categoryFilter').value='';
  document.getElementById('levelFilter').value='';
  document.getElementById('sortFilter').value='';
  loadCourses();
}

loadFilterCategories().then(()=>loadCourses());
</script>
<style>
@media(max-width:768px){
  section.section .container>div{grid-template-columns:1fr !important}
  #coursesGrid{grid-template-columns:1fr !important}
}
</style>
`);
}
