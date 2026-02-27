// ===== NAVIGATION & SCROLL EFFECT =====
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  // Handle scroll effect for navbar
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle mobile menu dan ubah ikon
  if (navToggle) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      
      // Ubah ikon menu jadi silang
      const icon = this.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close menu when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
      
      // Kembalikan ikon menu
      if (navToggle) {
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
      
      // Close all dropdowns
      document.querySelectorAll('.dropdown').forEach(drop => {
        drop.classList.remove('active');
      });
    });
  }

  // Handle dropdown toggles on mobile
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = this.closest('.dropdown');
        
        // Close other dropdowns
        dropdownToggles.forEach(otherToggle => {
          const otherDropdown = otherToggle.closest('.dropdown');
          if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
            otherDropdown.classList.remove('active');
          }
        });
        
        dropdown.classList.toggle('active');
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navMenu.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
      
      // Kembalikan ikon menu
      if (navToggle) {
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
      
      // Reset dropdowns
      document.querySelectorAll('.dropdown').forEach(drop => {
        drop.classList.remove('active');
      });
    }
  });

  // Close menu when clicking a link (except dropdown toggles)
  document.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Kembalikan ikon menu
        if (navToggle) {
          const icon = navToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        
        // Close all dropdowns
        document.querySelectorAll('.dropdown').forEach(drop => {
          drop.classList.remove('active');
        });
      }
    });
  });

  // ===== CONSULTATION FORM HANDLER =====
  const consultationForm = document.getElementById('consultationForm');
  
  if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const whatsapp = document.getElementById('whatsapp').value.trim();
      const inquiry = document.getElementById('inquiry').value;
      const description = document.getElementById('description').value.trim();
      
      // Validate form
      if (!name || !whatsapp || !inquiry || !description) {
        alert('Please fill in all fields');
        return;
      }
      
      // Clean phone number
      const cleanWhatsapp = whatsapp.replace(/\D/g, '');
      
      // Create WhatsApp message
      const message = `Hi, I just submitted a consultation form:%0A%0A` +
                     `Name: ${name}%0A` +
                     `WhatsApp: ${cleanWhatsapp}%0A` +
                     `Type: ${inquiry}%0A` +
                     `Description: ${description}%0A%0A` +
                     `Looking forward to discussing further.`;
      
      // Redirect to WhatsApp
      const phoneNumber = '6281230780638'; // Ganti dengan nomor WhatsApp kamu
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      
      window.open(whatsappUrl, '_blank');
      
      // Optional: Reset form
      consultationForm.reset();
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ===== ACTIVE LINK HIGHLIGHTING =====
  function setActiveLink() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'training.html';
    
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // Reset semua active
    navLinks.forEach(link => link.classList.remove('active'));
    dropdownItems.forEach(item => item.classList.remove('active'));
    
    // Highlight current page
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
    
    dropdownItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage) {
        item.classList.add('active');
        
        // Also highlight parent dropdown
        const parentDropdown = item.closest('.dropdown');
        if (parentDropdown) {
          const parentToggle = parentDropdown.querySelector('.dropdown-toggle');
          if (parentToggle) {
            parentToggle.classList.add('active');
          }
        }
      }
    });
  }
  
  setActiveLink();

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe program cards for animation
  document.querySelectorAll('.program-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Observe section titles
  document.querySelectorAll('.section-title').forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'all 0.6s ease';
    observer.observe(title);
  });

  // Observe philosophy text
  const philosophyText = document.querySelector('.philosophy-text');
  if (philosophyText) {
    philosophyText.style.opacity = '0';
    philosophyText.style.transform = 'translateY(20px)';
    philosophyText.style.transition = 'all 0.8s ease';
    observer.observe(philosophyText);
  }

  // ===== PHONE NUMBER FORMATTING =====
  const whatsappInput = document.getElementById('whatsapp');
  if (whatsappInput) {
    whatsappInput.addEventListener('input', function(e) {
      let value = this.value.replace(/\D/g, '');
      
      if (value.length > 0) {
        if (value.length <= 3) {
          value = value;
        } else if (value.length <= 6) {
          value = value.slice(0, 3) + '-' + value.slice(3);
        } else {
          value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
        }
      }
      
      this.value = value;
    });
  }
});

// ===== LAZY LOAD BACKGROUND IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const bgImage = element.getAttribute('data-bg');
        
        if (bgImage) {
          element.style.backgroundImage = `url('${bgImage}')`;
          imageObserver.unobserve(element);
        }
      }
    });
  });

  document.querySelectorAll('[data-bg]').forEach(element => {
    imageObserver.observe(element);
  });
}

// ===== PREVENT DROPDOWN CLOSE ON CLICK INSIDE =====
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

// ===== WHATSAPP FLOAT TEXT BEHAVIOR =====
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
  let timeout;
  
  whatsappFloat.addEventListener('mouseenter', function() {
    clearTimeout(timeout);
    const text = this.querySelector('.whatsapp-text');
    if (text) {
      text.style.opacity = '1';
      text.style.transform = 'translateX(0)';
    }
  });
  
  whatsappFloat.addEventListener('mouseleave', function() {
    timeout = setTimeout(() => {
      const text = this.querySelector('.whatsapp-text');
      if (text) {
        text.style.opacity = '';
        text.style.transform = '';
      }
    }, 300);
  });
}

// ===== TOMBOL KONSULTASI LANGSUNG KE WHATSAPP =====
document.querySelectorAll('.btn-program, .btn-cta-primary, .btn-cta-secondary').forEach(button => {
  button.addEventListener('click', function(e) {
    // Cek apakah ini tombol WhatsApp yang sudah ada linknya
    if (this.tagName === 'A' && this.getAttribute('href')?.includes('wa.me')) {
      return; // Biarkan link default jalan
    }
    
    e.preventDefault();
    
    // Default message untuk booking training
    const message = "Hi, I'm interested in training programs at Malbourne Coffee Co. Can you provide more information?";
    const phoneNumber = '6281230780638'; // Ganti dengan nomor WhatsApp kamu
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  });
});

// ===== SET ACTIVE STATE DI HALAMAN TRAINING =====
// Tambahkan class active ke link Training
const currentPage = window.location.pathname.split('/').pop();
if (currentPage === 'training.html' || currentPage === '') {
  document.querySelectorAll('.dropdown-item[href="training.html"]').forEach(el => {
    el.classList.add('active');
  });
}