// experience.js
document.addEventListener('DOMContentLoaded', function() {
  // ===== SET ACTIVE LINK DI NAVBAR =====
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    if (currentPage === 'experience.html' && href.includes('experience')) {
      link.classList.add('active');
    } else if (currentPage === '' || currentPage === 'index.html') {
      if (href.includes('index.html#home') || href === 'index.html') {
        link.classList.add('active');
      }
    }
  });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  document.querySelectorAll('.animate-left, .animate-right, .animate-up').forEach(el => {
    observer.observe(el);
  });

  // ===== PARALLAX EFFECT UNTUK HERO =====
  const heroSection = document.querySelector('.exp-hero');
  const heroBackground = document.querySelector('.exp-hero-background');
  
  if (heroSection && heroBackground) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const heroTop = heroSection.offsetTop;
      const heroHeight = heroSection.offsetHeight;
      
      if (scrollPosition <= heroTop + heroHeight) {
        const yOffset = scrollPosition * 0.5;
        heroBackground.style.transform = `translateY(${yOffset}px) scale(1.1)`;
      }
    }, { passive: true });
  }

  // ===== COUNTER ANIMATION UNTUK STATS =====
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const text = stat.textContent;
          if (text.includes('+')) {
            const value = parseInt(text);
            animateCounter(stat, 0, value, 2000);
          } else if (text === '∞') {
            // Infinity symbol, no animation needed
          } else {
            const value = parseInt(text);
            animateCounter(stat, 0, value, 2000);
          }
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.philosophy-stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value + (end >= 5 ? '+' : '');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // ===== SMOOTH SCROLL UNTUK ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || this.classList.contains('dropdown-toggle')) {
        return;
      }
      
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== INITIAL CHECK FOR VISIBLE ELEMENTS =====
  setTimeout(() => {
    document.querySelectorAll('.animate-left, .animate-right, .animate-up').forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.8) {
        el.classList.add('revealed');
      }
    });
  }, 200);
});