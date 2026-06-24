class HiTechNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="nav-container">
          <a href="index.html" class="logo-link" aria-label="HI-Tech Solutions">
            <img src="assets/logo.webp" alt="HI-Tech Logo" width="754" height="754" class="logo-img-symbol">
            <img src="assets/logo-schrift.webp" alt="HI-Tech Solutions" width="1894" height="341" class="logo-img-text">
          </a>
          <button id="nav-toggle" type="button" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav id="site-nav">
            <a href="index.html#ansatz" class="nav-link">Ansatz</a>
            <a href="index.html#use-cases" class="nav-link">Use Cases</a>
            <a href="index.html#angebote" class="nav-link">Angebote</a>
            <a href="index.html#projektweg" class="nav-link">Projektweg</a>
            <a href="ueber-uns.html" class="nav-link">Über uns</a>
            <a href="OEE.html" class="nav-link">OEE-Modul</a>
            <a href="index.html#kontakt" class="nav-cta">Quick Check ↗</a>
          </nav>
        </div>
      </header>
    `;

    // Highlight active page
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    this.querySelectorAll('a.nav-link').forEach(function(a) {
      const href = (a.getAttribute('href') || '').split('#')[0].split('/').pop();
      if (href && href.indexOf('.html') !== -1 && href === currentPage) {
        a.classList.add('active');
      }
    });

    // Mobile toggle
    const toggle = this.querySelector('#nav-toggle');
    const nav = this.querySelector('#site-nav');
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
