class DevelopmentPage {
  constructor() {
    this.init();
  }

  init() {
    this.initLoading();
    this.initNav();
    this.initAnimations();
    this.initCountdown();
    this.initNewsletter();
    this.initScrollEffects();
    this.initToast();
    this.initBackToTop();
    this.initInteractiveElements();

    this.startAnimations();

    setTimeout(() => {
      this.hideLoading();
      this.showToast();
    }, 2000);
  }

  initLoading() {
    this.loadingOverlay = document.getElementById("loadingOverlay");
  }

  hideLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add("hidden");
      setTimeout(() => {
        this.loadingOverlay.style.display = "none";
      }, 500);
    }
  }

  initNav() {
    const nav = document.querySelector(".dev-nav");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }

  initAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          if (entry.target.classList.contains("timeline-item")) {
            const index = Array.from(entry.target.parentNode.children).indexOf(
              entry.target,
            );
            entry.target.style.transitionDelay = `${index * 0.2}s`;
          }

          if (entry.target.classList.contains("feature-card")) {
            const index = Array.from(entry.target.parentNode.children).indexOf(
              entry.target,
            );
            entry.target.style.transitionDelay = `${index * 0.1}s`;
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll(".timeline-item, .feature-card").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      observer.observe(el);
    });
  }

  initCountdown() {
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 11);

    const updateCountdown = () => {
      const now = new Date();
      const diff = launchDate - now;

      if (diff <= 0) {
        clearInterval(this.countdownInterval);
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysElement.textContent = days.toString().padStart(2, "0");
      hoursElement.textContent = hours.toString().padStart(2, "0");
      minutesElement.textContent = minutes.toString().padStart(2, "0");
      secondsElement.textContent = seconds.toString().padStart(2, "0");

      [daysElement, hoursElement, minutesElement, secondsElement].forEach(
        (el) => {
          el.style.transform = "scale(1.1)";
          setTimeout(() => {
            el.style.transform = "scale(1)";
          }, 300);
        },
      );
    };

    updateCountdown();
    this.countdownInterval = setInterval(updateCountdown, 1000);
  }

  initNewsletter() {
    const form = document.getElementById("newsletter-form");
    const messageElement = document.getElementById("form-message");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = form.querySelector(".form-input");
      const email = emailInput.value.trim();

      if (!this.validateEmail(email)) {
        this.showMessage("Please enter a valid email address", "error");
        return;
      }

      this.showMessage("Subscribing...", "");
      emailInput.disabled = true;

      setTimeout(() => {
        this.showMessage(
          "Successfully subscribed! We'll notify you when we launch.",
          "success",
        );
        emailInput.value = "";
        emailInput.disabled = false;

        const subscribers = JSON.parse(
          localStorage.getItem("malbourne_subscribers") || "[]",
        );
        subscribers.push({ email, date: new Date().toISOString() });
        localStorage.setItem(
          "malbourne_subscribers",
          JSON.stringify(subscribers),
        );
      }, 1500);
    });
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showMessage(text, type) {
    const messageElement = document.getElementById("form-message");
    messageElement.textContent = text;
    messageElement.className = "form-message";

    if (type) {
      messageElement.classList.add(type);
    }

    setTimeout(() => {
      messageElement.className = "form-message";
      messageElement.textContent = "";
    }, 5000);
  }

  initScrollEffects() {
    let lastScroll = 0;
    const nav = document.querySelector(".dev-nav");

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = "translateY(-100%)";
      } else {
        nav.style.transform = "translateY(0)";
      }

      lastScroll = currentScroll;
    });

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(
        ".floating-beans .bean",
      );

      parallaxElements.forEach((bean, index) => {
        const speed = 0.2 + index * 0.05;
        const yPos = -(scrolled * speed);
        bean.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  initToast() {
    this.toast = document.getElementById("notificationToast");
    this.toastClose = this.toast.querySelector(".toast-close");

    this.toastClose.addEventListener("click", () => {
      this.hideToast();
    });
  }

  showToast() {
    setTimeout(() => {
      this.toast.classList.add("show");

      setTimeout(() => {
        this.hideToast();
      }, 8000);
    }, 1000);
  }

  hideToast() {
    this.toast.classList.remove("show");
  }

  initBackToTop() {
    this.backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        this.backToTop.classList.add("visible");
      } else {
        this.backToTop.classList.remove("visible");
      }
    });

    this.backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  initInteractiveElements() {
    const interactiveElements = document.querySelectorAll(
      ".interactive-element",
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        const icon = element.querySelector(".element-icon");
        icon.style.transform = "scale(1.1) rotate(5deg)";
      });

      element.addEventListener("mouseleave", () => {
        const icon = element.querySelector(".element-icon");
        icon.style.transform = "scale(1) rotate(0)";
      });

      element.addEventListener("click", () => {
        element.style.transform = "scale(0.95)";
        setTimeout(() => {
          element.style.transform = "";
        }, 200);
      });
    });

    const progressFill = document.querySelector(".progress-fill");
    if (progressFill) {
      let width = 0;
      const targetWidth = parseInt(progressFill.style.width);

      const animateProgress = () => {
        if (width < targetWidth) {
          width += 0.5;
          progressFill.style.width = `${width}%`;
          requestAnimationFrame(animateProgress);
        }
      };

      setTimeout(() => {
        animateProgress();
      }, 500);
    }
  }

  startAnimations() {
    const typingText = document.querySelector(".typing-text");
    if (typingText) {
      const text = typingText.textContent;
      typingText.textContent = "";

      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          typingText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      };

      setTimeout(typeWriter, 1500);
    }

    this.animateCoffeeSteam();
  }

  animateCoffeeSteam() {
    const steams = document.querySelectorAll(".coffee-steam-container .steam");
    steams.forEach((steam, index) => {
      steam.style.animationDelay = `${index * 2}s`;
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  cleanup() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const devPage = new DevelopmentPage();

  window.addEventListener("beforeunload", () => {
    devPage.cleanup();
  });
});

const style = document.createElement("style");
style.textContent = `
    .dev-container {
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='none' stroke='%237f8565' stroke-width='2'/%3E%3Ccircle cx='16' cy='16' r='2' fill='%237f8565'/%3E%3C/svg%3E") 16 16, auto;
    }
    
    .dev-container a, .dev-container button {
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M10,10 L22,22 M10,22 L22,10' stroke='%237f8565' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") 16 16, pointer;
    }
`;
document.head.appendChild(style);

function createParticles() {
  const container = document.querySelector(".dev-hero-background");
  if (!container) return;

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-particle";

    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(127, 133, 101, 0.3);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: floatParticle ${duration}s ease-in-out infinite ${delay}s;
        `;

    container.appendChild(particle);
  }

  const style = document.createElement("style");
  style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-50px) translateX(20px) rotate(90deg);
                opacity: 0.5;
            }
            50% {
                transform: translateY(-100px) translateX(-20px) rotate(180deg);
                opacity: 0.3;
            }
            75% {
                transform: translateY(-50px) translateX(-10px) rotate(270deg);
                opacity: 0.5;
            }
        }
    `;
  document.head.appendChild(style);
}

window.addEventListener("load", () => {
  createParticles();
});
