// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Detect touch device
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Feature Pseudo Videos
document.querySelectorAll('.feature-box').forEach(feature => {
    const pseudoVideo = feature.querySelector('.pseudo-video');
    const playPauseBtn = feature.querySelector('.play-pause');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const progressBar = feature.querySelector('.video-progress-bar');
    const progressContainer = feature.querySelector('.video-progress');
    let isPlaying = false;
    let startTime = 0;
    let animationFrame;
    const videoDuration = 30; // 30 seconds

    // Touch variables
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    // Prevent feature box link navigation when interacting with controls
    feature.querySelector('.video-controls').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    // Toggle play/pause with improved touch handling
    function togglePlay(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (isPlaying) {
            pausePseudoVideo();
        } else {
            playPseudoVideo();
        }
    }

    // Enhanced play function
    function playPseudoVideo() {
        isPlaying = true;
        startTime = startTime || Date.now();
        updatePlayButton();
        animateProgress();
        
        pseudoVideo.classList.add('playing');
        
        // Start or resume animations with error handling
        try {
            pseudoVideo.getAnimations().forEach(animation => {
                animation.playbackRate = 1;
            });
            
            pseudoVideo.querySelectorAll('.pseudo-video-element').forEach(element => {
                element.getAnimations().forEach(animation => {
                    animation.playbackRate = 1;
                });
            });
        } catch (error) {
            console.warn('Animation API not fully supported:', error);
        }
    }

    // Enhanced pause function
    function pausePseudoVideo() {
        isPlaying = false;
        updatePlayButton();
        cancelAnimationFrame(animationFrame);
        
        pseudoVideo.classList.remove('playing');
        
        try {
            pseudoVideo.getAnimations().forEach(animation => {
                animation.playbackRate = 0;
            });
            
            pseudoVideo.querySelectorAll('.pseudo-video-element').forEach(element => {
                element.getAnimations().forEach(animation => {
                    animation.playbackRate = 0;
                });
            });
        } catch (error) {
            console.warn('Animation API not fully supported:', error);
        }
    }

    // Update play button with transition
    function updatePlayButton() {
        playIcon.style.display = isPlaying ? 'none' : 'block';
        pauseIcon.style.display = isPlaying ? 'block' : 'none';
        
        // Add transition effect
        playPauseBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            playPauseBtn.style.transform = 'scale(1)';
        }, 100);
    }

    // Improved progress animation
    function animateProgress() {
        if (!isPlaying) return;
        
        const currentTime = (Date.now() - startTime) / 1000;
        const progress = (currentTime % videoDuration) / videoDuration * 100;
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        animationFrame = requestAnimationFrame(animateProgress);
    }

    // Enhanced progress bar interaction
    if (progressContainer) {
        progressContainer.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            const rect = event.currentTarget.getBoundingClientRect();
            const pos = (event.clientX - rect.left) / rect.width;
            startTime = Date.now() - (pos * videoDuration * 1000);
            
            if (!isPlaying) {
                playPseudoVideo();
            }
        });
    }

    // Event Listeners with improved mobile handling
    playPauseBtn.addEventListener('click', togglePlay);
    playPauseBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (!isSwiping) {
            togglePlay(e);
        }
    });

    // Auto-play on hover (desktop only)
    if (!isTouch) {
        let hoverTimeout;
        
        feature.addEventListener('mouseenter', () => {
            // Clear any existing timeout
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
            
            // Add a small delay before playing
            hoverTimeout = setTimeout(() => {
                if (!isPlaying) {
                    playPseudoVideo();
                }
            }, 100);
        });

        feature.addEventListener('mouseleave', () => {
            // Clear the timeout if it hasn't triggered yet
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
            
            if (isPlaying) {
                pausePseudoVideo();
                startTime = 0;
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            }
        });
    }

    // Cleanup function
    function cleanup() {
        cancelAnimationFrame(animationFrame);
        if (isPlaying) {
            pausePseudoVideo();
        }
    }

    // Clean up animations when the element is removed
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && isPlaying) {
                    cleanup();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(feature);
    }
});

// Testimonials Auto-scroll
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
const totalTestimonials = testimonialCards.length;

// Clone testimonials for infinite scroll
testimonialCards.forEach(card => {
    const clone = card.cloneNode(true);
    testimonialsTrack.appendChild(clone);
});

// Update indicators
function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Auto-scroll animation is handled by CSS, but we need to update indicators
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateIndicators();
}, 5000); // Match this with the CSS animation duration divided by number of slides

// Pause animation on hover
testimonialsTrack.addEventListener('mouseenter', () => {
    testimonialsTrack.style.animationPlayState = 'paused';
});

testimonialsTrack.addEventListener('mouseleave', () => {
    testimonialsTrack.style.animationPlayState = 'running';
});

// Handle touch events
let touchStartX = 0;
let touchEndX = 0;

testimonialsTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    testimonialsTrack.style.animationPlayState = 'paused';
}, { passive: true });

testimonialsTrack.addEventListener('touchend', () => {
    testimonialsTrack.style.animationPlayState = 'running';
}, { passive: true });

// FAQ Functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current FAQ item
        faqItem.classList.toggle('active');
        
        // Accessibility
        button.setAttribute('aria-expanded', !isActive);
    });
});

// Story Slider Functionality
const storyTrack = document.querySelector('.story-track');
const storySlides = document.querySelectorAll('.story-slide');
const prevButton = document.querySelector('.story-nav-button.prev');
const nextButton = document.querySelector('.story-nav-button.next');
const storyIndicators = document.querySelectorAll('.story-indicator');
let currentSlide = 0;
const slideCount = storySlides.length;

function updateSlider() {
    // Update transform
    storyTrack.style.transform = `translateX(-${currentSlide * 33.333}%)`;
    
    // Update active states
    storySlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    // Update indicators
    storyIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Update button states
    prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
    nextButton.style.opacity = currentSlide === slideCount - 1 ? '0.5' : '1';
}

function goToSlide(index) {
    currentSlide = Math.max(0, Math.min(index, slideCount - 1));
    updateSlider();
}

// Event Listeners
prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
});

nextButton.addEventListener('click', () => {
    if (currentSlide < slideCount - 1) {
        goToSlide(currentSlide + 1);
    }
});

storyIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Touch support
let storyTouchStartX = 0;
let storyTouchEndX = 0;

storyTrack.addEventListener('touchstart', (e) => {
    storyTouchStartX = e.touches[0].clientX;
}, { passive: true });

storyTrack.addEventListener('touchmove', (e) => {
    storyTouchEndX = e.touches[0].clientX;
}, { passive: true });

storyTrack.addEventListener('touchend', () => {
    const touchDiff = storyTouchStartX - storyTouchEndX;
    
    if (Math.abs(touchDiff) > 50) { // Minimum swipe distance
        if (touchDiff > 0 && currentSlide < slideCount - 1) {
            // Swipe left
            goToSlide(currentSlide + 1);
        } else if (touchDiff < 0 && currentSlide > 0) {
            // Swipe right
            goToSlide(currentSlide - 1);
        }
    }
});

// Initialize slider
updateSlider();

// Add scroll reveal animations
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
document.querySelectorAll('.benefit-item, .feature-box, .testimonial-card, .faq-item').forEach(element => {
    element.classList.add('reveal');
});

// Listen for scroll
window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Add loading animation to buttons
document.querySelectorAll('.waitlist-button, .primary-button').forEach(button => {
    const originalText = button.textContent;
    
    button.addEventListener('click', function() {
        const dots = document.createElement('div');
        dots.className = 'loading-dots';
        dots.innerHTML = '<span></span><span></span><span></span>';
        
        const textSpan = document.createElement('span');
        textSpan.textContent = ' Loading ';
        
        this.textContent = '';
        this.appendChild(textSpan);
        this.appendChild(dots);
        
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    });
});

// Add confetti effect on CTA clicks
function createConfetti(x, y) {
    const colors = ['#4B7BF5', '#A947FF', '#00F076', '#FFBC00'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        let opacity = 1;
        let posX = x;
        let posY = y;
        
        function animate() {
            if (opacity <= 0) {
                confetti.remove();
                return;
            }
            
            posX += dx;
            posY += dy + 2; // Add gravity
            opacity -= 0.02;
            
            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.opacity = opacity;
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

document.querySelectorAll('.waitlist-button, .primary-button').forEach(button => {
    button.addEventListener('click', function(e) {
        createConfetti(e.clientX, e.clientY);
    });
});

// Add hover sound effect (subtle)
const hoverSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAADAAAGhgBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr///////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAYZxhxzGAAAAAAAAAAAAAAAAAAAA//tQxAAB8AAAf4AAAAwAAA/wAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tQxBmD8AAAf4AAAAwAAA/wAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tQxCmAAAANIAAAAQAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=');
hoverSound.volume = 0.1;

document.querySelectorAll('.benefit-item, .feature-box, .testimonial-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {}); // Ignore autoplay restrictions
    });
});

// Add CSS for confetti
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        pointer-events: none;
        z-index: 9999;
    }
`;
document.head.appendChild(style); 