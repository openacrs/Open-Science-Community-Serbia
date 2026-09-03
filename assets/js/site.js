document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu-toggle');
  const close = document.querySelector('.menu-close');
  const nav = document.getElementById('nav-list');
  if (!button || !nav) return;

  const openMenu = () => {
    nav.classList.add('open');
    document.body.classList.add('nav-open');
    button.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    button.setAttribute('aria-expanded', 'false');
  };

  button.addEventListener('click', () => nav.classList.contains('open') ? closeMenu() : openMenu());
  if (close) close.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (document.body.classList.contains('nav-open') && !nav.contains(e.target) && e.target !== button) closeMenu();
  });
});
