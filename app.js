
// Year
document.addEventListener('DOMContentLoaded', ()=>{
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
});

// Nav hide/show + background
const nav = document.getElementById('siteNav');
let lastY = window.scrollY;
const topThreshold = 40;
function onScroll(){
  const y = window.scrollY;
  if(y > topThreshold){ nav.classList.remove('nav--top'); nav.classList.add('nav--scrolled'); }
  else { nav.classList.add('nav--top'); nav.classList.remove('nav--scrolled'); }
  if (y > lastY && y > 140){ nav.classList.add('nav--hidden'); }
  else { nav.classList.remove('nav--hidden'); }
  lastY = y;
}
onScroll();
window.addEventListener('scroll', onScroll, {passive:true});

// Mobile menu
const btn = document.getElementById('menuBtn');
const menu = document.getElementById('mobileMenu');
if(btn){ btn.addEventListener('click', ()=>{ const open = menu.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true':'false'); }); }
if(menu){ menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');btn?.setAttribute('aria-expanded','false')})) }

// Reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, {threshold: .12});
document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

// Tabs
function setupTabs(scope){
  const tabs = scope.querySelectorAll('[role="tab"]');
  const panels = scope.parentElement.querySelectorAll('[role="tabpanel"]');
  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=> activate(tab));
    tab.addEventListener('keydown', (e)=>{
      const i = Array.from(tabs).indexOf(tab);
      if(e.key==='ArrowRight'){ (tabs[i+1]||tabs[0]).focus(); }
      if(e.key==='ArrowLeft'){ (tabs[i-1]||tabs[tabs.length-1]).focus(); }
    });
  });
  function activate(tab){
    tabs.forEach(t=>{t.setAttribute('aria-selected', t===tab ? 'true':'false');});
    panels.forEach(p=>{ const match = p.getAttribute('aria-labelledby') === tab.id; p.hidden = !match; });
  }
}
document.querySelectorAll('.tabs').forEach(t=>setupTabs(t));
