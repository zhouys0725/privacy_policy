(() => {
  const menu = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('.mobile-nav');
  function closeMenu() {
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', '打开导航');
    if (mobile) mobile.hidden = true;
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
    mobile.hidden = !open;
  });
  mobile?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); menu?.focus(); } });
  matchMedia('(min-width:761px)').addEventListener('change', closeMenu);
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  if (!reduced.matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    reduced.addEventListener('change', e => { if (e.matches) { observer.disconnect(); document.documentElement.classList.remove('motion-ready'); } });
  }
})();
