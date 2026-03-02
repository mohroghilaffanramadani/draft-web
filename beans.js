// Beans Page JavaScript

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
    
    updateNavbarOnScroll();
    window.addEventListener('scroll', updateNavbarOnScroll);
    
    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Buat overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            // Toggle menu
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Ganti ikon
            if (navMenu.classList.contains('active')) {
                // Menu dibuka - ganti ke X
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Cegah scroll
            } else {
                // Menu ditutup - ganti ke bars
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Tutup menu saat overlay diklik
    overlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        
        // Kembalikan ikon ke bars
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        document.body.style.overflow = '';
        
        // Tutup semua dropdown yang aktif
        document.querySelectorAll('.dropdown.active').forEach(drop => {
            drop.classList.remove('active');
        });
    });
    
    // Tutup menu saat resize ke desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            
            // Kembalikan ikon ke bars
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
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
    function handleDropdowns() {
        const width = window.innerWidth;
        
        if (width > 768 && width <= 1024) {
            // Untuk tablet, gunakan klik (bukan hover)
            dropdownToggles.forEach(toggle => {
                toggle.closest('.dropdown').style.pointerEvents = 'auto';
                
                toggle.removeEventListener('click', tabletClickHandler);
                toggle.addEventListener('click', tabletClickHandler);
            });
        } else if (width > 1024) {
            // Untuk desktop, kembali ke hover
            dropdownToggles.forEach(toggle => {
                toggle.closest('.dropdown').style.pointerEvents = '';
                toggle.removeEventListener('click', tabletClickHandler);
            });
        } else {
            // Untuk mobile
            dropdownToggles.forEach(toggle => {
                toggle.closest('.dropdown').style.pointerEvents = '';
            });
        }
    }
    
    function tabletClickHandler(e) {
        if (window.innerWidth > 768 && window.innerWidth <= 1024) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            
            dropdown.classList.toggle('active');
            
            dropdownToggles.forEach(otherToggle => {
                const otherDropdown = otherToggle.closest('.dropdown');
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
    }
    
    handleDropdowns();
    
    window.addEventListener('resize', function() {
        handleDropdowns();
        
        if (window.innerWidth > 1024) {
            document.querySelectorAll('.dropdown.active').forEach(drop => {
                drop.classList.remove('active');
            });
        }
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Tutup mobile menu jika terbuka
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ===== ACTIVE LINK HANDLING (YANG SUDAH DIPERBAIKI) =====
    const currentPage = window.location.pathname.split('/').pop(); // Ambil nama file
    
    // Cek apakah kita di halaman beans.html
    const isBeansPage = currentPage === 'beans.html' || window.location.pathname.includes('beans.html');
    
    // Untuk semua nav-link
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        
        if (href && href.includes('beans.html')) {
            if (isBeansPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
    
    // Untuk dropdown items
    document.querySelectorAll('.dropdown-item').forEach(item => {
        const itemHref = item.getAttribute('href');
        
        if (itemHref && itemHref.includes('beans.html')) {
            if (isBeansPage) {
                item.classList.add('active');
                
                // Buka parent dropdown jika ada
                const parentDropdown = item.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.classList.add('active');
                }
            } else {
                item.classList.remove('active');
            }
        }
    });
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const animateElements = document.querySelectorAll('.category-card, .product-card, .howto-step');
    
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