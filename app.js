
(function() {
  const nav = document.querySelector('.navbar');
  let lastY = window.scrollY;
  const hero = document.getElementById('hero');
  const heroHeight = hero ? hero.offsetHeight : 240;

  function onScroll() {
    const y = window.scrollY;
    if (y > heroHeight - 80) nav.classList.add('navbar--solid');
    else nav.classList.remove('navbar--solid');

    if (y > lastY && y > 140) nav.classList.add('navbar--hidden');
    else nav.classList.remove('navbar--hidden');
    lastY = y;
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('reveal--visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();
