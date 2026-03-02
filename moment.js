// Moment Page JavaScript
// Menangani navbar scroll effect dan mobile menu - SAMA PERSIS DENGAN STORY-SCRIPT.JS

document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarOnScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Initial check
    updateNavbarOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateNavbarOnScroll);
    
    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Buat overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    
    // Function to toggle menu
    function toggleMenu() {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Toggle icon between hamburger and X
        const toggleIcon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            // Change to X icon (close)
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
            // Make sure icon is black without background
            toggleIcon.style.color = '#000000';
            toggleIcon.style.background = 'transparent';
            document.body.style.overflow = 'hidden';
        } else {
            // Change back to hamburger icon
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
            // Reset to original color (you can adjust this)
            toggleIcon.style.color = '';
            toggleIcon.style.background = '';
            document.body.style.overflow = '';
        }
    }
    
    // Toggle mobile menu
    if (navToggle) {
        // Initial setup - ensure icon is hamburger
        const toggleIcon = navToggle.querySelector('i');
        if (toggleIcon) {
            toggleIcon.classList.add('fa-bars');
            toggleIcon.classList.remove('fa-times');
        }
        
        navToggle.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Close menu on window resize (if window becomes larger than mobile breakpoint)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            // Reset to hamburger icon
            const toggleIcon = navToggle.querySelector('i');
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
            toggleIcon.style.color = '';
            toggleIcon.style.background = '';
            
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===== DROPDOWN MENU UNTUK MOBILE =====
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Hanya untuk mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                
                // Toggle class active untuk dropdown yang diklik
                dropdown.classList.toggle('active');
                
                // Tutup dropdown lain yang terbuka
                dropdownToggles.forEach(otherToggle => {
                    const otherDropdown = otherToggle.closest('.dropdown');
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // ===== DROPDOWN UNTUK TABLET (769px - 1024px) =====
    // Fungsi untuk handle dropdown berdasarkan ukuran layar
    function handleDropdowns() {
        const width = window.innerWidth;
        
        if (width > 768 && width <= 1024) {
            // Untuk tablet, gunakan klik (bukan hover)
            dropdownToggles.forEach(toggle => {
                // Hapus event hover dengan CSS
                toggle.closest('.dropdown').style.pointerEvents = 'auto';
                
                // Replace click handler
                toggle.removeEventListener('click', tabletClickHandler);
                toggle.addEventListener('click', tabletClickHandler);
            });
        } else if (width > 1024) {
            // Untuk desktop, kembali ke hover (CSS akan handle)
            dropdownToggles.forEach(toggle => {
                toggle.closest('.dropdown').style.pointerEvents = '';
                toggle.removeEventListener('click', tabletClickHandler);
            });
        } else {
            // Untuk mobile, sudah dihandle oleh kode sebelumnya
            dropdownToggles.forEach(toggle => {
                toggle.closest('.dropdown').style.pointerEvents = '';
            });
        }
    }
    
    // Handler khusus untuk tablet
    function tabletClickHandler(e) {
        if (window.innerWidth > 768 && window.innerWidth <= 1024) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            
            // Toggle class active
            dropdown.classList.toggle('active');
            
            // Tutup dropdown lain
            dropdownToggles.forEach(otherToggle => {
                const otherDropdown = otherToggle.closest('.dropdown');
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
    }
    
    // Initial call
    handleDropdowns();
    
    // Handle on resize
    window.addEventListener('resize', function() {
        handleDropdowns();
        
        // Close all dropdowns when resizing
        if (window.innerWidth > 1024) {
            document.querySelectorAll('.dropdown.active').forEach(drop => {
                drop.classList.remove('active');
            });
        }
    });
    
    // ===== WHATSAPP FLOAT POSITIONING =====
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        if (window.innerWidth <= 768) {
            whatsappFloat.style.bottom = '20px';
        } else {
            whatsappFloat.style.bottom = '30px';
        }
    }
    
    // ===== ACTIVE LINK HANDLING =====
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Reset semua active class
        if (href && href.includes('moment.html')) {
            link.classList.add('active');
        } else if (href && !href.includes('moment.html')) {
            link.classList.remove('active');
        }
    });
    
    // Untuk dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // ===== SMOOTH SCROLL UNTUK ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== INTERSECTION OBSERVER UNTUK ANIMASI SCROLL =====
    const animateElements = document.querySelectorAll('.moment-card, .event-card, .feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});

// Handle page load animations
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.moments-hero-title');
    const heroSubtitle = document.querySelector('.moments-hero-subtitle');
    
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '1';
    }
});