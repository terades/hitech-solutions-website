const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { siteNav.classList.remove('is-open'); navToggle?.setAttribute('aria-expanded', 'false'); }));

const progress = document.querySelector('#scrollProgress');
window.addEventListener('scroll', () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  if (progress && height > 0) progress.style.width = `${(window.scrollY / height) * 100}%`;
}, { passive: true });

const revealItems = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); currentObserver.unobserve(entry.target); } });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => observer.observe(item));
}

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
