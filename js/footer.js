class HiTechFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer style="background:#fff;border-top:1px solid #e4e8ec;padding:36px 0;width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;">
        <div class="wrap" style="display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;">
          <a href="index.html" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
            <img src="assets/logo.svg" alt="HI-Tech Solutions" width="754" height="754" style="height:36px;width:auto;object-fit:contain;">
            <img src="assets/logo-schrift.webp" alt="HI-Tech Solutions" width="1894" height="341" style="height:22px;width:auto;object-fit:contain;">
          </a>
          <nav class="footer-nav" style="display:flex;gap:24px;flex-wrap:wrap;align-items:center;">
            <a href="datenschutz.html" class="footer-link" style="font-size:13px;color:#b8bbbe;text-decoration:none;transition:color .2s;font-family:inherit;">Datenschutz</a>
            <a href="impressum.html" class="footer-link" style="font-size:13px;color:#b8bbbe;text-decoration:none;transition:color .2s;font-family:inherit;">Impressum</a>
            <a href="cookies.html" class="footer-link" style="font-size:13px;color:#b8bbbe;text-decoration:none;transition:color .2s;font-family:inherit;">Cookies</a>
            <a href="https://www.linkedin.com/company/hitech-solutions-eu/" target="_blank" rel="noopener noreferrer" class="footer-link" aria-label="LinkedIn" style="display:inline-flex;align-items:center;justify-content:center;color:#b8bbbe;text-decoration:none;transition:color .2s;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" class="footer-link" aria-label="X" style="display:inline-flex;align-items:center;justify-content:center;color:#b8bbbe;text-decoration:none;transition:color .2s;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </nav>
          <p style="font-size:12px;color:#b8bbbe;margin:0;font-family:inherit;">© 2026 HI-Tech Solutions GmbH</p>
        </div>
      </footer>
    `;

    // Add hover behavior to footer links
    const links = this.querySelectorAll('.footer-link');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.color = '#3ebaec';
      });
      link.addEventListener('mouseleave', () => {
        link.style.color = '#b8bbbe';
      });
    });
  }
}

if (!customElements.get('hitech-footer')) {
  customElements.define('hitech-footer', HiTechFooter);
}
