// Initialize EmailJS (if available)
// Initialize EmailJS (if available)
if (typeof emailjs !== 'undefined') {
    emailjs.init("service_breefix_portfolio");
}

// Add clickable wrappers and download controls for portfolio images.
document.addEventListener('DOMContentLoaded', function setupImageLinks() {
    const imgs = document.querySelectorAll('.portfolio-img');
    imgs.forEach(img => {
        const parent = img.parentElement;
        if (parent && parent.classList.contains('portfolio-link')) return; // already wrapped

        const src = img.getAttribute('src') || '';
        const filename = src.split('/').pop().split('?')[0] || 'image';

        // Create anchor wrapper so image is directly linkable
        const a = document.createElement('a');
        a.href = src || '#';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'portfolio-link';

        // Replace img with anchor>img
        try {
            img.parentNode.replaceChild(a, img);
            a.appendChild(img);
        } catch (e) {
            return;
        }

        // Add download button overlay inside the .portfolio-image container
        const wrapper = a.parentElement; // expected to be .portfolio-image
        if (wrapper && !wrapper.querySelector('.download-btn')) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'download-btn';
            btn.title = 'Download image';
            btn.innerHTML = '<i class="fa-solid fa-download"></i>';
            btn.addEventListener('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                downloadImage(src, filename);
            });
            wrapper.appendChild(btn);
        }
    });

    function downloadImage(url, filename) {
        if (!url) return;
        // Try fetching image as blob and trigger download
        fetch(url, { mode: 'cors' })
            .then(resp => resp.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = blobUrl;
                a.download = filename || 'image';
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
            })
            .catch(() => {
                // Fallback: open image in new tab (user can save manually)
                window.open(url, '_blank');
            });
    }
});

// ===== IMAGE LIGHTBOX MODAL (Priority) =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Query current images each time to include any dynamically-wrapped images
    const getPortfolioImages = () => Array.from(document.querySelectorAll('.portfolio-img'));
    let currentImageIndex = 0;

    function openModal(imgElement) {
        if (!modal || !modalImage) return;
        modal.classList.add('active');
        modalImage.src = imgElement.src;
        modalCaption.textContent = imgElement.getAttribute('data-title') || 'Image';
        updateNavButtons();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
    }

    function updateNavButtons() {
        const images = getPortfolioImages();
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === images.length - 1;
    }

    // Attach click handlers to images (delegated attachment to allow dynamic changes)
    document.addEventListener('click', function (e) {
        const img = e.target.closest && e.target.closest('.portfolio-img');
        if (img) {
            e.preventDefault();
            const images = getPortfolioImages();
            currentImageIndex = images.indexOf(img);
            openModal(img);
        }
    });

    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', function() {
        const images = getPortfolioImages();
        if (currentImageIndex > 0) {
            currentImageIndex--;
            const img = images[currentImageIndex];
            modalImage.src = img.src;
            modalCaption.textContent = img.getAttribute('data-title') || 'Image';
            updateNavButtons();
        }
    });

    if (nextBtn) nextBtn.addEventListener('click', function() {
        const images = getPortfolioImages();
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            const img = images[currentImageIndex];
            modalImage.src = img.src;
            modalCaption.textContent = img.getAttribute('data-title') || 'Image';
            updateNavButtons();
        }
    });

    // Close modal
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    if (modal) modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') closeModal();
            const images = getPortfolioImages();
            if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
                currentImageIndex--;
                const img = images[currentImageIndex];
                modalImage.src = img.src;
                modalCaption.textContent = img.getAttribute('data-title') || 'Image';
                updateNavButtons();
            }
            if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
                currentImageIndex++;
                const img = images[currentImageIndex];
                modalImage.src = img.src;
                modalCaption.textContent = img.getAttribute('data-title') || 'Image';
                updateNavButtons();
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const logoElement = document.querySelector('.logo');

    if (!logoElement) return;

    function createFireworksParticles() {
        const logoRect = logoElement.getBoundingClientRect();
        const logoX = logoRect.left + logoRect.width / 2;
        const logoY = logoRect.top + logoRect.height / 2;
        
        // Create 8 particles that explode outward
        for (let i = 1; i <= 8; i++) {
            const particle = document.createElement('div');
            particle.className = `navbar-particle particle-${i}`;
            particle.style.backgroundImage = 'url(images/logo\\ breefix.png)';
            particle.style.left = logoX + 'px';
            particle.style.top = logoY + 'px';
            
            document.body.appendChild(particle);
            
            // Remove particle after animation completes
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }

    // Trigger fireworks on hover
    logoElement.addEventListener('mouseenter', createFireworksParticles);

    // Auto-trigger fireworks every 5 seconds
    setInterval(createFireworksParticles, 5000);
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONTACT FORM HANDLER =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form values using name attributes
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            if (!nameInput || !emailInput || !messageInput) {
                console.error('Form inputs not found');
                alert('Form error: Please check the form structure');
                return;
            }

            // Validate inputs
            if (!nameInput.value.trim()) {
                alert('Please enter your name');
                nameInput.focus();
                return;
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }
            
            if (!messageInput.value.trim()) {
                alert('Please enter your message');
                messageInput.focus();
                return;
            }

            const templateParams = {
                to_email: "alexanderjkoroma@gmail.com",
                from_name: nameInput.value.trim(),
                from_email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };
            
            // Show sending state
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send("service_breefix_portfolio", "template_breefix_contact", templateParams)
                    .then(function(response) {
                        // Success
                        submitButton.textContent = 'Message Sent! ✓';
                        submitButton.style.backgroundColor = '#4CAF50';
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Restore button after 3 seconds
                        setTimeout(() => {
                            submitButton.textContent = originalText;
                            submitButton.style.backgroundColor = '#ff6b35';
                            submitButton.disabled = false;
                        }, 3000);
                    }, function(error) {
                        // Error
                        console.error('Email send failed:', error);
                        submitButton.textContent = 'Error! Try again';
                        submitButton.style.backgroundColor = '#f44336';
                        
                        // Restore button after 3 seconds
                        setTimeout(() => {
                            submitButton.textContent = originalText;
                            submitButton.style.backgroundColor = '#ff6b35';
                            submitButton.disabled = false;
                        }, 3000);
                    });
            } else {
                alert('Email service not available. Please contact via email directly.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
});

// Simple email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== PORTFOLIO SCROLL ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        observer.observe(item);
    });
});

// ===== NAVBAR ACTIVE LINK INDICATOR =====
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#ff6b35';
            } else {
                link.style.color = '#fff';
            }
        });
    });
});
