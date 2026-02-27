// Story Page JavaScript
// Menangani navbar scroll effect dan mobile menu

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
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Tutup semua dropdown yang aktif
        document.querySelectorAll('.dropdown.active').forEach(drop => {
            drop.classList.remove('active');
        });
    });
    
    // Close menu on window resize (if window becomes larger than mobile breakpoint)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
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
    
    // ===== WHATSAPP FLOAT POSITIONING - VERSION FIX =====
    // Versi sederhana tanpa adjust scroll
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    // Hanya set initial position, tidak perlu adjust on scroll
    if (whatsappFloat) {
        if (window.innerWidth <= 768) {
            whatsappFloat.style.bottom = '20px';
        } else {
            whatsappFloat.style.bottom = '30px';
        }
    }
    
    // ===== ACTIVE LINK HANDLING =====
    // Untuk story page, link Story sudah aktif secara default di HTML
    // Tapi kita pastikan tidak ada link lain yang aktif
    
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Reset semua active class
        if (href && href.includes('story.html')) {
            link.classList.add('active');
        } else if (href && !href.includes('story.html')) {
            link.classList.remove('active');
        }
    });
    
    // Untuk dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.classList.remove('active');
    });
});

// Handle page load animations
window.addEventListener('load', function() {
    // Pastikan hero title dan subtitle terlihat setelah animasi
    const heroTitle = document.querySelector('.story-hero-title');
    const heroSubtitle = document.querySelector('.story-hero-subtitle');
    
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '1';
    }
});