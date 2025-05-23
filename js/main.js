document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Update aria-expanded attribute
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
        this.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
    
    // Submenu toggle for mobile
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');
    
    hasSubmenuItems.forEach(item => {
        const link = item.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
                
                // Update aria-expanded attribute
                const expanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !expanded);
            }
        });
    });
    
    // Close menu when clicking outside on desktop
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            if (!e.target.closest('.has-submenu')) {
                document.querySelectorAll('.submenu').forEach(menu => {
                    menu.previousElementSibling.setAttribute('aria-expanded', 'false');
                });
            }
        }
    });
    
    // Close menu when resizing from mobile to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            
            // Reset all submenus
            hasSubmenuItems.forEach(item => {
                item.classList.remove('active');
                item.querySelector('a').setAttribute('aria-expanded', 'false');
            });
        }
    });
});