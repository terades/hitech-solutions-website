const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Mobile nav ──────────────────────────────────────────────────────────────
const navToggle = document.querySelector('#nav-toggle');
const siteNav = document.querySelector('#site-nav');

function closeNav() {
  siteNav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close when a nav link is clicked
siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

// Close when clicking outside the nav/toggle
document.addEventListener('click', (e) => {
  if (siteNav?.classList.contains('open') && !siteNav.contains(e.target) && e.target !== navToggle && !navToggle?.contains(e.target)) {
    closeNav();
  }
});

// ── Scroll progress ──────────────────────────────────────────────────────────
const progress = document.querySelector('#scrollProgress');
window.addEventListener('scroll', () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  if (progress && height > 0) progress.style.width = `${(window.scrollY / height) * 100}%`;
}, { passive: true });

// ── Reveal on scroll ─────────────────────────────────────────────────────────
const revealItems = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); currentObserver.unobserve(entry.target); } });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => observer.observe(item));
}

// ── Scroll-spy for nav links ─────────────────────────────────────────────────
const navLinks = document.querySelectorAll('#site-nav .nav-link[href^="#"]');
if ('IntersectionObserver' in window && navLinks.length) {
  const sectionIds = [...navLinks].map((a) => a.getAttribute('href').slice(1));
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const activeSections = new Set();

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activeSections.add(entry.target.id);
      else activeSections.delete(entry.target.id);
    });
    // Highlight the first visible section in document order
    const activeId = sectionIds.find((id) => activeSections.has(id));
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${activeId}`));
  }, { threshold: 0, rootMargin: '-20% 0px -60% 0px' });

  sections.forEach((sec) => spyObserver.observe(sec));
}

// ── Quick Check wizard ───────────────────────────────────────────────────────
const quickCheck = document.querySelector('#quickCheck');
if (quickCheck) {
  const steps = [...quickCheck.querySelectorAll('.check-step')];
  const dots = [...quickCheck.querySelectorAll('.quickcheck-progress span')];
  const next = quickCheck.querySelector('.check-next');
  const back = quickCheck.querySelector('.check-back');
  const result = quickCheck.querySelector('.check-result');
  let current = 0;

  const selected = (name) => quickCheck.querySelector(`input[name="${name}"]:checked`)?.value;
  const setStep = () => {
    steps.forEach((step, index) => step.classList.toggle('is-active', index === current));
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === current));
    back.hidden = current === 0;
    next.disabled = !selected(steps[current].querySelector('input').name);
    next.innerHTML = current === steps.length - 1 ? 'Empfehlung anzeigen <span>→</span>' : 'Weiter <span>→</span>';
  };
  quickCheck.querySelectorAll('input').forEach((input) => input.addEventListener('change', setStep));
  back.addEventListener('click', () => { current -= 1; setStep(); });
  next.addEventListener('click', () => {
    if (!selected(steps[current].querySelector('input').name)) return;
    if (current < steps.length - 1) { current += 1; setStep(); return; }
    const problem = selected('problem');
    const systems = selected('systems');
    const goal = selected('goal');
    const platform = goal === 'auf weitere Werke ausrollen' || goal === 'eine tragfähige Architektur definieren';
    const mvp = goal === 'einen MVP live bringen' || ['Maschinen- oder Linienstatus', 'OEE und Stillstandsursachen', 'Fertigungsrückmeldung'].includes(problem);
    const recommendation = platform ? 'Smart Factory Platform' : mvp ? 'MES/MOM MVP' : 'Production Quick Check';
    const description = platform ? 'Ihr Ziel braucht Standards für Datenmodell, Schnittstellen und Betrieb. Wir klären zuerst die Bausteine für einen belastbaren Rollout.' : mvp ? 'Ihr Engpass eignet sich für ein klar abgegrenztes Werkzeug, das in 4–8 Wochen mit den relevanten Daten und Nutzern live gehen kann.' : 'Der sinnvollste erste Schritt ist, Engpass, Datenlage und MVP-Scope gemeinsam zu schärfen — bevor Entwicklungskapazität gebunden wird.';
    document.querySelector('#recommendation').textContent = recommendation;
    document.querySelector('#recommendationText').textContent = description;
    document.querySelector('#resultProblem').textContent = problem;
    document.querySelector('#resultSystems').textContent = systems;
    document.querySelector('#resultGoal').textContent = goal;
    const subject = encodeURIComponent(`Anfrage ${recommendation} – HI-Tech Solutions`);
    const body = encodeURIComponent(`Hallo HI-Tech Solutions,\n\nunsere Angaben aus dem Quick Check:\n- Größtes Problem: ${problem}\n- Vorhandene Systeme: ${systems}\n- Ziel: ${goal}\n\nEmpfohlener Einstieg: ${recommendation}\n\nIch möchte ein Erstgespräch vereinbaren.`);
    document.querySelector('#resultMail').href = `mailto:info@hitech-solutions.eu?subject=${subject}&body=${body}`;
    steps.forEach((step) => { step.hidden = true; });
    quickCheck.querySelector('.quickcheck-progress').hidden = true;
    quickCheck.querySelector('.check-actions').hidden = true;
    result.hidden = false;
  });
  setStep();
}

// ── ERP log animation ────────────────────────────────────────────────────────
const erpLog = document.getElementById('erp-logger-flow');
if (erpLog && !reduceMotion) {
  const logPool = [
    { tag: 'SUCCESS', cls: 'tag-success', msg: 'Shopfloor &rarr; ERP: Rückmeldung <strong>Montagelinie 2</strong> (85 Stk gefertigt)' },
    { tag: 'SYNC',    cls: 'tag-info',    msg: 'ERP &rarr; Shopfloor: Fertigungsauftrag <strong>#1047</strong> synchronisiert (Menge: 400 Stk)' },
    { tag: 'WARN',    cls: 'tag-warn',    msg: 'Shopfloor &rarr; ERP: Stillstand <strong>Schweißroboter 01</strong> gemeldet (Ursache: Werkzeugwechsel)' },
    { tag: 'SUCCESS', cls: 'tag-success', msg: 'ERP &rarr; Shopfloor: Materialfreigabe <strong>#C-801</strong> für Auftrag #1045 bestätigt' },
    { tag: 'SYNC',    cls: 'tag-info',    msg: 'Shopfloor &rarr; ERP: OEE-Wert <strong>Linie 03</strong> aktualisiert (91.4%)' },
    { tag: 'SUCCESS', cls: 'tag-success', msg: 'ERP &rarr; Shopfloor: Schichtplan <strong>Spätschicht</strong> übertragen (12 Aufträge)' },
    { tag: 'SYNC',    cls: 'tag-info',    msg: 'Shopfloor &rarr; ERP: Maschinenparameter <strong>CNC-Fräse 03</strong> gesichert' },
    { tag: 'WARN',    cls: 'tag-warn',    msg: 'ERP &rarr; Shopfloor: Priorität <strong>Auftrag #1049</strong> hochgesetzt (Kundentermin)' },
  ];

  let poolIndex = 0;
  const MAX_ROWS = 8;

  function getNow() {
    const d = new Date();
    return `[${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}]`;
  }

  function insertLogRow() {
    const entry = logPool[poolIndex % logPool.length];
    poolIndex++;

    const row = document.createElement('div');
    row.className = 'log-row log-row-new';
    row.innerHTML = `<span class="log-time">${getNow()}</span><span class="log-tag ${entry.cls}">${entry.tag}</span><span class="log-msg">${entry.msg}</span>`;

    erpLog.insertBefore(row, erpLog.firstChild);

    // Trim to max rows
    while (erpLog.children.length > MAX_ROWS) erpLog.removeChild(erpLog.lastChild);

    // Remove animation class after it plays
    setTimeout(() => row.classList.remove('log-row-new'), 600);
  }

  // Only animate when the ERP tab is visible
  let erpTimer = null;
  const tabErp = document.getElementById('tab-erp');

  function startErpLog() { if (!erpTimer) erpTimer = setInterval(insertLogRow, 3000); }
  function stopErpLog()  { clearInterval(erpTimer); erpTimer = null; }

  if ('IntersectionObserver' in window && tabErp) {
    const erpObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? startErpLog() : stopErpLog()));
    }, { threshold: 0.1 });
    erpObserver.observe(tabErp);
  }

  // Also hook into tab switching (the tab buttons toggle display on tab-erp)
  document.querySelectorAll('.app-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      if (target === 'tab-erp') startErpLog();
      else stopErpLog();
    });
  });
}
