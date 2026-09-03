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
      <button aria-controls="nav-list" aria-expanded="false" aria-label="Otvori meni" class="menu-toggle">Menu</button>
      <button aria-label="Zatvori meni" class="menu-close" type="button">×</button>
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
    <a class="header-search" href="${u('pretrazivanje/')}" aria-label="Pretraživanje" title="Pretraživanje">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l5 5"></path></svg>
    </a>
    <a class="lang-switch" href="${u('en/')}">English</a>`;

  const enMenu = `
    <nav aria-label="Primary" class="site-nav">
      <button aria-controls="nav-list" aria-expanded="false" aria-label="Open menu" class="menu-toggle">Menu</button>
      <button aria-label="Close menu" class="menu-close" type="button">×</button>
      <ul id="nav-list">
        <li><a href="${u('en/about-oscs/')}">About OSCS</a></li>
        <li><a href="${u('en/conferences-and-training/')}">Conferences and training</a></li>
        <li><a href="${u('en/news/')}">News</a></li>
        <li><a href="${u('en/contact/')}">Contact</a></li>
      </ul>
    </nav>
    <a class="header-search" href="${u('en/search/')}" aria-label="Search" title="Search">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l5 5"></path></svg>
    </a>
    <a class="lang-switch" href="${u('')}">Srpski</a>`;

  header.innerHTML = `
    <a class="brand" href="${u(isEnglish ? 'en/' : '')}">
      <img alt="Open Science Community Serbia" class="brand-logo" src="${u('images/Logo-OSCSerbia.png')}">
    </a>
    ${isEnglish ? enMenu : srMenu}`;

  const footer = document.getElementById('site-footer-inner');
  if (footer) {
    const labels = isEnglish ? {
      about:'About OSCS', join:'Join', contact:'Contact', team:'OSCS Team'
    } : {
      about:'O OSCS', join:'Pristupnica', contact:'Kontakt', team:'Tim OSCS'
    };
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-block">
          <div class="footer-nav">
            <a href="${u(isEnglish ? 'en/about-oscs/' : 'vise-o-oscs/')}">${labels.about}</a>
            <a href="${u(isEnglish ? 'clanstvo/uclanite-se/' : 'clanstvo/uclanite-se/')}">${labels.join}</a>
            <a href="${u(isEnglish ? 'en/contact/' : 'kontakt/')}">${labels.contact}</a>
          </div>
          <div>${labels.team}</div>
          <div class="footer-meta">e-mail: <a href="mailto:dissemination@open.ac.rs">dissemination@open.ac.rs</a></div>
          <div class="footer-meta">Zenodo: <a href="https://zenodo.org/communities/oscs">https://zenodo.org/communities/oscs</a></div>
        </div>
      </div>`;
  }
})();
