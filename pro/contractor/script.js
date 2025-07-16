console.log('Script loaded successfully!');

// Testimonials Carousel Functionality
function initializeTestimonialsCarousel() {
    console.log('Initializing testimonials carousel...');
    
    const carouselContainer = document.querySelector('.testimonials-container');
    const dots = document.querySelectorAll('.carousel-dot');
    const cards = document.querySelectorAll('.testimonial-card');
    
    console.log('Found elements:', {
        carouselContainer: !!carouselContainer,
        dotsCount: dots.length,
        cardsCount: cards.length
    });
    
    if (!carouselContainer) {
        console.warn('Testimonials container not found');
        return;
    }
    
    if (dots.length === 0) {
        console.warn('No carousel dots found');
        return;
    }
    
    if (cards.length === 0) {
        console.warn('No testimonial cards found');
        return;
    }
    
    let currentSlide = 0;
    const isMobile = window.innerWidth <= 768;
    const cardWidth = isMobile ? (280 + 20) : (250 + 32); // card width + gap (mobile vs desktop)
    const totalSlides = dots.length;
    
    // Calculate total width needed for all cards
    const totalWidth = totalSlides * cardWidth;
    
    console.log('Carousel configuration:', {
        cardWidth,
        totalSlides,
        totalWidth,
        isMobile,
        containerWidth: carouselContainer.offsetWidth,
        windowWidth: window.innerWidth
    });
    
    // Ensure container has enough width to accommodate all cards
    carouselContainer.style.width = `${totalWidth}px`;
    
    // Force a reflow to ensure the width is applied
    carouselContainer.offsetHeight;
    
    function goToSlide(slideIndex) {
        console.log('Going to slide:', slideIndex);
        currentSlide = slideIndex;
        
        let translateX = -slideIndex * cardWidth;
        
        // On mobile only, center the last card in the viewport
        if (isMobile && slideIndex === totalSlides - 1) {
            const viewportWidth = window.innerWidth;
            const carouselPadding = 32; // 16px padding on each side
            const availableWidth = viewportWidth - carouselPadding;
            const cardCenterOffset = availableWidth / 2 - cardWidth / 2;
            translateX = -(slideIndex * cardWidth) + cardCenterOffset;
        }
        // On desktop, slide by half card distance for smoother navigation
        else if (!isMobile) {
            const halfCardDistance = cardWidth / 2;
            translateX = -slideIndex * halfCardDistance;
            
            // Ensure we don't go beyond the last card
            const maxTranslateX = -(totalSlides * cardWidth - cardWidth);
            translateX = Math.max(translateX, maxTranslateX);
        }
        
        carouselContainer.style.transform = `translateX(${translateX}px)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
        
        console.log('Carousel moved to slide', slideIndex, 'with translateX:', translateX, 'isMobile:', isMobile);
    }
    
    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log('Dot clicked:', index);
            goToSlide(index);
        });
    });
    
    // Initialize first slide
    goToSlide(0);
    console.log('Testimonials carousel initialized successfully');
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recalculate card width based on new screen size
        const newIsMobile = window.innerWidth <= 768;
        const newCardWidth = newIsMobile ? (280 + 20) : (250 + 32);
        const newTotalWidth = totalSlides * newCardWidth;
        
        // Update container width
        carouselContainer.style.width = `${newTotalWidth}px`;
        
        // Recalculate current slide position with new card width
        let newTranslateX = -currentSlide * newCardWidth;
        
        // On mobile only, center the last card in the viewport
        if (newIsMobile && currentSlide === totalSlides - 1) {
            const viewportWidth = window.innerWidth;
            const carouselPadding = 32; // 16px padding on each side
            const availableWidth = viewportWidth - carouselPadding;
            const cardCenterOffset = availableWidth / 2 - newCardWidth / 2;
            newTranslateX = -(currentSlide * newCardWidth) + cardCenterOffset;
        }
        // On desktop, slide by half card distance for smoother navigation
        else if (!newIsMobile) {
            const halfCardDistance = newCardWidth / 2;
            newTranslateX = -currentSlide * halfCardDistance;
            
            // Ensure we don't go beyond the last card
            const maxTranslateX = -(totalSlides * newCardWidth - newCardWidth);
            newTranslateX = Math.max(newTranslateX, maxTranslateX);
        }
        
        carouselContainer.style.transform = `translateX(${newTranslateX}px)`;
        
        console.log('Carousel resized:', {
            newIsMobile,
            newCardWidth,
            newTotalWidth,
            newTranslateX,
            windowWidth: window.innerWidth
        });
    });
    
    // Handle orientation change specifically for mobile
    window.addEventListener('orientationchange', () => {
        // Wait for orientation change to complete
        setTimeout(() => {
            const newIsMobile = window.innerWidth <= 768;
            const newCardWidth = newIsMobile ? (280 + 20) : (250 + 32);
            const newTotalWidth = totalSlides * newCardWidth;
            
            carouselContainer.style.width = `${newTotalWidth}px`;
            
            let newTranslateX = -currentSlide * newCardWidth;
            
            // On mobile only, center the last card in the viewport
            if (newIsMobile && currentSlide === totalSlides - 1) {
                const viewportWidth = window.innerWidth;
                const carouselPadding = 32; // 16px padding on each side
                const availableWidth = viewportWidth - carouselPadding;
                const cardCenterOffset = availableWidth / 2 - newCardWidth / 2;
                newTranslateX = -(currentSlide * newCardWidth) + cardCenterOffset;
            }
            // On desktop, slide by half card distance for smoother navigation
            else if (!newIsMobile) {
                const halfCardDistance = newCardWidth / 2;
                newTranslateX = -currentSlide * halfCardDistance;
                
                // Ensure we don't go beyond the last card
                const maxTranslateX = -(totalSlides * newCardWidth - newCardWidth);
                newTranslateX = Math.max(newTranslateX, maxTranslateX);
            }
            
            carouselContainer.style.transform = `translateX(${newTranslateX}px)`;
            
            console.log('Orientation changed:', {
                newIsMobile,
                newCardWidth,
                newTotalWidth,
                newTranslateX,
                windowWidth: window.innerWidth
            });
        }, 500);
    });
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all styles are applied
    setTimeout(() => {
        initializeTestimonialsCarousel();
    }, 100);
});

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

// FAQ Functionality - Simple and robust implementation
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        setTimeout(initializeFAQ, 100);
        return;
    }
    
    // Ensure all FAQ items are closed by default
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item) => {
        item.classList.remove('active');
    });
    
    faqQuestions.forEach((button) => {
        // Remove any existing event listeners
        button.removeEventListener('click', handleFAQClick);
        
        // Add new event listener
        button.addEventListener('click', handleFAQClick);
    });
}

function handleFAQClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const faqItem = this.closest('.faq-item');
    if (!faqItem) {
        return;
    }
    
    const faqAnswer = faqItem.querySelector('.faq-answer');
    if (!faqAnswer) {
        return;
    }
    
    // Check current state before any changes
    const hasActiveClass = faqItem.classList.contains('active');
    
    // Toggle the active state using CSS classes for smooth animation
    if (hasActiveClass) {
        // Hide the answer by removing active class (CSS handles the animation)
        faqItem.classList.remove('active');
    } else {
        // Show the answer by adding active class (CSS handles the animation)
        faqItem.classList.add('active');
    }
    
    // Accessibility
    this.setAttribute('aria-expanded', !hasActiveClass);
}

// Initialize FAQ when DOM is ready
document.addEventListener('DOMContentLoaded', initializeFAQ);

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
document.querySelectorAll('.benefit-item, .feature-box, .testimonial-card').forEach(element => {
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

// Benefits Slider Functionality
const benefitsTrack = document.querySelector('.benefits-track');
const benefitItems = document.querySelectorAll('.benefit-item');
const benefitsPrevBtn = document.querySelector('.benefits-nav-btn.prev-btn');
const benefitsNextBtn = document.querySelector('.benefits-nav-btn.next-btn');
const benefitDots = document.querySelectorAll('.benefit-dot');

// Only proceed if benefits slider exists
if (benefitsTrack && benefitItems.length > 0) {
let currentBenefitSlide = 0;
const totalBenefitSlides = benefitItems.length;

function updateBenefitsSlider() {
    // Calculate slide width based on screen size
    const isMobile = window.innerWidth <= 768;
    const slideWidth = isMobile ? 312 : 370; // Mobile: 280px + 32px gap, Desktop: 350px + 20px gap
    const maxSlides = isMobile ? totalBenefitSlides - 1 : totalBenefitSlides - 2;
    
    // Update transform
    benefitsTrack.style.transform = `translateX(-${currentBenefitSlide * slideWidth}px)`;
    
    // Update dots
    benefitDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentBenefitSlide);
    });
    
    // Update button states
    if (benefitsPrevBtn) benefitsPrevBtn.disabled = currentBenefitSlide === 0;
    if (benefitsNextBtn) benefitsNextBtn.disabled = currentBenefitSlide >= maxSlides;
}

function nextBenefitSlide() {
    if (currentBenefitSlide < totalBenefitSlides - 1) {
        currentBenefitSlide++;
        updateBenefitsSlider();
    }
}

function prevBenefitSlide() {
    if (currentBenefitSlide > 0) {
        currentBenefitSlide--;
        updateBenefitsSlider();
    }
}

function goToBenefitSlide(slideIndex) {
    currentBenefitSlide = slideIndex;
    updateBenefitsSlider();
}

// Event listeners
if (benefitsNextBtn) benefitsNextBtn.addEventListener('click', nextBenefitSlide);
if (benefitsPrevBtn) benefitsPrevBtn.addEventListener('click', prevBenefitSlide);

benefitDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToBenefitSlide(index));
});

// Auto-play functionality (optional)
let benefitsAutoPlay = setInterval(nextBenefitSlide, 5000);

// Pause auto-play on hover
const benefitsSlider = document.querySelector('.benefits-slider');
if (benefitsSlider) {
    benefitsSlider.addEventListener('mouseenter', () => {
        clearInterval(benefitsAutoPlay);
    });
    
    benefitsSlider.addEventListener('mouseleave', () => {
        benefitsAutoPlay = setInterval(() => {
            if (currentBenefitSlide === totalBenefitSlides - 1) {
                currentBenefitSlide = 0;
            } else {
                currentBenefitSlide++;
            }
            updateBenefitsSlider();
        }, 5000);
    });
}

// Initialize slider
updateBenefitsSlider();

// Handle window resize
window.addEventListener('resize', () => {
    updateBenefitsSlider();
});
}

// Solution Cards Slider Functionality
const sliderTrack = document.querySelector('.slider-track');
const sliderCards = document.querySelectorAll('.solution-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

// Only proceed if slider exists
if (sliderTrack && sliderCards.length > 0) {
let currentSlide = 0;
const totalSlides = sliderCards.length;

function updateSlider() {
    // Move the track
    const translateX = -currentSlide * (100 / totalSlides);
    sliderTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update active states
    sliderCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentSlide);
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update button states
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

function goToSlide(index) {
    currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
    updateSlider();
}

// Event listeners
prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Touch/swipe support
let sliderTouchStartX = 0;
let sliderTouchEndX = 0;

sliderTrack.addEventListener('touchstart', (e) => {
    sliderTouchStartX = e.touches[0].clientX;
}, { passive: true });

sliderTrack.addEventListener('touchmove', (e) => {
    sliderTouchEndX = e.touches[0].clientX;
}, { passive: true });

sliderTrack.addEventListener('touchend', () => {
    const touchDiff = sliderTouchStartX - sliderTouchEndX;
    const minSwipeDistance = 50;
    
    if (Math.abs(touchDiff) > minSwipeDistance) {
        if (touchDiff > 0 && currentSlide < totalSlides - 1) {
            // Swipe left - go to next slide
            goToSlide(currentSlide + 1);
        } else if (touchDiff < 0 && currentSlide > 0) {
            // Swipe right - go to previous slide
            goToSlide(currentSlide - 1);
        }
    }
});

// Initialize slider
updateSlider();
}

// ===== ONBOARDING FLOW FUNCTIONALITY =====

function initializeOnboarding() {
    console.log('initializeOnboarding called');
    const modal = document.getElementById('onboarding-modal');
    const startBtn = document.getElementById('start-onboarding');
    const closeBtn = document.querySelector('.close') || document.getElementById('close-onboarding');
    const progressFill = document.getElementById('progress-fill');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    
    console.log('Modal found:', !!modal);
    console.log('Start button found:', !!startBtn);
    console.log('Close button found:', !!closeBtn);

    if (!modal) {
        console.error('Modal not found');
        return;
    }
    
    if (!startBtn) {
        console.error('Start button not found');
        return;
    }

    let currentStep = 1;
    let userData = {};

    // Open modal
    function openModal() {
        console.log('Opening modal');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        showStep(1);
    }

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Update progress
    function updateProgress(step) {
        const progressPercentage = document.getElementById('progress-percentage');
        
        if (progressFill) {
            let progress;
            if (step === 'success' || step === 5) {
                progress = 100;
            } else {
                progress = (step / 5) * 100;
            }
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressPercentage) {
            const percentages = {
                1: '20%',
                2: '40%',
                3: '60%',
                4: '80%',
                5: '100%',
                'success': '100%'
            };
            progressPercentage.textContent = percentages[step] || '20%';
        }
        
        if (progressSteps) {
            progressSteps.forEach((stepEl, index) => {
                if (step === 'success' || step === 5) {
                    stepEl.classList.add('completed');
                    stepEl.classList.remove('active');
                } else if (index < step) {
                    stepEl.classList.add('completed');
                    stepEl.classList.remove('active');
                } else if (index === step - 1) {
                    stepEl.classList.add('active');
                    stepEl.classList.remove('completed');
                } else {
                    stepEl.classList.remove('active', 'completed');
                }
            });
        }
    }

    // Show specific step
    function showStep(stepNumber) {
        console.log('Showing step:', stepNumber);
        
        // Hide all steps
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Try to find step by ID first (index.html format)
        let targetStep = document.getElementById(`step-${stepNumber}`);
        
        // If not found, try by data-step attribute (test-onboarding.html format)
        if (!targetStep) {
            targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
        }
        
        if (targetStep) {
            targetStep.classList.add('active');
            console.log('Step activated:', stepNumber);
        } else {
            console.error('Step not found:', stepNumber);
        }
        
        currentStep = stepNumber;
        updateProgress(stepNumber);
    }

    // Event listeners
    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // Prevent form submissions
    document.addEventListener('submit', (e) => {
        if (e.target.classList.contains('onboarding-form')) {
            e.preventDefault();
            console.log('Form submission prevented');
        }
    });

    // Step navigation
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('next-step')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next step clicked, current:', currentStep);
            
            // Validate form if we're on step 1
            if (currentStep === 1) {
                const form = document.querySelector('.onboarding-form');
                if (form && !form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
            }
            
            if (currentStep < 4) {
                showStep(currentStep + 1);
            } else if (currentStep === 4) {
                // Show success step
                showStep(5);
            }
        }
        
        if (e.target.classList.contains('prev-step')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Previous step clicked, current:', currentStep);
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        }
        
        if (e.target.classList.contains('finish-onboarding')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Finish onboarding clicked');
            showStep('success');
        }
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            e.preventDefault();
            closeModal();
        }
    });

    // Global function for closing modal (called from success button)
    window.closeModal = closeModal;

    // Handle polo approval from step 4
    document.addEventListener('click', (e) => {
        if (e.target.id === 'polo-approve-btn') {
            e.preventDefault();
            // Show sharing options in the same step
            const sharingOptions = document.getElementById('sharing-options-step');
            if (sharingOptions) {
                sharingOptions.style.display = 'block';
            }
        }

        if (e.target.id === 'polo-retake-step-btn') {
            e.preventDefault();
            // Go back to recording step
            showStep(3);
            retakePoloRecording();
        }

        // Handle sharing method clicks
        if (e.target.classList.contains('share-btn') || e.target.classList.contains('copy-btn')) {
            e.preventDefault();
            const method = e.target.getAttribute('data-method');
            handleSharingMethod(method, e.target);
        }

        if (e.target.id === 'skip-recording') {
            e.preventDefault();
            // Skip directly to step 5 (success)
            showStep(5);
        }

        if (e.target.id === 'skip-invites-step') {
            e.preventDefault();
            // Move to success step
            showStep(5);
        }
    });

    console.log('Onboarding script initialized');
}

function initializeProductTour() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.tour-slide');
    const totalSlides = slides.length;

    function updateTourSlide() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Update dots if they exist
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update navigation buttons
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        
        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
    }

    // Navigation buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('prev-slide')) {
            e.preventDefault();
            currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
            updateTourSlide();
        }
        
        if (e.target.classList.contains('next-slide')) {
            e.preventDefault();
            currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
            updateTourSlide();
        }
        
        if (e.target.classList.contains('dot')) {
            e.preventDefault();
            currentSlide = parseInt(e.target.dataset.slide) - 1; // Convert to 0-based index
            updateTourSlide();
        }
    });

    // Initialize first slide
    if (slides.length > 0) {
        updateTourSlide();
    }
}

function initializeTeamInvitation() {
    const phoneInputsContainer = document.getElementById('phone-inputs') || document.querySelector('.phone-list');
    const addPhoneBtn = document.getElementById('add-phone') || document.querySelector('.add-phone');
    const messagePreview = document.getElementById('message-preview');
    const sendTextBtn = document.getElementById('send-text-invites') || document.querySelector('.send-invites');

    console.log('Team invitation elements:', {
        phoneInputsContainer: !!phoneInputsContainer,
        addPhoneBtn: !!addPhoneBtn,
        sendTextBtn: !!sendTextBtn
    });

    if (!addPhoneBtn) return;

    function addPhoneInput() {
        const phoneInput = document.createElement('div');
        phoneInput.className = 'phone-input-group';
        phoneInput.innerHTML = `
            <input type="tel" placeholder="Enter phone number" class="phone-input">
            <button type="button" class="remove-phone" onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add to container if it exists, otherwise add to parent of add button
        if (phoneInputsContainer) {
            phoneInputsContainer.appendChild(phoneInput);
        } else {
            addPhoneBtn.parentNode.insertBefore(phoneInput, addPhoneBtn);
        }
        
        updateMessagePreview();
        
        // Show send button if it exists
        if (sendTextBtn) {
            sendTextBtn.style.display = 'block';
        }
    }

    function updateMessagePreview() {
        const phoneInputs = document.querySelectorAll('.phone-input');
        const count = phoneInputs.length;
        if (messagePreview) {
            messagePreview.textContent = `You're about to send invitations to ${count} contact${count !== 1 ? 's' : ''}.`;
        }
    }

    addPhoneBtn.addEventListener('click', addPhoneInput);

    if (sendTextBtn) {
        sendTextBtn.addEventListener('click', () => {
            const phoneInputs = document.querySelectorAll('.phone-input');
            const phones = Array.from(phoneInputs).map(input => input.value).filter(phone => phone.trim());
            
            if (phones.length === 0) {
                alert('Please add at least one phone number');
                return;
            }

            // Simulate sending
            sendTextBtn.textContent = 'Sending...';
            sendTextBtn.disabled = true;

            setTimeout(() => {
                sendTextBtn.textContent = 'Sent!';
                setTimeout(() => {
                    document.querySelector('.next-step').click();
                }, 1000);
            }, 2000);
        });
    }

    // Initialize with one phone input
    addPhoneInput();
}

function initializeVideoRecording() {
    const videoPreview = document.getElementById('video-preview');
    const recordBtn = document.getElementById('record-btn');
    const stopBtn = document.getElementById('stop-recording');
    const retakeBtn = document.getElementById('retake-video');
    const sendVideoBtn = document.getElementById('send-video-invite');
    const recordingStatus = document.getElementById('recording-status');

    if (!videoPreview || !recordBtn) return;

    let mediaRecorder;
    let recordedChunks = [];
    let stream;

    async function startPoloRecording() {
        console.log('Starting polo recording');
        
        try {
            // First, let's check available devices
            const devices = await navigator.mediaDevices.enumerateDevices();
            const audioDevices = devices.filter(device => device.kind === 'audioinput');
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            
            console.log('Available audio devices:', audioDevices.length);
            audioDevices.forEach((device, index) => {
                console.log(`Audio ${index}:`, device.label || `Device ${device.deviceId.substring(0, 8)}...`);
            });
            
            console.log('Available video devices:', videoDevices.length);
            videoDevices.forEach((device, index) => {
                console.log(`Video ${index}:`, device.label || `Device ${device.deviceId.substring(0, 8)}...`);
            });

            // Request camera access with higher quality for Marco Polo style
            const constraints = { 
                video: { 
                    width: { ideal: 720 },
                    height: { ideal: 1280 },
                    facingMode: 'user'
                }, 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 44100
                }
            };
            
            console.log('Requesting media with constraints:', constraints);
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Check what we actually got
            const audioTracks = stream.getAudioTracks();
            const videoTracks = stream.getVideoTracks();
            
            console.log('Audio tracks received:', audioTracks.length);
            audioTracks.forEach((track, index) => {
                console.log(`Audio track ${index}:`, {
                    label: track.label,
                    enabled: track.enabled,
                    muted: track.muted,
                    readyState: track.readyState,
                    settings: track.getSettings()
                });
            });
            
            console.log('Video tracks received:', videoTracks.length);
            videoTracks.forEach((track, index) => {
                console.log(`Video track ${index}:`, {
                    label: track.label,
                    enabled: track.enabled,
                    muted: track.muted,
                    readyState: track.readyState
                });
            });

            const videoContainer = document.getElementById('video-container');
            const cameraStream_element = document.getElementById('camera-stream');
            
            if (cameraStream_element) {
                cameraStream_element.srcObject = stream;
                cameraStream_element.classList.remove('hidden');
            }

            // Hide placeholder
            const placeholder = document.getElementById('camera-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }

            // Setup media recorder with fallback codec support
            recordedChunks = [];
            let recorderOptions = { mimeType: 'video/webm;codecs=vp8,opus' };
            
            // Check codec support and fallback if needed
            if (!MediaRecorder.isTypeSupported(recorderOptions.mimeType)) {
                console.log('Primary codec not supported, trying fallback');
                recorderOptions = { mimeType: 'video/webm' };
                if (!MediaRecorder.isTypeSupported(recorderOptions.mimeType)) {
                    console.log('WebM not supported, using default');
                    recorderOptions = {};
                }
            }
            
            console.log('Using MediaRecorder with options:', recorderOptions);
            mediaRecorder = new MediaRecorder(stream, recorderOptions);
            
            mediaRecorder.ondataavailable = function(event) {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                    console.log('Recording chunk received, size:', event.data.size);
                }
            };

            mediaRecorder.onstop = function() {
                console.log('Recording stopped, creating blob from', recordedChunks.length, 'chunks');
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                console.log('Created blob, size:', blob.size, 'type:', blob.type);
                recordedVideo = blob;
                showPoloPreview(blob);
            };

            // Start recording
            mediaRecorder.start();

            // Update UI for Marco Polo interface
            document.getElementById('main-record-btn').classList.add('hidden');
            document.getElementById('stop-record-btn').classList.remove('hidden');
            document.getElementById('recording-overlay').classList.remove('hidden');

            // Start timer
            startRecordingTimer();

            // Start audio level monitoring if available
            if (window.audioLevelMonitor) {
                console.log('Starting audio level monitoring for external webcam');
                window.audioLevelMonitor();
            }

        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access camera. Please ensure you have granted camera permissions.');
        }
    }

    function stopPoloRecording() {
        console.log('Stopping polo recording');
        
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        // Update UI for Marco Polo interface
        document.getElementById('main-record-btn').classList.remove('hidden');
        document.getElementById('stop-record-btn').classList.add('hidden');
        document.getElementById('recording-overlay').classList.add('hidden');

        stopRecordingTimer();
    }

    let recordingTimer;
    let recordingSeconds = 0;

    function startRecordingTimer() {
        recordingSeconds = 0;
        const timeDisplay = document.getElementById('recording-time');
        
        recordingTimer = setInterval(() => {
            recordingSeconds++;
            const minutes = Math.floor(recordingSeconds / 60);
            const seconds = recordingSeconds % 60;
            if (timeDisplay) {
                timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    function stopRecordingTimer() {
        if (recordingTimer) {
            clearInterval(recordingTimer);
        }
    }

    function showPoloPreview(videoBlob) {
        console.log('Showing polo preview');
        console.log('Video blob size:', videoBlob.size, 'type:', videoBlob.type);
        
        const videoUrl = URL.createObjectURL(videoBlob);
        const recordedPoloPreview = document.getElementById('recorded-polo-preview');
        
        if (recordedPoloPreview) {
            recordedPoloPreview.src = videoUrl;
            recordedPoloPreview.muted = false; // Ensure audio is not muted
            recordedPoloPreview.volume = 1.0; // Set volume to maximum
            recordedPoloPreview.controls = true; // Ensure controls are visible
            
            console.log('Video element configured: muted =', recordedPoloPreview.muted, 'volume =', recordedPoloPreview.volume);
            
            // Wait for metadata to load, then ensure audio is enabled
            recordedPoloPreview.addEventListener('loadedmetadata', function() {
                console.log('Video metadata loaded');
                console.log('Video duration:', this.duration);
                console.log('Video has audio tracks:', this.webkitAudioDecodedByteCount !== undefined ? this.webkitAudioDecodedByteCount : 'unknown');
                console.log('Video element muted:', this.muted, 'volume:', this.volume);
                this.muted = false;
                this.volume = 1.0;
            });
            
            // Add error handling
            recordedPoloPreview.addEventListener('error', function(e) {
                console.error('Video playback error:', e);
            });
            
            // Try to play with audio after user interaction
            recordedPoloPreview.addEventListener('click', function() {
                this.muted = false;
                this.volume = 1.0;
                console.log('Video clicked, ensuring audio is unmuted');
            });
            
            // Also try when play starts
            recordedPoloPreview.addEventListener('play', function() {
                this.muted = false;
                this.volume = 1.0;
                console.log('Video started playing, audio should be enabled');
            });
        }

        // Move to step 4 (preview step) after recording
        showStep(4);
    }

    function retakePoloRecording() {
        console.log('Retaking polo recording');
        
        const recordingArea = document.querySelector('.recording-area');
        const poloPreview = document.getElementById('polo-preview');
        const placeholder = document.querySelector('.camera-placeholder');
        const cameraStreamElement = document.getElementById('camera-stream');

        if (recordingArea) {
            recordingArea.style.display = 'block';
        }
        
        if (poloPreview) {
            poloPreview.classList.add('hidden');
        }

        if (placeholder) {
            placeholder.style.display = 'block';
        }

        if (cameraStreamElement) {
            cameraStreamElement.classList.add('hidden');
        }

        recordedVideo = null;
        recordedChunks = [];
    }

    function showSharingOptions() {
        console.log('Showing sharing options');
        
        const poloPreview = document.getElementById('polo-preview');
        const sharingOptions = document.getElementById('sharing-options');
        const invitesNextBtn = document.getElementById('invites-next');

        if (poloPreview) {
            poloPreview.style.display = 'none';
        }
        
        if (sharingOptions) {
            sharingOptions.classList.remove('hidden');
        }

        if (invitesNextBtn) {
            invitesNextBtn.classList.remove('hidden');
        }
    }

    function handleSharingMethod(method, buttonElement) {
        console.log('Handling sharing method:', method);
        
        let input;
        let message = '';

        switch (method) {
            case 'email':
                input = document.querySelector('.email-input');
                if (input && input.value) {
                    const emails = input.value.split(',').map(e => e.trim()).filter(e => e);
                    invitesSent += emails.length;
                    message = `Email invitations sent to ${emails.length} recipients!`;
                } else {
                    alert('Please enter at least one email address');
                    return;
                }
                break;
                
            case 'text':
                input = document.querySelector('.phone-input');
                if (input && input.value) {
                    const phones = input.value.split(',').map(p => p.trim()).filter(p => p);
                    invitesSent += phones.length;
                    message = `Text invitations sent to ${phones.length} recipients!`;
                } else {
                    alert('Please enter at least one phone number');
                    return;
                }
                break;
                
            case 'link':
                invitesSent += 1;
                message = 'Invitation link copied to clipboard!';
                // Actually copy to clipboard
                const shareLink = document.querySelector('.share-link');
                if (shareLink) {
                    shareLink.select();
                    document.execCommand('copy');
                }
                break;
        }

        // Show success message on button
        if (buttonElement) {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = 'Sent!';
            buttonElement.style.background = '#34c759';
            
            setTimeout(() => {
                buttonElement.textContent = originalText;
                buttonElement.style.background = '';
            }, 2000);
        }

        // Show notification
        if (message) {
            alert(message);
        }
    }

    // Step 4: Success Screen
    function initializeSuccessScreen() {
        console.log('Initializing success screen');

        // Update final stats
        const finalFeaturesCount = document.getElementById('final-features-count');
        const finalInvitesSent = document.getElementById('final-invites-sent');
        const finalTimeSaved = document.getElementById('final-time-saved');

        if (finalFeaturesCount) {
            finalFeaturesCount.textContent = selectedFeatures.length;
        }
        
        if (finalInvitesSent) {
            finalInvitesSent.textContent = invitesSent;
        }

        if (finalTimeSaved) {
            const timeSaved = Math.max(2, selectedFeatures.length * 1.5);
            finalTimeSaved.textContent = `${Math.round(timeSaved)}hrs`;
        }

        // Success screen buttons
        const sendMoreInvitesBtn = document.querySelector('.success-actions .secondary');
        if (sendMoreInvitesBtn) {
            sendMoreInvitesBtn.addEventListener('click', function() {
                showStep(3);
            });
        }
    }

    function resetOnboarding() {
        console.log('Resetting onboarding');
        
        currentStep = 1;
        selectedFeatures = [];
        recordedVideo = null;
        formData = {};
        invitesSent = 0;
        recordingSeconds = 0;

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }

        if (recordingTimer) {
            clearInterval(recordingTimer);
        }

        // Reset form
        if (accountForm) {
            accountForm.reset();
        }

        // Reset UI elements
        const elementsToReset = [
            '.recording-area',
            '.camera-placeholder',
            '#polo-preview',
            '#sharing-options',
            '#invites-next'
        ];

        elementsToReset.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.display = '';
                element.classList.remove('hidden');
            }
        });

        // Hide specific elements
        const elementsToHide = [
            '#polo-stop-btn',
            '#recording-status',
            '#camera-stream'
        ];

        elementsToHide.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.add('hidden');
            }
        });
    }

    console.log('Onboarding script initialized');
}

// Initialize onboarding and success functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing onboarding...');
    
    // Direct test to see if button exists
    const testBtn = document.getElementById('start-onboarding');
    console.log('Direct button test:', testBtn);
    if (testBtn) {
        console.log('Button found! Adding direct click listener...');
        testBtn.addEventListener('click', () => {
            console.log('DIRECT BUTTON CLICKED!');
        });
    }
    
    // Initialize onboarding
    initializeOnboarding();
    
    // Initialize other components
    initializeProductTour();
    initializeTeamInvitation();
    initializeVideoRecording();
});

// Marco Polo Pro Landing Page Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Marco Polo Pro script loaded');

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
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuButton && mobileNav) {
        mobileMenuButton.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
    }

    // ===== ONBOARDING FLOW =====
    
    // Onboarding variables
    let currentStep = 1;
    let selectedFeatures = [];
    let recordedVideo = null;
    let mediaRecorder = null;
    let recordedChunks = [];
    let cameraStream = null;
    let formData = {};
    let invitesSent = 0;

    // DOM elements
    const modal = document.getElementById('onboarding-modal');
    const startButton = document.getElementById('start-onboarding');
    const closeButton = document.getElementById('close-onboarding');
    const progressFill = document.getElementById('progress-fill');
    const steps = document.querySelectorAll('.onboarding-step');
    const progressSteps = document.querySelectorAll('.progress-steps .step');

    // Initialize onboarding
    if (startButton) {
        startButton.addEventListener('click', openModal);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Modal functions
    function openModal() {
        console.log('Opening onboarding modal');
        if (modal) {
            modal.classList.add('active');
            currentStep = 1;
            showStep(1);
            updateProgress();
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        console.log('Closing onboarding modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            resetOnboarding();
        }
    }

    // Close modal when clicking backdrop
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Step navigation
    function showStep(stepNumber) {
        console.log('Showing step:', stepNumber);
        
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        const currentStepElement = document.getElementById(`step-${stepNumber}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        // Update progress steps
        progressSteps.forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 === stepNumber) {
                step.classList.add('active');
            }
        });
        
        currentStep = stepNumber;
        updateProgress();
    }

    function updateProgress() {
        const progressPercent = (currentStep / 4) * 100;
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }
    }

    // Step 1: Account Creation
    const accountForm = document.getElementById('account-form');
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAccountSubmit();
        });
    }

    // Add event listener to the continue button in step 1
    const step1ContinueBtn = document.querySelector('#step-1 .next-step');
    if (step1ContinueBtn) {
        step1ContinueBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleAccountSubmit();
        });
    }

    function handleAccountSubmit() {
        console.log('Handling account submission');
        
        // Collect form data
        const firstName = document.getElementById('first-name')?.value;
        const lastName = document.getElementById('last-name')?.value;
        const phone = document.getElementById('phone')?.value;
        const email = document.getElementById('email')?.value;
        const companyName = document.getElementById('company-name')?.value;

        // Basic validation
        if (!firstName || !lastName || !phone) {
            alert('Please fill in all required fields (marked with *)');
            return;
        }

        // Store form data
        formData = {
            firstName,
            lastName,
            phone,
            email,
            companyName
        };

        console.log('Form data collected:', formData);
        
        // Move to step 2
        showStep(2);
        initializeFeatureSelection();
    }

    // Step 2: Feature Selection
    function initializeFeatureSelection() {
        console.log('Initializing feature selection');
        
        // Set default selected features (core features)
        selectedFeatures = [
            'speed-controls',
            'background-audio', 
            'unlimited-storage',
            'video-transcripts',
            'photo-voice',
            'scratchpad'
        ];

        // Update UI to show selected features
        updateFeatureSelection();
        updateSavingsCalculator();

        // Add click handlers to feature items
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('click', function() {
                toggleFeature(item);
            });
        });

        // Step 2 continue button
        const step2ContinueBtn = document.querySelector('#step-2 .next-step');
        if (step2ContinueBtn) {
            step2ContinueBtn.addEventListener('click', function() {
                console.log('Selected features:', selectedFeatures);
                showStep(3);
                initializePoloRecording();
            });
        }

        // Step 2 back button
        const step2BackBtn = document.querySelector('#step-2 .prev-step');
        if (step2BackBtn) {
            step2BackBtn.addEventListener('click', function() {
                showStep(1);
            });
        }
    }

    function toggleFeature(featureItem) {
        const featureId = featureItem.getAttribute('data-feature');
        
        if (featureItem.classList.contains('selected')) {
            // Unselect feature
            featureItem.classList.remove('selected');
            selectedFeatures = selectedFeatures.filter(f => f !== featureId);
        } else {
            // Select feature
            featureItem.classList.add('selected');
            selectedFeatures.push(featureId);
        }

        updateSavingsCalculator();
    }

    function updateFeatureSelection() {
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            const featureId = item.getAttribute('data-feature');
            if (selectedFeatures.includes(featureId)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    function updateSavingsCalculator() {
        const featureCount = selectedFeatures.length;
        const timeSaved = Math.max(2, featureCount * 1.5);
        const moneySaved = Math.max(800, featureCount * 400);

        // Format values
        const timeSavedText = `${Math.round(timeSaved)} hours`;
        const moneySavedText = `$${moneySaved.toLocaleString()}`;
        const featuresText = featureCount;

        // Update top benefits summary
        const topTimeSaved = document.getElementById('top-time-saved');
        const topMoneySaved = document.getElementById('top-money-saved');
        const topFeaturesSelected = document.getElementById('top-features-selected');

        if (topTimeSaved) topTimeSaved.textContent = timeSavedText;
        if (topMoneySaved) topMoneySaved.textContent = moneySavedText;
        if (topFeaturesSelected) topFeaturesSelected.textContent = featuresText;

        // Update bottom calculator (existing)
        const timeSavedElement = document.getElementById('time-saved');
        const moneySavedElement = document.getElementById('money-saved');
        const featuresSelectedElement = document.getElementById('features-selected');

        if (timeSavedElement) {
            timeSavedElement.textContent = timeSavedText;
        }
        if (moneySavedElement) {
            moneySavedElement.textContent = moneySavedText;
        }
        if (featuresSelectedElement) {
            featuresSelectedElement.textContent = featuresText;
        }
    }

    // Step 3: Polo Recording
    function initializePoloRecording() {
        console.log('Initializing polo recording');

        // Update sender name in preview
        const senderName = document.getElementById('sender-name');
        if (senderName && formData.firstName && formData.lastName) {
            senderName.textContent = `${formData.firstName} ${formData.lastName}`;
        }

        // Update team name in preview
        const teamName = document.getElementById('team-name');
        if (teamName && formData.companyName) {
            teamName.textContent = formData.companyName;
        }

        // Control buttons functionality
        const controlButtons = document.querySelectorAll('.control-btn');
        controlButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all control buttons
                controlButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update action message based on selected mode
                const actionMessage = document.querySelector('.message-content h4');
                const actionDescription = document.querySelector('.message-content p');
                
                if (actionMessage && actionDescription) {
                    const buttonText = this.textContent.trim();
                    switch(buttonText) {
                        case 'HD':
                            actionMessage.textContent = 'HD Recording';
                            actionDescription.textContent = 'High definition video recording';
                            break;
                        case 'Voice':
                            actionMessage.textContent = 'Voice Recording';
                            actionDescription.textContent = 'Audio-only recording';
                            break;
                        case 'Polo':
                            actionMessage.textContent = 'Record a Polo';
                            actionDescription.textContent = 'Tap the record button to begin';
                            break;
                        case 'Note':
                            actionMessage.textContent = 'Add a Note';
                            actionDescription.textContent = 'Text-based message';
                            break;
                        case 'Photo':
                            actionMessage.textContent = 'Take a Photo';
                            actionDescription.textContent = 'Capture a still image';
                            break;
                        default:
                            actionMessage.textContent = 'Record a Polo';
                            actionDescription.textContent = 'Tap the record button to begin';
                    }
                }
            });
        });

        // Marco Polo recording controls
        const mainRecordBtn = document.getElementById('main-record-btn');
        const stopRecordBtn = document.getElementById('stop-record-btn');
        const poloRetakeBtn = document.getElementById('polo-retake-btn');
        const poloContinueBtn = document.getElementById('polo-continue-btn');

        if (mainRecordBtn) {
            mainRecordBtn.addEventListener('click', startPoloRecording);
        }
        if (stopRecordBtn) {
            stopRecordBtn.addEventListener('click', stopPoloRecording);
        }
        if (poloRetakeBtn) {
            poloRetakeBtn.addEventListener('click', retakePoloRecording);
        }
        if (poloContinueBtn) {
            poloContinueBtn.addEventListener('click', showSharingOptions);
        }

        // Sharing method handlers
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const method = this.closest('.sharing-method').getAttribute('data-method');
                handleSharingMethod(method, this);
            });
        });

        // Copy link button
        const copyBtn = document.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                const linkInput = document.querySelector('.share-link');
                if (linkInput) {
                    linkInput.select();
                    document.execCommand('copy');
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = 'Copy Link';
                    }, 2000);
                }
            });
        }

        // Step 3 navigation
        const step3BackBtn = document.querySelector('#step-3 .prev-step');
        const skipInvitesBtn = document.getElementById('skip-invites');
        const invitesNextBtn = document.getElementById('invites-next');

        if (step3BackBtn) {
            step3BackBtn.addEventListener('click', function() {
                showStep(2);
            });
        }

        if (skipInvitesBtn) {
            skipInvitesBtn.addEventListener('click', function() {
                showStep(4);
                initializeSuccessScreen();
            });
        }

        if (invitesNextBtn) {
            invitesNextBtn.addEventListener('click', function() {
                showStep(4);
                initializeSuccessScreen();
            });
        }
    }

    async function startPoloRecording() {
        console.log('Starting polo recording');
        
        try {
            // First, let's check available devices
            const devices = await navigator.mediaDevices.enumerateDevices();
            const audioDevices = devices.filter(device => device.kind === 'audioinput');
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            
            console.log('Available audio devices:', audioDevices.length);
            audioDevices.forEach((device, index) => {
                console.log(`Audio ${index}:`, device.label || `Device ${device.deviceId.substring(0, 8)}...`);
            });
            
            console.log('Available video devices:', videoDevices.length);
            videoDevices.forEach((device, index) => {
                console.log(`Video ${index}:`, device.label || `Device ${device.deviceId.substring(0, 8)}...`);
            });

            // Request camera access with higher quality for Marco Polo style
            const constraints = { 
                video: { 
                    width: { ideal: 720 },
                    height: { ideal: 1280 },
                    facingMode: 'user'
                }, 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 44100
                }
            };
            
            console.log('Requesting media with constraints:', constraints);
            cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Check what we actually got
            const audioTracks = cameraStream.getAudioTracks();
            const videoTracks = cameraStream.getVideoTracks();
            
            console.log('Audio tracks received:', audioTracks.length);
            audioTracks.forEach((track, index) => {
                console.log(`Audio track ${index}:`, {
                    label: track.label,
                    enabled: track.enabled,
                    muted: track.muted,
                    readyState: track.readyState,
                    settings: track.getSettings()
                });
            });
            
            console.log('Video tracks received:', videoTracks.length);
            videoTracks.forEach((track, index) => {
                console.log(`Video track ${index}:`, {
                    label: track.label,
                    enabled: track.enabled,
                    muted: track.muted,
                    readyState: track.readyState
                });
            });

            const videoContainer = document.getElementById('video-container');
            const cameraStream_element = document.getElementById('camera-stream');
            
            if (cameraStream_element) {
                cameraStream_element.srcObject = cameraStream;
                cameraStream_element.classList.remove('hidden');
            }

            // Hide placeholder
            const placeholder = document.getElementById('camera-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }

            // Setup media recorder with fallback codec support
            recordedChunks = [];
            let recorderOptions = { mimeType: 'video/webm;codecs=vp8,opus' };
            
            // Check codec support and fallback if needed
            if (!MediaRecorder.isTypeSupported(recorderOptions.mimeType)) {
                console.log('Primary codec not supported, trying fallback');
                recorderOptions = { mimeType: 'video/webm' };
                if (!MediaRecorder.isTypeSupported(recorderOptions.mimeType)) {
                    console.log('WebM not supported, using default');
                    recorderOptions = {};
                }
            }
            
            console.log('Using MediaRecorder with options:', recorderOptions);
            mediaRecorder = new MediaRecorder(cameraStream, recorderOptions);
            
            mediaRecorder.ondataavailable = function(event) {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                    console.log('Recording chunk received, size:', event.data.size);
                }
            };

            mediaRecorder.onstop = function() {
                console.log('Recording stopped, creating blob from', recordedChunks.length, 'chunks');
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                console.log('Created blob, size:', blob.size, 'type:', blob.type);
                recordedVideo = blob;
                showPoloPreview(blob);
            };

            // Start recording
            mediaRecorder.start();

            // Update UI for Marco Polo interface
            document.getElementById('main-record-btn').classList.add('hidden');
            document.getElementById('stop-record-btn').classList.remove('hidden');
            document.getElementById('recording-overlay').classList.remove('hidden');

            // Start timer
            startRecordingTimer();

            // Start audio level monitoring if available
            if (window.audioLevelMonitor) {
                console.log('Starting audio level monitoring for external webcam');
                window.audioLevelMonitor();
            }

        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access camera. Please ensure you have granted camera permissions.');
        }
    }

    function stopPoloRecording() {
        console.log('Stopping polo recording');
        
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }

        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }

        // Update UI for Marco Polo interface
        document.getElementById('main-record-btn').classList.remove('hidden');
        document.getElementById('stop-record-btn').classList.add('hidden');
        document.getElementById('recording-overlay').classList.add('hidden');

        stopRecordingTimer();
    }

    let recordingTimer;
    let recordingSeconds = 0;

    function startRecordingTimer() {
        recordingSeconds = 0;
        const timeDisplay = document.getElementById('recording-time');
        
        recordingTimer = setInterval(() => {
            recordingSeconds++;
            const minutes = Math.floor(recordingSeconds / 60);
            const seconds = recordingSeconds % 60;
            if (timeDisplay) {
                timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    function stopRecordingTimer() {
        if (recordingTimer) {
            clearInterval(recordingTimer);
        }
    }

    function showPoloPreview(videoBlob) {
        console.log('Showing polo preview');
        console.log('Video blob size:', videoBlob.size, 'type:', videoBlob.type);
        
        const videoUrl = URL.createObjectURL(videoBlob);
        const recordedPoloPreview = document.getElementById('recorded-polo-preview');
        
        if (recordedPoloPreview) {
            recordedPoloPreview.src = videoUrl;
            recordedPoloPreview.muted = false; // Ensure audio is not muted
            recordedPoloPreview.volume = 1.0; // Set volume to maximum
            recordedPoloPreview.controls = true; // Ensure controls are visible
            
            console.log('Video element configured: muted =', recordedPoloPreview.muted, 'volume =', recordedPoloPreview.volume);
            
            // Wait for metadata to load, then ensure audio is enabled
            recordedPoloPreview.addEventListener('loadedmetadata', function() {
                console.log('Video metadata loaded');
                console.log('Video duration:', this.duration);
                console.log('Video has audio tracks:', this.webkitAudioDecodedByteCount !== undefined ? this.webkitAudioDecodedByteCount : 'unknown');
                console.log('Video element muted:', this.muted, 'volume:', this.volume);
                this.muted = false;
                this.volume = 1.0;
            });
            
            // Add error handling
            recordedPoloPreview.addEventListener('error', function(e) {
                console.error('Video playback error:', e);
            });
            
            // Try to play with audio after user interaction
            recordedPoloPreview.addEventListener('click', function() {
                this.muted = false;
                this.volume = 1.0;
                console.log('Video clicked, ensuring audio is unmuted');
            });
            
            // Also try when play starts
            recordedPoloPreview.addEventListener('play', function() {
                this.muted = false;
                this.volume = 1.0;
                console.log('Video started playing, audio should be enabled');
            });
        }

        // Move to step 4 (preview step) after recording
        showStep(4);
    }

    function retakePoloRecording() {
        console.log('Retaking polo recording');
        
        const recordingArea = document.querySelector('.recording-area');
        const poloPreview = document.getElementById('polo-preview');
        const placeholder = document.querySelector('.camera-placeholder');
        const cameraStreamElement = document.getElementById('camera-stream');

        if (recordingArea) {
            recordingArea.style.display = 'block';
        }
        
        if (poloPreview) {
            poloPreview.classList.add('hidden');
        }

        if (placeholder) {
            placeholder.style.display = 'block';
        }

        if (cameraStreamElement) {
            cameraStreamElement.classList.add('hidden');
        }

        recordedVideo = null;
        recordedChunks = [];
    }

    function showSharingOptions() {
        console.log('Showing sharing options');
        
        const poloPreview = document.getElementById('polo-preview');
        const sharingOptions = document.getElementById('sharing-options');
        const invitesNextBtn = document.getElementById('invites-next');

        if (poloPreview) {
            poloPreview.style.display = 'none';
        }
        
        if (sharingOptions) {
            sharingOptions.classList.remove('hidden');
        }

        if (invitesNextBtn) {
            invitesNextBtn.classList.remove('hidden');
        }
    }

    function handleSharingMethod(method, buttonElement) {
        console.log('Handling sharing method:', method);
        
        let input;
        let message = '';

        switch (method) {
            case 'email':
                input = document.querySelector('.email-input');
                if (input && input.value) {
                    const emails = input.value.split(',').map(e => e.trim()).filter(e => e);
                    invitesSent += emails.length;
                    message = `Email invitations sent to ${emails.length} recipients!`;
                } else {
                    alert('Please enter at least one email address');
                    return;
                }
                break;
                
            case 'text':
                input = document.querySelector('.phone-input');
                if (input && input.value) {
                    const phones = input.value.split(',').map(p => p.trim()).filter(p => p);
                    invitesSent += phones.length;
                    message = `Text invitations sent to ${phones.length} recipients!`;
                } else {
                    alert('Please enter at least one phone number');
                    return;
                }
                break;
                
            case 'link':
                invitesSent += 1;
                message = 'Invitation link copied to clipboard!';
                // Actually copy to clipboard
                const shareLink = document.querySelector('.share-link');
                if (shareLink) {
                    shareLink.select();
                    document.execCommand('copy');
                }
                break;
        }

        // Show success message on button
        if (buttonElement) {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = 'Sent!';
            buttonElement.style.background = '#34c759';
            
            setTimeout(() => {
                buttonElement.textContent = originalText;
                buttonElement.style.background = '';
            }, 2000);
        }

        // Show notification
        if (message) {
            alert(message);
        }
    }

    // Step 4: Success Screen
    function initializeSuccessScreen() {
        console.log('Initializing success screen');

        // Update final stats
        const finalFeaturesCount = document.getElementById('final-features-count');
        const finalInvitesSent = document.getElementById('final-invites-sent');
        const finalTimeSaved = document.getElementById('final-time-saved');

        if (finalFeaturesCount) {
            finalFeaturesCount.textContent = selectedFeatures.length;
        }
        
        if (finalInvitesSent) {
            finalInvitesSent.textContent = invitesSent;
        }

        if (finalTimeSaved) {
            const timeSaved = Math.max(2, selectedFeatures.length * 1.5);
            finalTimeSaved.textContent = `${Math.round(timeSaved)}hrs`;
        }

        // Success screen buttons
        const sendMoreInvitesBtn = document.querySelector('.success-actions .secondary');
        if (sendMoreInvitesBtn) {
            sendMoreInvitesBtn.addEventListener('click', function() {
                showStep(3);
            });
        }
    }

    function resetOnboarding() {
        console.log('Resetting onboarding');
        
        currentStep = 1;
        selectedFeatures = [];
        recordedVideo = null;
        formData = {};
        invitesSent = 0;
        recordingSeconds = 0;

        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }

        if (recordingTimer) {
            clearInterval(recordingTimer);
        }

        // Reset form
        if (accountForm) {
            accountForm.reset();
        }

        // Reset UI elements
        const elementsToReset = [
            '.recording-area',
            '.camera-placeholder',
            '#polo-preview',
            '#sharing-options',
            '#invites-next'
        ];

        elementsToReset.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.display = '';
                element.classList.remove('hidden');
            }
        });

        // Hide specific elements
        const elementsToHide = [
            '#polo-stop-btn',
            '#recording-status',
            '#camera-stream'
        ];

        elementsToHide.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.add('hidden');
            }
        });
    }

    console.log('Onboarding script initialized');
});