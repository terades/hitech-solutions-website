const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setCounterValue(element, target) {
  element.textContent = target.toLocaleString("de-DE") + (target >= 1000 ? "+" : "");
}

if (navToggle && mainNav) {
  const closeNav = () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Navigation \u00f6ffnen");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Navigation schlie\u00dfen" : "Navigation \u00f6ffnen");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.classList.contains("open")) {
      return;
    }

    if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });
}

if (reduceMotion || typeof IntersectionObserver === "undefined") {
  revealItems.forEach((item) => item.classList.add("visible"));
  counters.forEach((counter) => setCounterValue(counter, Number(counter.dataset.count)));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));

  let countersStarted = false;

  function animateCounter(element, target) {
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(target * eased);

      setCounterValue(element, currentValue);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries, observer) => {
    if (countersStarted) {
      return;
    }

    if (entries.some((entry) => entry.isIntersecting)) {
      countersStarted = true;
      counters.forEach((counter) => animateCounter(counter, Number(counter.dataset.count)));
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scrollProgress");
  if (scrollProgress) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrolled + "%";
  }
});

// Interactive Canvas Tabs switching
const canvasTabs = document.querySelectorAll(".canvas-tab");
const canvasPanels = document.querySelectorAll(".canvas-panel");

if (canvasTabs.length > 0 && canvasPanels.length > 0) {
  canvasTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Deactivate all tabs
      canvasTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      
      // Hide all panels
      canvasPanels.forEach((panel) => {
        panel.classList.remove("active");
        panel.setAttribute("hidden", "true");
      });

      // Activate clicked tab
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      // Show matching panel
      const targetId = tab.getAttribute("aria-controls");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
        targetPanel.removeAttribute("hidden");
      }
    });
  });
}
