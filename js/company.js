(() => {
  const menu = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('.mobile-nav');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const closeMenu = () => { menu?.setAttribute('aria-expanded', 'false'); menu?.setAttribute('aria-label', '打开导航'); if (mobile) mobile.hidden = true; };
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航'); mobile.hidden = !open; });
  mobile?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); menu?.focus(); } });
  matchMedia('(min-width:761px)').addEventListener('change', closeMenu);
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const row = entry.target;
        if (row.classList.contains('work-row')) {
          const index = [...document.querySelectorAll('.work-row')].indexOf(row);
          row.querySelector('.work-media')?.animate([{ transform:`translateX(${index % 2 ? 35 : -35}px) scale(.97)`, opacity:.4 }, { transform:'translateX(0) scale(1)', opacity:1 }], { duration:1100,easing:'cubic-bezier(.22,1,.36,1)' });
          row.querySelector('.work-copy')?.animate([{ transform:'translateY(30px)',opacity:.25 },{ transform:'translateY(0)',opacity:1 }], { duration:1000,delay:100,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards' });
        } else {
          row.animate([{ transform:'translateY(24px)',opacity:.35 },{ transform:'translateY(0)',opacity:1 }], { duration:1000,easing:'cubic-bezier(.22,1,.36,1)' });
        }
        observer.unobserve(row);
      });
    }, { threshold:.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    reduced.addEventListener('change', e => { if (e.matches) { observer.disconnect(); document.getAnimations().forEach(a => a.cancel()); } });
  }
  const why = document.querySelector('.why-section');
  const arch = document.querySelector('.blue-arch');
  const connector = document.querySelector('.why-connectors path');
  let pending = false;
  const updateWhy = () => {
    pending = false;
    if (!why || !arch || reduced.matches || innerWidth < 761) { if (arch) arch.style.transform=''; return; }
    const rect=why.getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight*.95)));
    arch.style.transform=`translateY(${(1-progress)*55}px) scale(${.86+progress*.14})`;
    if (connector) connector.style.strokeDashoffset=String((1-progress)*250);
  };
  const onScroll = () => { if (!pending) { pending=true; requestAnimationFrame(updateWhy); } };
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);updateWhy();
})();
