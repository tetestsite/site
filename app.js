(function(){
  const nav = document.getElementById('siteNav');
  let lastY = window.scrollY;
  const hero = document.getElementById('hero');
  const heroH = hero ? hero.offsetHeight : 240;

  function onScroll(){
    const y = window.scrollY;
    // solid background after hero
    if (y > heroH - 60) nav.classList.add('navbar--solid');
    else nav.classList.remove('navbar--solid');

    // hide on scroll down, show on scroll up
    if (y > lastY && y > 140) nav.classList.add('navbar--hidden');
    else nav.classList.remove('navbar--hidden');

    lastY = y;
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  // Mobile menu
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if(btn && menu){
    btn.addEventListener('click', ()=>{
      const open = menu.hasAttribute('hidden');
      if(open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden','');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('reveal--visible'); io.unobserve(e.target); }
    });
  }, {threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Footer year
  const yel = document.getElementById('year');
  if (yel) yel.textContent = new Date().getFullYear();
})();
