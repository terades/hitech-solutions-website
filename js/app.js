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

// Interactive Code Terminal Tab switching
const terminalTabs = document.querySelectorAll(".terminal-tab");
const terminalCodes = document.querySelectorAll(".terminal-code");

if (terminalTabs.length > 0 && terminalCodes.length > 0) {
  terminalTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      terminalTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      terminalCodes.forEach((code) => {
        code.classList.remove("active");
        code.setAttribute("hidden", "true");
      });
      
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      
      const targetId = tab.getAttribute("aria-controls");
      const targetCode = document.getElementById(targetId);
      if (targetCode) {
        targetCode.classList.add("active");
        targetCode.removeAttribute("hidden");
      }
    });
  });
}

// Quick-Check Configurator Logic
const configStep1 = document.getElementById("config-step-1");
const configStep2 = document.getElementById("config-step-2");
const configStep3 = document.getElementById("config-step-3");

const stepDot1 = document.getElementById("step-dot-1");
const stepDot2 = document.getElementById("step-dot-2");
const stepDot3 = document.getElementById("step-dot-3");

if (configStep1 && configStep2 && configStep3) {
  // Helper to get active step
  const getSelectedValue = (name) => {
    const checkedInput = document.querySelector(`input[name="${name}"]:checked`);
    return checkedInput ? checkedInput.value : null;
  };

  // Helper to toggle selected class on parent label card
  const updateSelectedClass = (name) => {
    document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
      const card = input.closest(".config-option-card");
      if (card) {
        if (input.checked) {
          card.classList.add("selected");
        } else {
          card.classList.remove("selected");
        }
      }
    });
  };

  // Radio selection change listener for step validation
  document.querySelectorAll('input[name="bottleneck"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      updateSelectedClass("bottleneck");
      configStep1.querySelector(".next-step-btn").removeAttribute("disabled");
    });
  });

  document.querySelectorAll('input[name="infra"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      updateSelectedClass("infra");
      configStep2.querySelector(".next-step-btn").removeAttribute("disabled");
    });
  });

  // Step 1 -> Step 2
  configStep1.querySelector(".next-step-btn").addEventListener("click", () => {
    configStep1.classList.remove("active");
    configStep1.setAttribute("hidden", "true");
    configStep2.classList.add("active");
    configStep2.removeAttribute("hidden");

    stepDot1.classList.remove("active");
    stepDot1.classList.add("completed");
    stepDot2.classList.add("active");
  });

  // Step 2 -> Step 1 (Back)
  configStep2.querySelector(".prev-step-btn").addEventListener("click", () => {
    configStep2.classList.remove("active");
    configStep2.setAttribute("hidden", "true");
    configStep1.classList.add("active");
    configStep1.removeAttribute("hidden");

    stepDot2.classList.remove("active");
    stepDot1.classList.remove("completed");
    stepDot1.classList.add("active");
  });

  // Step 2 -> Step 3 (Calculation)
  configStep2.querySelector(".next-step-btn").addEventListener("click", () => {
    const bottleneck = getSelectedValue("bottleneck");
    const infra = getSelectedValue("infra");

    // Dynamic Solution Mapping
    let solution = "Fokussierte Shopfloor-Datenbrücke & MVP-Entwicklung";
    if (bottleneck.includes("Transparenz")) {
      solution = "OEE-Live-Dashboard & Shopfloor-Terminal";
    } else if (bottleneck.includes("Schnittstellen")) {
      solution = "Unified Namespace (UNS) & ERP-API-Brücke";
    } else if (bottleneck.includes("Rückmeldung")) {
      solution = "Digitaler Schichtbericht & Rückmeldeportal";
    } else if (bottleneck.includes("Großprojekte")) {
      solution = "Gezieltes MVP-Softwarewerkzeug für Engpass";
    }

    // Populate summary fields
    document.getElementById("summary-bottleneck").textContent = bottleneck;
    document.getElementById("summary-infra").textContent = infra;
    document.getElementById("summary-solution").textContent = solution;

    // Generate Mailto Link
    const subject = encodeURIComponent("Quick-Check Anfrage: HI Tech Solutions");
    const body = encodeURIComponent(
      `Hallo HI Tech Solutions,\n\n` +
      `ich habe den Quick-Check Konfigurator auf Ihrer Website ausgefüllt und interessiere mich für ein kostenfreies Erstgespräch.\n\n` +
      `Hier sind unsere Angaben:\n` +
      `- Unser größter Engpass: ${bottleneck}\n` +
      `- Unsere vorhandene IT-Landschaft: ${infra}\n` +
      `- Empfohlener Lösungsansatz: ${solution}\n\n` +
      `Bitte kontaktieren Sie mich bezüglich einer Terminvereinbarung.\n\n` +
      `Mit freundlichen Grüßen`
    );
    
    const mailBtn = document.getElementById("config-mail-btn");
    mailBtn.setAttribute("href", `mailto:info@hitech-solutions.eu?subject=${subject}&body=${body}`);

    // Show Step 3
    configStep2.classList.remove("active");
    configStep2.setAttribute("hidden", "true");
    configStep3.classList.add("active");
    configStep3.removeAttribute("hidden");

    stepDot2.classList.remove("active");
    stepDot2.classList.add("completed");
    stepDot3.classList.add("active");

    // Intercept mail click to prevent default if not set
    mailBtn.addEventListener("click", (e) => {
      if (mailBtn.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });

    // Copy to clipboard fallback
    const copyBtn = document.getElementById("copy-email-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText("info@hitech-solutions.eu").then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = "Kopiert!";
          setTimeout(() => {
            copyBtn.textContent = originalText;
          }, 2000);
        }).catch(err => {
          console.error("Copy failed", err);
        });
      });
    }
  });

  // Step 3 -> Step 2 (Back)
  configStep3.querySelector(".prev-step-btn").addEventListener("click", () => {
    configStep3.classList.remove("active");
    configStep3.setAttribute("hidden", "true");
    configStep2.classList.add("active");
    configStep2.removeAttribute("hidden");

    stepDot3.classList.remove("active");
    stepDot2.classList.remove("completed");
    stepDot2.classList.add("active");
  });
}
