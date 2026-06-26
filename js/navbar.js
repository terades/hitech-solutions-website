class HiTechNavbar extends HTMLElement {
  connectedCallback() {
    const isHome = this.getAttribute('variant') === 'home';
    const ctaHref = isHome ? '#kontakt' : 'index.html#kontakt';
    const logoHref = isHome ? '#' : 'index.html';

    // ── Inject Page Transition Overlay ──
    if (!document.getElementById('hn-page-loader')) {
      const loaderDiv = document.createElement('div');
      loaderDiv.id = 'hn-page-loader';
      loaderDiv.innerHTML = `
        <div id="hn-loader-progress" style="position: absolute; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, #3ebaec, #6366f1); width: 0%; transition: width 0.3s ease;"></div>
      `;
      loaderDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #f6f8fa;
        z-index: 99999;
        transition: opacity 0.3s ease;
        pointer-events: none;
        opacity: 1;
        display: block;
      `;
      document.body.prepend(loaderDiv);
    }

    const loader = document.getElementById('hn-page-loader');
    const progress = document.getElementById('hn-loader-progress');
    if (loader && progress) {
      progress.style.width = '70%';
      const hideLoader = () => {
        progress.style.transition = 'width 0.25s ease';
        progress.style.width = '100%';
        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
            progress.style.transition = 'none';
            progress.style.width = '0%';
          }, 300);
        }, 150);
      };
      if (document.readyState === 'complete') {
        hideLoader();
      } else {
        window.addEventListener('load', hideLoader);
        setTimeout(hideLoader, 800);
      }
    }

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

        /* ── Dropdown Styles ── */
        .hn-mobile-only { display: none; }
        .hn-desktop-only { display: block; }

        .hn-dropdown {
          position: relative;
        }
        .hn-dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
        .hn-dropdown-toggle svg {
          transition: transform .2s ease;
        }
        .hn-dropdown:hover .hn-dropdown-toggle svg {
          transform: rotate(180deg);
        }
        .hn-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid #e4e8ec;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(43, 50, 58, 0.08);
          padding: 16px;
          min-width: 290px;
          display: none;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 1000;
        }
        .hn-dropdown-menu::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 0;
          right: 0;
          height: 20px;
          background: transparent;
        }
        .hn-dropdown:hover .hn-dropdown-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
          opacity: 1;
          transform: translateX(-50%) translateY(6px);
        }
        .hn-dropdown-item {
          display: flex;
          flex-direction: column;
          padding: 8px 12px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .hn-dropdown-item:hover {
          background: #f3f5f8;
        }
        .hn-dropdown-title {
          font-size: 12.5px;
          font-weight: 700;
          color: #2b323a;
          transition: color .2s;
        }
        .hn-dropdown-item:hover .hn-dropdown-title,
        .hn-dropdown-item.active .hn-dropdown-title {
          color: #3ebaec;
        }
        .hn-dropdown-desc {
          font-size: 10.5px;
          color: #6f7780;
          margin-top: 2px;
          line-height: 1.35;
          font-weight: 500;
        }

        @media (max-width: 980px) {
          .hn-nav { display: none; }
          .hn-toggle { display: flex; }
          .hn-nav.open { display: flex; flex-direction: column; position: absolute; top: 80px; left: 0; right: 0; background: #fff; border-bottom: 1px solid #e4e8ec; padding: 20px 32px 28px; gap: 0; z-index: 99; box-shadow: 0 8px 24px rgba(43,50,58,.08); }
          .hn-nav.open .hn-link { padding: 12px 0; border-bottom: 1px solid #f0f2f5; font-size: 15px; color: #2b323a; width: 100%; }
          .hn-nav.open .hn-cta { border: none; border-bottom: none; margin-top: 12px; text-align: center; font-size: 15px; }

          .hn-mobile-only { display: block !important; }
          .hn-desktop-only { display: none !important; }

          .hn-mobile-trigger {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 12px 0;
            font-size: 15px;
            font-weight: 600;
            color: #6f7780;
            border-bottom: 1px solid #f0f2f5;
            background: transparent;
            border: none;
            text-align: left;
            cursor: pointer;
            font-family: inherit;
          }
          .hn-mobile-trigger.active {
            color: #3ebaec;
            font-weight: 700;
          }
          .hn-mobile-trigger svg {
            transition: transform .2s ease;
          }
          .hn-mobile-trigger.open svg {
            transform: rotate(180deg);
          }
          .hn-mobile-submenu {
            display: none;
            flex-direction: column;
            padding-left: 16px;
            border-left: 2px solid #e4e8ec;
            margin-top: 4px;
            margin-bottom: 8px;
            gap: 4px;
          }
          .hn-mobile-submenu.open {
            display: flex;
          }
          .hn-mobile-submenu .hn-link {
            border-bottom: none !important;
            padding: 8px 0 !important;
            font-size: 14px !important;
            color: #6f7780 !important;
          }
          .hn-mobile-submenu .hn-link.active {
            color: #3ebaec !important;
            font-weight: 700 !important;
          }
        }
        @media (max-width: 640px) { .hn-wrap { width: calc(100% - 32px); } }
      </style>
      <header class="hn-header">
        <div class="hn-wrap">
          <a href="${logoHref}" class="hn-logo" aria-label="HI-Tech Solutions">
            <img src="assets/logo.svg" alt="HI-Tech Logo" width="754" height="754" class="hn-logo-symbol">
            <img src="assets/logo-schrift.webp" alt="HI-Tech Solutions" width="1894" height="341" class="hn-logo-text">
          </a>
          <button class="hn-toggle" type="button" aria-expanded="false" aria-label="Navigation öffnen"><span></span><span></span><span></span></button>
          <nav class="hn-nav">
            <a href="${logoHref}" class="hn-link">Home</a>
            
            <!-- Desktop Dropdown -->
            <div class="hn-dropdown hn-desktop-only">
              <a class="hn-link hn-dropdown-toggle" href="javascript:void(0)">
                Lösungen
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>
              </a>
              <div class="hn-dropdown-menu">
                <a href="OEE.html" class="hn-dropdown-item">
                  <span class="hn-dropdown-title">OEE-Monitoring</span>
                  <span class="hn-dropdown-desc">Live-Produktivität & Maschinenstillstände im Blick.</span>
                </a>
                <a href="bde.html" class="hn-dropdown-item">
                  <span class="hn-dropdown-title">Betriebsdatenerfassung (BDE)</span>
                  <span class="hn-dropdown-desc">Digitale Auftragsbuchung & Werkercockpit.</span>
                </a>
                <a href="orchestrator.html" class="hn-dropdown-item">
                  <span class="hn-dropdown-title">Schnittstellen-Orchestrator</span>
                  <span class="hn-dropdown-desc">Datenflüsse & ERP-Integration in Echtzeit.</span>
                </a>
              </div>
            </div>

            <!-- Mobile Accordion -->
            <div class="hn-mobile-only" style="width: 100%;">
              <button class="hn-mobile-trigger" type="button" aria-expanded="false">
                Lösungen
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>
              </button>
              <div class="hn-mobile-submenu">
                <a href="OEE.html" class="hn-link">OEE-Monitoring</a>
                <a href="bde.html" class="hn-link">Betriebsdatenerfassung</a>
                <a href="orchestrator.html" class="hn-link">Orchestrator</a>
              </div>
            </div>

            <a href="ueber-uns.html" class="hn-link">Über uns</a>
            <a href="${ctaHref}" class="hn-cta">Kontakt ↗</a>
          </nav>
        </div>
      </header>
    `;

    // Highlight active page
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    this.querySelectorAll('a.hn-link, a.hn-dropdown-item').forEach(a => {
      const href = (a.getAttribute('href') || '').split('#')[0].split('/').pop();
      if (href && href.endsWith('.html') && href === currentPage) {
        a.classList.add('active');
      }
    });

    // Highlight parent "Lösungen" if child page is active
    const childPages = ['OEE.html', 'bde.html', 'orchestrator.html'];
    if (childPages.includes(currentPage)) {
      const parentToggle = this.querySelector('.hn-desktop-only .hn-dropdown-toggle');
      if (parentToggle) parentToggle.classList.add('active');
      const mobileToggle = this.querySelector('.hn-mobile-trigger');
      if (mobileToggle) mobileToggle.classList.add('active');
    }

    // Mobile main menu toggle
    const toggle = this.querySelector('.hn-toggle');
    const nav = this.querySelector('.hn-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      nav.querySelectorAll('a:not(.hn-dropdown-toggle)').forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }));
    }

    // Mobile dropdown accordion toggle
    const mobileTrigger = this.querySelector('.hn-mobile-trigger');
    const mobileSubmenu = this.querySelector('.hn-mobile-submenu');
    if (mobileTrigger && mobileSubmenu) {
      mobileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileSubmenu.classList.toggle('open');
        mobileTrigger.classList.toggle('open');
        mobileTrigger.setAttribute('aria-expanded', String(isOpen));
      });
    }

    // ── Global internal link click interceptor for page transitions ──
    const showLoaderAndNavigate = (targetUrl) => {
      const loader = document.getElementById('hn-page-loader');
      const progress = document.getElementById('hn-loader-progress');
      if (loader && progress) {
        loader.style.display = 'block';
        void loader.offsetWidth;
        loader.style.opacity = '1';
        progress.style.transition = 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1)';
        progress.style.width = '100%';
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
      } else {
        window.location.href = targetUrl;
      }
    };

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (
          href && 
          !href.startsWith('#') && 
          !href.startsWith('javascript:') && 
          !link.target && 
          !e.metaKey && 
          !e.ctrlKey
        ) {
          try {
            const url = new URL(link.href);
            if (url.origin === window.location.origin) {
              e.preventDefault();
              showLoaderAndNavigate(link.href);
            }
          } catch (err) {
            // Ignore invalid URLs
          }
        }
      }
    });

    // Handle back button cache state
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        const loader = document.getElementById('hn-page-loader');
        if (loader) {
          loader.style.display = 'none';
          loader.style.opacity = '0';
        }
      }
    });

    // ── Hero Background and Visual Parallax Scroll Effect ──
    const initHeroParallax = () => {
      const glow1 = document.querySelector('.hero-glow-1');
      const glow2 = document.querySelector('.hero-glow-2');
      const grid = document.querySelector('.hero-grid-pattern');
      const visual = document.querySelector('.hero-visual img');
      
      if (!glow1 && !glow2 && !grid && !visual) return;
      
      let ticking = false;
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            
            // Limit calculations to when hero section is visible in viewport
            if (scrolled < window.innerHeight + 100) {
              if (glow1) glow1.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
              if (glow2) glow2.style.transform = `translate3d(0, ${scrolled * -0.1}px, 0)`;
              if (grid) grid.style.transform = `translate3d(0, ${scrolled * 0.08}px, 0)`;
              if (visual) visual.style.transform = `translate3d(0, ${scrolled * 0.04}px, 0) scale(${1 + scrolled * 0.00008})`;
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    };

    initHeroParallax();
  }
}

if (!customElements.get('hitech-navbar')) {
  customElements.define('hitech-navbar', HiTechNavbar);
}
