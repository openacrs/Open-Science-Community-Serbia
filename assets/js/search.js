(() => {
  const script = Array.from(document.scripts).find(s => /assets\/js\/search\.js(?:\?|$)/.test(s.src));
  if (!script) return;

  const scriptUrl = new URL(script.src, location.href);
  const root = scriptUrl.href.replace(/assets\/js\/search\.js(?:\?.*)?$/, '');
  const u = (path = '') => new URL(path, root).href;

  const qEl = document.getElementById('q');
  const go = document.getElementById('go');
  const results = document.getElementById('results');
  const count = document.getElementById('result-count');
  const lang = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'sr';

  if (!qEl || !go || !results) return;
  let index = [];

  const strings = lang === 'en' ? {
    one: 'result',
    many: 'results',
    none: 'No results',
    empty: 'No results for the entered term.',
    unavailable: 'Search is currently unavailable.'
  } : {
    one: 'rezultat',
    many: 'rezultata',
    none: 'Nema rezultata',
    empty: 'Nema rezultata za uneti pojam.',
    unavailable: 'Pretraživanje trenutno nije dostupno.'
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

  const norm = s => String(s || '')
    .toLocaleLowerCase(lang === 'en' ? 'en' : 'sr')
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '');

  const snippet = (text, terms) => {
    const plain = String(text || '').replace(/\s+/g, ' ').trim();
    if (!plain) return '';
    const n = norm(plain);
    let pos = Infinity;
    terms.forEach(t => {
      const p = n.indexOf(t);
      if (p >= 0 && p < pos) pos = p;
    });
    if (!Number.isFinite(pos)) pos = 0;
    const start = Math.max(0, pos - 120);
    const end = Math.min(plain.length, start + 340);
    return (start ? '…' : '') + plain.slice(start, end).trim() + (end < plain.length ? '…' : '');
  };

  const run = () => {
    const raw = qEl.value.trim();
    const terms = norm(raw).split(/\s+/).filter(Boolean);

    const params = new URLSearchParams(location.search);
    if (raw) params.set('q', raw); else params.delete('q');
    history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params : ''));

    if (!terms.length) {
      results.innerHTML = '';
      if (count) count.textContent = '';
      return;
    }

    const matches = index
      .filter(item => item.lang === lang)
      .map(item => {
        const title = norm(item.title);
        const body = norm(item.text);
        const all = `${title} ${body}`;
        if (!terms.every(t => all.includes(t))) return null;

        let score = 0;
        terms.forEach(t => {
          if (title === t) score += 100;
          else if (title.includes(t)) score += 30;
          score += Math.min(body.split(t).length - 1, 10);
        });
        return {item, score};
      })
      .filter(Boolean)
      .sort((a,b) => b.score - a.score || a.item.title.localeCompare(b.item.title, lang))
      .slice(0, 100);

    if (count) {
      count.textContent = matches.length
        ? `${matches.length} ${matches.length === 1 ? strings.one : strings.many}`
        : strings.none;
    }

    results.innerHTML = matches.length
      ? matches.map(({item}) => `
          <article class="search-result">
            <h2><a href="${u(item.route)}">${esc(item.title)}</a></h2>
            <p>${esc(snippet(item.text, terms))}</p>
          </article>`).join('')
      : `<p>${strings.empty}</p>`;
  };

  fetch(u('assets/search-index.json'))
    .then(r => {
      if (!r.ok) throw new Error();
      return r.json();
    })
    .then(data => {
      index = Array.isArray(data) ? data : [];
      const initial = new URLSearchParams(location.search).get('q') || '';
      if (initial) {
        qEl.value = initial;
        run();
      }
    })
    .catch(() => {
      results.innerHTML = `<p>${strings.unavailable}</p>`;
    });

  go.addEventListener('click', run);
  qEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') run();
  });
})();