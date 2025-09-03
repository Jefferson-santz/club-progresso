// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (header) {  // Verificar se o elemento existe
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - headerHeight,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                if (typeof bootstrap !== 'undefined') {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                } else {
                    navbarCollapse.classList.remove('show');
                }
            }
        }
    });
});

// Initialize carousels and other components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hero carousel
    const heroCarouselElement = document.getElementById('heroCarousel');
    if (heroCarouselElement && typeof bootstrap !== 'undefined') {
        const heroCarousel = new bootstrap.Carousel(heroCarouselElement, {
            interval: 5000,
            wrap: true,
            pause: false
        });
    }

    // Testimonials carousel
    const testimonialsCarouselElement = document.getElementById('testimonialsCarousel');
    if (testimonialsCarouselElement && typeof bootstrap !== 'undefined') {
        const testimonialsCarousel = new bootstrap.Carousel(testimonialsCarouselElement, {
            interval: 5000,
            wrap: true
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Obrigado por assinar nossa newsletter!');
                emailInput.value = '';
            }
        });
    }

    // FAQ functionality - CORREÇÃO
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    otherItem.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('i');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                answer.style.maxHeight = null;
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    });

    // Configuração do Lightbox
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': "Imagem %1 de %2",
            'fadeDuration': 300
        });
    }

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        if (!document.querySelector('script[src*="lazysizes"]')) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
    }

    // Create and add Back to top button
    addBackToTopButton();
});

// Back to top button
function addBackToTopButton() {
    // Check if button already exists
    if (!document.querySelector('.back-to-top')) {
        const backToTopButton = document.createElement('a');
        backToTopButton.href = '#';
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopButton);

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Monitor scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Add styles for back to top button
        if (!document.querySelector('style[data-id="back-to-top-styles"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-id', 'back-to-top-styles');
            style.textContent = `
                .back-to-top {
                    position: fixed;
                    bottom: 80px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    background-color: var(--primary-color, #007bff);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    text-decoration: none;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 99;
                }
                .back-to-top.show {
                    opacity: 1;
                    visibility: visible;
                }
                .back-to-top:hover {
                    background-color: var(--primary-dark, #0056b3);
                    transform: translateY(-3px);
                }
            `;
            document.head.appendChild(style);
        }
    }
}