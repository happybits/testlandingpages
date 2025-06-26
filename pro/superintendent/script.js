console.log('Script loaded successfully!');

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

// Testimonials Auto-scroll
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const indicators = document.querySelectorAll('.indicator');

// Only proceed if testimonials exist
if (testimonialsTrack && testimonialCards.length > 0) {
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
}

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
        if (progressFill) {
            let progress;
            if (step === 'success') {
                progress = 100;
            } else {
                progress = (step / 3) * 100;
            }
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressSteps) {
            progressSteps.forEach((stepEl, index) => {
                if (step === 'success') {
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
            
            if (currentStep < 3) {
                showStep(currentStep + 1);
            } else if (currentStep === 3) {
                // Show success step
                showStep('success');
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

    async function startRecording() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true 
            });
            
            videoPreview.srcObject = stream;
            videoPreview.play();

            mediaRecorder = new MediaRecorder(stream);
            recordedChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                showVideoPreview(url);
            };

            mediaRecorder.start();
            
            recordBtn.style.display = 'none';
            stopBtn.style.display = 'inline-block';
            recordingStatus.textContent = 'Recording...';

        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access camera. Please ensure you have granted camera permissions.');
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }
        
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        stopBtn.style.display = 'none';
        recordingStatus.textContent = 'Recording complete';
    }

    function showVideoPreview(url) {
        videoPreview.srcObject = null;
        videoPreview.src = url;
        videoPreview.controls = true;
        retakeBtn.style.display = 'inline-block';
        sendVideoBtn.style.display = 'inline-block';
    }

    function resetRecording() {
        videoPreview.src = '';
        videoPreview.controls = false;
        recordBtn.style.display = 'inline-block';
        retakeBtn.style.display = 'none';
        sendVideoBtn.style.display = 'none';
        recordingStatus.textContent = '';
    }

    function sendVideoInvite() {
        sendVideoBtn.textContent = 'Sending...';
        sendVideoBtn.disabled = true;

        setTimeout(() => {
            sendVideoBtn.textContent = 'Sent!';
            setTimeout(() => {
                document.querySelector('.next-step').click();
            }, 1000);
        }, 2000);
    }

    recordBtn.addEventListener('click', startRecording);
    stopBtn.addEventListener('click', stopRecording);
    retakeBtn.addEventListener('click', resetRecording);
    sendVideoBtn.addEventListener('click', sendVideoInvite);
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