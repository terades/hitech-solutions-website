class HiTechNavbar extends HTMLElement {
  connectedCallback() {
    const isHome = this.getAttribute('variant') === 'home';
    const ctaHref = isHome ? '#kontakt' : 'index.html#kontakt';
    const logoHref = isHome ? '#top' : 'index.html';

    this.innerHTML = `
      <style>
        hitech-navbar { display: block; }
        .hn-header { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid #e4e8ec; }
        .hn-wrap { width: min(1200px, 100% - 80px); margin-inline: auto; height: 80px; display: flex; align-items: center; justify-content: space-between; gap: 40px; }
        .hn-logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; text-decoration: none; }
        .hn-logo-symbol { height: 44px; width: auto; object-fit: contain; mix-blend-mode: multiply; }
        .hn-logo-text { height: 28px; width: auto; object-fit: contain; mix-blend-mode: multiply; }
        .hn-nav { display: flex; align-items: center; gap: 28px; }
        .hn-link { font-size: 13px; font-weight: 600; color: #6f7780; letter-spacing: .01em; transition: color .2s; text-decoration: none; }
        .hn-link:hover { color: #2b323a; text-decoration: none; }
        .hn-link.active { color: #3ebaec; font-weight: 700; }
        .hn-cta { font-size: 13px; font-weight: 700; color: #2b323a; padding: 10px 22px; border: 1.5px solid #3ebaec; border-radius: 999px; transition: background .25s, color .25s; white-space: nowrap; text-decoration: none; }
        .hn-cta:hover { background: #3ebaec; color: #fff; text-decoration: none; }
        .hn-toggle { display: none; background: transparent; border: 0; cursor: pointer; padding: 8px; flex-direction: column; gap: 5px; flex-shrink: 0; }
        .hn-toggle span { display: block; height: 1.5px; background: #2b323a; }
        .hn-toggle span:nth-child(1), .hn-toggle span:nth-child(2) { width: 20px; }
        .hn-toggle span:nth-child(3) { width: 14px; }
        @media (max-width: 980px) {
          .hn-nav { display: none; }
          .hn-toggle { display: flex; }
          .hn-nav.open { display: flex; flex-direction: column; position: absolute; top: 80px; left: 0; right: 0; background: #fff; border-bottom: 1px solid #e4e8ec; padding: 20px 32px 28px; gap: 0; z-index: 99; box-shadow: 0 8px 24px rgba(43,50,58,.08); }
          .hn-nav.open .hn-link { padding: 12px 0; border-bottom: 1px solid #f0f2f5; font-size: 15px; color: #2b323a; }
          .hn-nav.open .hn-cta { border: none; border-bottom: none; margin-top: 12px; text-align: center; font-size: 15px; }
        }
        @media (max-width: 640px) { .hn-wrap { width: calc(100% - 32px); } }
      </style>
      <header class="hn-header">
        <div class="hn-wrap">
          <a href="${logoHref}" class="hn-logo" aria-label="HI-Tech Solutions">
            <img src="assets/logo.webp" alt="HI-Tech Logo" width="754" height="754" class="hn-logo-symbol">
            <img src="assets/logo-schrift.webp" alt="HI-Tech Solutions" width="1894" height="341" class="hn-logo-text">
          </a>
          <button class="hn-toggle" type="button" aria-expanded="false" aria-label="Navigation öffnen"><span></span><span></span><span></span></button>
          <nav class="hn-nav">
            <a href="${logoHref}" class="hn-link">Home</a>
            <a href="OEE.html" class="hn-link">OEE-Modul</a>
            <a href="ueber-uns.html" class="hn-link">Über uns</a>
            <a href="${ctaHref}" class="hn-cta">Quick Check ↗</a>
          </nav>
        </div>
      </header>
    `;

    // Highlight active page
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    this.querySelectorAll('a.hn-link').forEach(a => {
      const href = (a.getAttribute('href') || '').split('#')[0].split('/').pop();
      if (href && href.endsWith('.html') && href === currentPage) {
        a.classList.add('active');
      }
    });

    // Mobile toggle
    const toggle = this.querySelector('.hn-toggle');
    const nav = this.querySelector('.hn-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }));
    }
  }
}

if (!customElements.get('hitech-navbar')) {
  customElements.define('hitech-navbar', HiTechNavbar);
}
