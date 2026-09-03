(() => {
  const header = document.getElementById('site-header-inner');
  if (!header) return;

  const script = document.currentScript;
  const scriptUrl = new URL(script.src, window.location.href);
  const root = scriptUrl.href.replace(/assets\/js\/menu\.js(?:\?.*)?$/, '');
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');

  const u = (path = '') => new URL(path, root).href;

  const srMenu = `
    <nav aria-label="Primary" class="site-nav">
      <button aria-controls="nav-list" aria-expanded="false" class="menu-toggle">Menu</button>
      <ul id="nav-list">
        <li><a href="${u('vise-o-oscs/')}">O OSCS</a></li>
        <li><a href="${u('clanstvo/')}">Članstvo</a>
          <ul>
            <li><a href="${u('clanstvo/uclanite-se/')}">Učlanite se u OSCS!</a></li>
            <li><a href="${u('clanstvo/nasi-clanovi/')}">Naši članovi</a></li>
            <li><a href="${u('clanstvo/kodeks-oscs/')}">Osnovni principi i Kodeks ponašanja</a></li>
          </ul>
        </li>
        <li><a href="${u('konferencije-i-obuke/')}">Konferencije i obuke</a></li>
        <li><a href="${u('vesti/')}">Vesti</a></li>
        <li><a href="${u('sastanci/')}">Sastanci</a></li>
        <li><a href="${u('kontakt/')}">Kontakt</a></li>
      </ul>
    </nav>
    <a class="lang-switch" href="${u('en/')}">English</a>`;

  const enMenu = `
    <nav aria-label="Primary" class="site-nav">
      <button aria-controls="nav-list" aria-expanded="false" class="menu-toggle">Menu</button>
      <ul id="nav-list">
        <li><a href="${u('en/about-oscs/')}">About OSCS</a></li>
        <li><a href="${u('en/conferences-and-training/')}">Conferences and training</a></li>
        <li><a href="${u('en/news/')}">News</a></li>
        <li><a href="${u('en/contact/')}">Contact</a></li>
      </ul>
    </nav>
    <a class="lang-switch" href="${u('')}">Srpski</a>`;

  header.innerHTML = `
    <a class="brand" href="${u(isEnglish ? 'en/' : '')}">
      <img alt="Open Science Community Serbia" class="brand-logo" src="${u('images/Logo-OSCSerbia.png')}">
    </a>
    ${isEnglish ? enMenu : srMenu}`;
})();
