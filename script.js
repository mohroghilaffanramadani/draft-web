const navbar = document.querySelector(".navbar");
let navbarTicking = false;

window.addEventListener(
  "scroll",
  function () {
    if (!navbarTicking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
        navbarTicking = false;
      });
      navbarTicking = true;
    }
  },
  { passive: true },
);

let isFromClick = false;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href === "#" || this.classList.contains("dropdown-toggle")) {
      return;
    }

    e.preventDefault();

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;

      isFromClick = true;

      const navLinks = document.querySelectorAll(
        ".nav-link:not(.dropdown-toggle)",
      );
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === href) {
          link.classList.add("active");
        }
      });

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        isFromClick = false;
      }, 800);
    }
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");
const navbarHeight = document.querySelector(".navbar").offsetHeight;

let activeNavTicking = false;

window.addEventListener(
  "scroll",
  function () {
    if (isFromClick) return;

    if (!activeNavTicking) {
      requestAnimationFrame(() => {
        let current = "";
        let closestDistance = Infinity;
        const scrollY = window.scrollY;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const distance = Math.abs(scrollY - (sectionTop - navbarHeight - 50));

          if (distance < closestDistance) {
            closestDistance = distance;
            current = section.id;
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });

        activeNavTicking = false;
      });

      activeNavTicking = true;
    }
  },
  { passive: true },
);

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  const menu = dropdown.querySelector(".dropdown-menu");

  toggle.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    }
  });
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown")) {
    const dropdowns = document.querySelectorAll(".dropdown-menu");
    dropdowns.forEach((menu) => {
      if (window.innerWidth <= 768) {
        menu.style.display = "none";
      }
    });
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href === "#" || this.classList.contains("dropdown-toggle")) {
      return;
    }

    e.preventDefault();

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      const navLinks = document.querySelectorAll(
        ".nav-link:not(.dropdown-toggle)",
      );
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === href) {
          link.classList.add("active");
        }
      });
    }
  });
});

const whatsappButtons = document.querySelectorAll('a[href*="whatsapp"]');
whatsappButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    console.log("Redirecting to WhatsApp...");

    setTimeout(() => {}, 300);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const homeLink = document.querySelector('.nav-link[href="#home"]');
  if (homeLink) {
    homeLink.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const typedText = document.querySelector(".typed-text");
  const cursor = document.querySelector(".cursor");

  if (typedText && cursor) {
    const text =
      "A coffee company built on quality, experience, and genuine human connection.";
    typedText.textContent = text;
    typedText.style.width = "0";

    const typeDuration = 3.5;
    const pauseDuration = 2;
    const deleteDuration = 1.5;
    const totalDuration = typeDuration + pauseDuration + deleteDuration;

    typedText.style.animation = `typing ${totalDuration}s steps(${text.length}, end) infinite`;

    cursor.style.animation = `cursorBlink ${totalDuration}s infinite`;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
            @keyframes typing {
                0% { width: 0 }
                ${(typeDuration / totalDuration) * 100 * 0.4}% { width: 0 }
                ${(typeDuration / totalDuration) * 100}% { width: 100% }
                ${((typeDuration + pauseDuration) / totalDuration) * 100}% { width: 100% }
                ${((typeDuration + pauseDuration + deleteDuration) / totalDuration) * 100}% { width: 0 }
                100% { width: 0 }
            }
            
            @keyframes cursorBlink {
                0%, ${(typeDuration / totalDuration) * 100}% { opacity: 1; }
                ${(typeDuration / totalDuration) * 100 + 1}%, ${((typeDuration + pauseDuration) / totalDuration) * 100 - 1}% { opacity: 0; }
                ${((typeDuration + pauseDuration) / totalDuration) * 100}%, 100% { opacity: 1; }
            }
        `;
    document.head.appendChild(styleSheet);
  }

  const heroSection = document.getElementById("home");

  function restartAnimations() {
    const elements = [
      document.querySelector(".hero-title"),
      document.querySelector(".hero-subtitle-wrapper"),
      document.querySelector(".hero-text"),
      document.querySelector(".hero-cta"),
    ];

    elements.forEach((el, index) => {
      if (el) {
        el.style.animation = "none";
        el.style.opacity = "0";
        el.style.transform = "translateX(-100vw)";

        void el.offsetWidth;

        setTimeout(() => {
          el.style.animation = `slideInFromFarLeft 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
          el.style.animationDelay = `${0.3 + index * 0.3}s`;
        }, 50);
      }
    });

    const typedText = document.querySelector(".typed-text");
    const cursor = document.querySelector(".cursor");
    if (typedText && cursor) {
      typedText.style.animation = "none";
      cursor.style.animation = "none";

      setTimeout(() => {
        const text = typedText.textContent;
        const typeDuration = 3.5;
        const pauseDuration = 2;
        const deleteDuration = 1.5;
        const totalDuration = typeDuration + pauseDuration + deleteDuration;

        typedText.style.animation = `typing ${totalDuration}s steps(${text.length}, end) infinite`;
        cursor.style.animation = `cursorBlink ${totalDuration}s infinite`;
      }, 100);
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          restartAnimations();
        }
      });
    },
    { threshold: 0.5 },
  );

  if (heroSection) {
    observer.observe(heroSection);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;

      if (entry.isIntersecting) {
        if (element.classList.contains("hidden-left")) {
          element.classList.remove("hidden-left");
          element.classList.add("animate-left");
        }
        if (element.classList.contains("hidden-right")) {
          element.classList.remove("hidden-right");
          element.classList.add("animate-right");
        }
        if (element.classList.contains("hidden-up")) {
          element.classList.remove("hidden-up");
          element.classList.add("animate-up");
        }
      } else {
        if (element.classList.contains("animate-left")) {
          element.classList.remove("animate-left");
          element.classList.add("hidden-left");
        }
        if (element.classList.contains("animate-right")) {
          element.classList.remove("animate-right");
          element.classList.add("hidden-right");
        }
        if (element.classList.contains("animate-up")) {
          element.classList.remove("animate-up");
          element.classList.add("hidden-up");
        }
      }
    });
  }, observerOptions);

  const positioningLogo = document.querySelector(".positioning-logo");
  const positioningText = document.querySelector(".positioning-text");
  const storyButton = document.querySelector(".btn-story");

  if (positioningLogo) {
    positioningLogo.classList.add("hidden-left");
    observer.observe(positioningLogo);
  }

  if (positioningText) {
    positioningText.classList.add("hidden-right");
    observer.observe(positioningText);
  }

  if (storyButton) {
    storyButton.classList.add("hidden-up");
    observer.observe(storyButton);
  }

  function triggerPositioningAnimations() {
    if (positioningLogo) {
      positioningLogo.classList.remove("animate-left");
      positioningLogo.classList.add("hidden-left");

      void positioningLogo.offsetWidth;

      positioningLogo.classList.remove("hidden-left");
      positioningLogo.classList.add("animate-left");
    }

    if (positioningText) {
      positioningText.classList.remove("animate-right");
      positioningText.classList.add("hidden-right");

      void positioningText.offsetWidth;

      positioningText.classList.remove("hidden-right");
      positioningText.classList.add("animate-right");
    }

    if (storyButton) {
      storyButton.classList.remove("animate-up");
      storyButton.classList.add("hidden-up");

      void storyButton.offsetWidth;

      storyButton.classList.remove("hidden-up");
      storyButton.classList.add("animate-up");
    }
  }

  const storyLinks = document.querySelectorAll('a[href="#story"]');
  storyLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      setTimeout(triggerPositioningAnimations, 300);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;

      if (entry.isIntersecting) {
        if (element.classList.contains("hidden-left")) {
          element.classList.remove("hidden-left");
          element.classList.add("animate-left");
        }
        if (element.classList.contains("hidden-right")) {
          element.classList.remove("hidden-right");
          element.classList.add("animate-right");
        }
        if (element.classList.contains("hidden-up")) {
          element.classList.remove("hidden-up");
          element.classList.add("animate-up");
        }
      } else {
        if (element.classList.contains("animate-left")) {
          element.classList.remove("animate-left");
          element.classList.add("hidden-left");
        }
        if (element.classList.contains("animate-right")) {
          element.classList.remove("animate-right");
          element.classList.add("hidden-right");
        }
        if (element.classList.contains("animate-up")) {
          element.classList.remove("animate-up");
          element.classList.add("hidden-up");
        }
      }
    });
  }, observerOptions);

  const experienceImage = document.querySelector(".experience-image");
  const experienceContent = document.querySelector(".experience-content");
  const experienceButton = document.querySelector(".experience-content .btn");

  if (experienceImage) {
    experienceImage.classList.add("hidden-left");
    observer.observe(experienceImage);
  }

  if (experienceContent) {
    experienceContent.classList.add("hidden-right");
    observer.observe(experienceContent);
  }

  if (experienceButton) {
    experienceButton.classList.add("hidden-up");
    observer.observe(experienceButton);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const beansSection = document.getElementById("beans");

  if (!beansSection) return;

  const animatableElements = beansSection.querySelectorAll(
    ".animate-left, .animate-right, .animate-scale",
  );

  function resetAnimations() {
    animatableElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.animation = "none";

      if (el.classList.contains("animate-left")) {
        el.style.transform = "translateX(-100px)";
      } else if (el.classList.contains("animate-right")) {
        el.style.transform = "translateX(100px)";
      } else if (el.classList.contains("animate-scale")) {
        el.style.transform = "scale(0.8)";
      }
    });
  }

  function triggerAnimations() {
    animatableElements.forEach((el) => {
      el.style.opacity = "";
      el.style.animation = "";
      el.style.transform = "";
    });

    void beansSection.offsetWidth;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetAnimations();
          setTimeout(triggerAnimations, 100);
        } else {
          resetAnimations();
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-50px 0px -50px 0px",
    },
  );

  observer.observe(beansSection);

  const sectionRect = beansSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (sectionRect.top < windowHeight * 0.7) {
    setTimeout(triggerAnimations, 300);
  }
});

function initCommunityAnimations() {
  const communitySection = document.getElementById("community");

  if (!communitySection) return;

  const animatableElements = communitySection.querySelectorAll(
    ".animate-left, .animate-right, .animate-unfold",
  );

  function resetCommunityAnimations() {
    animatableElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.animation = "none";

      if (el.classList.contains("animate-left")) {
        el.style.transform = "translateX(-100px)";
      } else if (el.classList.contains("animate-right")) {
        el.style.transform = "translateX(100px)";
      } else if (el.classList.contains("animate-unfold")) {
        el.style.transform =
          "perspective(1000px) rotateX(90deg) translateY(50px)";
      }
    });
  }

  function triggerCommunityAnimations() {
    animatableElements.forEach((el) => {
      el.style.opacity = "";
      el.style.animation = "";
      el.style.transform = "";
    });

    void communitySection.offsetWidth;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetCommunityAnimations();
          setTimeout(triggerCommunityAnimations, 100);
        } else {
          resetCommunityAnimations();
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-50px 0px -50px 0px",
    },
  );

  observer.observe(communitySection);

  const sectionRect = communitySection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (sectionRect.top < windowHeight * 0.7) {
    setTimeout(triggerCommunityAnimations, 300);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initCommunityAnimations();
});

function triggerLoyaltyAnimationOnce() {
  const loyaltySection = document.getElementById("loyalty");

  if (!loyaltySection) return;

  const sectionTitle = loyaltySection.querySelector(".section-title");
  const sectionText4 = loyaltySection.querySelector(".section-text4");
  const btn4 = loyaltySection.querySelector(".btn");

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          if (sectionTitle) {
            sectionTitle.classList.add("animate-left");
          }
          if (sectionText4) {
            sectionText4.classList.add("animate-left");
            sectionText4.style.animationDelay = "0.3s";
          }
          if (btn4) {
            btn4.classList.add("animate-right");
            btn4.style.animationDelay = "0.6s";
          }

          hasAnimated = true;
        }

        if (!entry.isIntersecting && hasAnimated) {
          if (sectionTitle) {
            sectionTitle.classList.remove("animate-left");
          }
          if (sectionText4) {
            sectionText4.classList.remove("animate-left");
            sectionText4.style.animationDelay = "";
          }
          if (btn4) {
            btn4.classList.remove("animate-right");
            btn4.style.animationDelay = "";
          }
          hasAnimated = false;
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  observer.observe(loyaltySection);
}

document.addEventListener("DOMContentLoaded", triggerLoyaltyAnimationOnce);

document.addEventListener("DOMContentLoaded", triggerLoyaltyAnimationOnce);

window.addEventListener("popstate", function () {
  const loyaltySection = document.getElementById("loyalty");
  if (loyaltySection) {
    loyaltySection.classList.remove("animate-in");
    setTimeout(() => {
      triggerLoyaltyAnimationOnce();
    }, 100);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  const navOverlay = document.createElement("div");
  navOverlay.className = "nav-overlay";
  document.body.appendChild(navOverlay);

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navOverlay.classList.toggle("active");
    body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";

    const icon = this.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  navOverlay.addEventListener("click", function () {
    navMenu.classList.remove("active");
    this.classList.remove("active");
    body.style.overflow = "";

    const icon = navToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });

  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        e.stopPropagation();

        const dropdown = this.closest(".dropdown");

        dropdown.classList.toggle("active");
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 1024) {
      if (
        !e.target.closest(".dropdown") &&
        !e.target.classList.contains("dropdown-toggle")
      ) {
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    }
  });

  const navLinks = document.querySelectorAll(
    ".nav-link:not(.dropdown-toggle), .dropdown-item",
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (!href || !href.startsWith("#") || href === "#") return;

      if (window.innerWidth <= 1024) {
        e.preventDefault();

        navMenu.classList.remove("active");
        navOverlay.classList.remove("active");
        body.style.overflow = "";

        const icon = navToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

        document.querySelectorAll(".dropdown").forEach((dropdown) => {
          dropdown.classList.remove("active");
        });

        setTimeout(() => {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            const navbarHeight = document.querySelector(".navbar").offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });

            setTimeout(() => {
              const navLinks = document.querySelectorAll(
                ".nav-link:not(.dropdown-toggle)",
              );
              navLinks.forEach((navLink) => {
                navLink.classList.remove("active");
                if (navLink.getAttribute("href") === href) {
                  navLink.classList.add("active");
                }
              });
            }, 500);
          }
        }, 300);
      }
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navMenu.classList.remove("active");
      navOverlay.classList.remove("active");
      body.style.overflow = "";

      const icon = navToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");

      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navMenu = document.querySelector(".nav-menu");
  const navOverlay = document.querySelector(".nav-overlay");
  const navToggle = document.querySelector(".nav-toggle");

  if (navMenu) navMenu.classList.remove("active");
  if (navOverlay) navOverlay.classList.remove("active");

  if (navToggle) {
    const icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  }

  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    dropdown.classList.remove("active");
  });

  setTimeout(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(
      ".nav-link:not(.dropdown-toggle)",
    );
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const scrollPosition = window.scrollY;

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop - navbarHeight - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.getAttribute("href") === `#${current}` ||
        (!current && link.getAttribute("href") === "#home")
      ) {
        link.classList.add("active");
      }
    });
  }, 100);
});
