// =============================================
// SpineAI — GSAP Animation Engine
// Cinematic scrollytelling for posture health
// =============================================

// =============================================
// Google Sheets Integration Config
// Replace this URL with your deployed Google Apps Script Web App URL
// See instructions in google_sheets_setup.md
// =============================================
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyMhSpK8nTbM62JFWbvr29FP_yA4jCL5O2ZigYROi9XOjlvyTTnyi7BdCqh4xa-m_A/exec';

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    initLoader();
    initCustomCursor();
    initHeroAnimations();
    initHorizontalScroll();
    initScrollReveal();
    initCounterAnimations();
    initMagneticEffects();
    initDemoVideoScrollControl();
    initDemoVideoCurveAnimation();
    initTravelersPathAnimation();
    initReviewsSection();
});

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

// ------- Page Loader -------
function initLoader() {
    const loader = document.getElementById('pageLoader');
    const fill = document.querySelector('.loader-bar-fill');

    if (fill) fill.style.width = '100%';

    setTimeout(() => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                loader.style.display = 'none';
                startHeroEntrance();
                ScrollTrigger.refresh();
            }
        });
    }, 1000);
}

// ------- Custom Cursor -------
function initCustomCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3" });

    window.addEventListener('mousemove', (e) => {
        xToDot(e.clientX);
        yToDot(e.clientY);
        xToRing(e.clientX);
        yToRing(e.clientY);
    });

    document.querySelectorAll('a, button, .faq-question, .product-feature, .tech-card, .pricing-card').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('active'));
        el.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });
}

// ------- Hero Entrance & Parallax -------
function startHeroEntrance() {
    const tl = gsap.timeline();
    tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 })
        .to('.hero-title .line', { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }, "-=0.4")
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to('.hero-stats', { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
}

function initHeroAnimations() {
    // Parallax
    gsap.to('.hero-bg', {
        y: 200,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to('.hero-content', {
        opacity: 0,
        y: 100,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "10% top",
            end: "bottom center",
            scrub: true
        }
    });
}

// ------- Horizontal Scroll Gallery -------
function initHorizontalScroll() {
    const wrapper = document.getElementById('horizontalWrapper');
    if (!wrapper) return;

    const sections = gsap.utils.toArray('.horizontal-panel');

    gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal-section",
            pin: true,
            scrub: true,
            snap: {
                snapTo: 1 / (sections.length - 1),
                duration: { min: 0.1, max: 0.3 },
                delay: 0.05,
                ease: "power1.inOut"
            },
            start: "top top",
            end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
            anticipatePin: 1
        }
    });
}

// ------- Scroll Reveals -------
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    reveals.forEach(el => {
        let x = 0, y = 15, scale = 1;
        if (el.classList.contains('reveal-left')) x = -25;
        if (el.classList.contains('reveal-right')) x = 25;
        if (el.classList.contains('reveal-scale')) { scale = 0.95; y = 0; }

        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            x: x,
            y: y,
            scale: scale,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    });
}

// ------- Counter Animations -------
function initCounterAnimations() {
    const counters = document.querySelectorAll('.hero-stat-number, .problem-stat-value');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || counter.innerText.replace(/[^0-9]/g, ''));
        const prefix = counter.innerText.includes('₹') ? '₹' : '';
        const suffix = counter.innerText.includes('%') ? '%' : (counter.innerText.includes('s') ? 's' : '');

        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: "power3.out",
                    onUpdate: () => {
                        if (prefix === '₹') {
                            counter.innerText = prefix + Math.floor(obj.val).toLocaleString('en-IN') + suffix;
                        } else {
                            counter.innerText = Math.floor(obj.val) + suffix;
                        }
                    }
                });
            }
        });
    });
}

// ------- Magnetic Effects -------
function initMagneticEffects() {
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .form-submit, .pricing-card.featured');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                rotateX: -y * 0.1,
                rotateY: x * 0.1,
                duration: 0.6,
                ease: "power2.out"
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// ------- Navigation Toggle -------
function toggleMobile() {
    const nav = document.getElementById('navLinks');
    const toggle = document.getElementById('mobileToggle');
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
}

// ------- Modal Handling -------
function openBooking() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    gsap.from('.booking-form-container', {
        y: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power4.out"
    });
}

function closeBooking() {
    const modal = document.getElementById('bookingModal');
    gsap.to('.booking-form-container', {
        y: 50,
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
            modal.classList.remove('active');
            gsap.set('.booking-form-container', { y: 0, opacity: 1 });
            
            // Remove success-active class from container
            const container = document.querySelector('.booking-form-container');
            if (container) container.classList.remove('success-active');
            
            // Reset screens back to form state
            const formScreen = document.getElementById('bookingFormScreen');
            const successScreen = document.getElementById('bookingSuccessScreen');
            if (formScreen) formScreen.style.display = 'block';
            if (successScreen) successScreen.style.display = 'none';
        }
    });
}

// Close on backdrop
document.getElementById('bookingModal').addEventListener('click', (e) => {
    if (e.target.id === 'bookingModal') closeBooking();
});

// ------- Form Handling -------
function handleBooking(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;

    // Collect form data
    const formData = new FormData(e.target);
    const bookingData = {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        source: window.location.href
    };

    btn.disabled = true;
    btn.innerText = "Securing Your Spot...";

    // Send data to Google Sheets via Apps Script Web App
    if (GOOGLE_SHEETS_WEB_APP_URL && GOOGLE_SHEETS_WEB_APP_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        fetch(GOOGLE_SHEETS_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
        .then(() => {
            console.log('✅ Booking data sent to Google Sheets successfully');
        })
        .catch((error) => {
            console.error('❌ Failed to send booking data to Google Sheets:', error);
        });
    } else {
        console.warn('⚠️ Google Sheets Web App URL not configured. Set GOOGLE_SHEETS_WEB_APP_URL in script.js');
    }

    setTimeout(() => {
        const formScreen = document.getElementById('bookingFormScreen');
        const successScreen = document.getElementById('bookingSuccessScreen');
        const container = document.querySelector('.booking-form-container');
        
        if (formScreen && successScreen) {
            // Fade out form screen
            gsap.to(formScreen, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                onComplete: () => {
                    formScreen.style.display = 'none';
                    gsap.set(formScreen, { opacity: 1, y: 0 }); // reset for next open
                    
                    // Add success background theme
                    if (container) container.classList.add('success-active');
                    
                    // Show success screen
                    successScreen.style.display = 'block';
                    gsap.fromTo(successScreen,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                    );
                    
                    // Bounce success icon
                    gsap.fromTo('.success-icon-bounce',
                        { scale: 0, rotation: -45 },
                        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)", delay: 0.1 }
                    );
                    
                    // Reset original button state
                    btn.innerText = originalText;
                    btn.disabled = false;
                    e.target.reset();
                }
            });
        } else {
            // Fallback if elements don't exist
            btn.innerText = "✓ Success! Our team will call you soon";
            setTimeout(() => {
                closeBooking();
                e.target.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 3000);
        }
    }, 1200);
}

// ------- FAQ Handling -------
function toggleFaq(el) {
    const item = el.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
}

// ------- Demo Video Scroll Control -------
function initDemoVideoScrollControl() {
    const videos = document.querySelectorAll('.demo-video');
    if (videos.length === 0) return;

    ScrollTrigger.create({
        trigger: ".demo-video-section",
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
            videos.forEach(v => v.play().catch(err => console.log("Autoplay prevented:", err)));
        },
        onLeave: () => {
            videos.forEach(v => v.pause());
        },
        onEnterBack: () => {
            videos.forEach(v => v.play().catch(err => console.log("Autoplay prevented:", err)));
        },
        onLeaveBack: () => {
            videos.forEach(v => v.pause());
        }
    });
}

// ------- Demo Video S-Curve Animation -------
function initDemoVideoCurveAnimation() {
    const drawPath = document.querySelector('.demo-svg-path-bg .draw-path');
    if (!drawPath) return;

    const pathLength = drawPath.getTotalLength();
    
    gsap.set(drawPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
    });

    gsap.to(drawPath, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".demo-video-container",
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1.0
        }
    });
}

// ------- Travelers Path scrollytelling -------
function initTravelersPathAnimation() {
    const path = document.querySelector('.demo-svg-path-bg .draw-path');
    const travelers = document.querySelector('.path-travelers-group');
    const container = document.querySelector('.demo-video-container');

    if (!path || !travelers || !container) return;

    const pathLength = path.getTotalLength();
    const totalFrames = 60;

    // Preload WebP sequence to guarantee smooth, zero-flicker scrolling
    const preloadedImages = [];
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `frames/frame_${String(i).padStart(3, '0')}.webp`;
        preloadedImages.push(img);
    }

    ScrollTrigger.create({
        trigger: ".demo-video-container",
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1.0,
        onUpdate: (self) => {
            const progress = self.progress;
            
            // Compute coordinate points along the SVG path based on scroll progress
            const point = path.getPointAtLength(progress * pathLength);
            
            // Map SVG viewBox coords (1000 x 2100) to actual container pixels
            const containerW = container.offsetWidth;
            const containerH = container.offsetHeight;
            
            const actualX = point.x * (containerW / 1000);
            const actualY = point.y * (containerH / 2100);
            
            // Translate the travelers group along the path
            gsap.set(travelers, {
                x: actualX,
                y: actualY
            });
            
            const travelerImg = document.getElementById('posture-traveler-img');
            const ageLabel = document.getElementById('posture-traveler-age');
            
            // Calculate frame index (1 to 60) based on scroll progress
            const frameIndex = Math.min(totalFrames, Math.max(1, Math.floor(progress * totalFrames) + 1));
            
            // Update the traveler image source
            if (travelerImg) {
                travelerImg.src = `frames/frame_${String(frameIndex).padStart(3, '0')}.webp`;
            }
            
            // Interpolate age (Age 27 to 48 for frames 1-30, and Age 48 to 68 for frames 31-60)
            let age = 27;
            if (frameIndex <= 30) {
                age = Math.round(27 + (48 - 27) * (frameIndex - 1) / 29);
            } else {
                age = Math.round(48 + (68 - 48) * (frameIndex - 31) / 29);
            }
            
            if (ageLabel) {
                ageLabel.innerText = `Age ${age}`;
            }
            
            // Dynamic premium movement sway & organic float walk
            const sway = Math.sin(progress * 50) * 8; // subtle tilt angle
            const bounce = Math.abs(Math.sin(progress * 70)) * 6; // soft vertical walking bounce
            
            if (travelerImg) {
                gsap.set(travelerImg, {
                    rotation: sway,
                    y: -bounce
                });
            }
        }
    });
}

// ------- Reviews Section Stacked Card Interactions -------
function initReviewsSection() {
    const deck = document.getElementById('reviewsCardDeck');
    const dragLabel = document.getElementById('cursorDragLabel');
    if (!deck) return;

    const cards = gsap.utils.toArray('.review-card');
    const tags = gsap.utils.toArray('.reviews-tag-item');
    const totalCards = cards.length;
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let dragX = 0;
    let dragY = 0;
    let autoTimer = null;
    const autoInterval = 4000; // Auto swipe every 4s

    // Set up cursor drag label position tracker
    if (dragLabel) {
        window.addEventListener('mousemove', (e) => {
            gsap.set(dragLabel, {
                x: e.clientX,
                y: e.clientY
            });
        });

        deck.addEventListener('mouseenter', () => {
            dragLabel.classList.add('active');
            gsap.to(['#cursorDot', '#cursorRing'], { scale: 0, opacity: 0, duration: 0.2 });
        });

        deck.addEventListener('mouseleave', () => {
            if (!isDragging) {
                dragLabel.classList.remove('active');
                gsap.to(['#cursorDot', '#cursorRing'], { scale: 1, opacity: 1, duration: 0.2 });
            }
        });
    }

    // Set up card stacks positioning
    function arrangeCards(animated = true) {
        cards.forEach((card, idx) => {
            // Relative position in stack: 0 is top, 1 is next, etc.
            const stackPos = (idx - currentIndex + totalCards) % totalCards;
            
            let targetX = 0;
            let targetY = 0;
            let targetScale = 1;
            let targetRotation = 0;
            let targetOpacity = 1;
            let targetZIndex = totalCards - stackPos;
            let pointerEvents = "none";

            if (stackPos === 0) {
                // Top card
                targetX = 0;
                targetY = 0;
                targetScale = 1;
                targetRotation = 0;
                targetOpacity = 1;
                pointerEvents = "auto";
                card.classList.add('active-card');
            } else if (stackPos === 1) {
                // Second card
                targetX = 12;
                targetY = -10;
                targetScale = 0.96;
                targetRotation = 4;
                targetOpacity = 0.95;
                card.classList.remove('active-card');
            } else if (stackPos === 2) {
                // Third card
                targetX = -10;
                targetY = 15;
                targetScale = 0.92;
                targetRotation = -6;
                targetOpacity = 0.9;
                card.classList.remove('active-card');
            } else if (stackPos === 3) {
                // Fourth card
                targetX = 18;
                targetY = 5;
                targetScale = 0.88;
                targetRotation = 8;
                targetOpacity = 0.85;
                card.classList.remove('active-card');
            } else {
                // Out of stack view
                targetX = 30;
                targetY = 30;
                targetScale = 0.8;
                targetRotation = 12;
                targetOpacity = 0;
                card.classList.remove('active-card');
            }

            // Apply card styling and classes
            card.style.pointerEvents = pointerEvents;

            if (animated) {
                gsap.to(card, {
                    x: targetX,
                    y: targetY,
                    scale: targetScale,
                    rotation: targetRotation,
                    opacity: targetOpacity,
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: "auto",
                    onStart: () => {
                        card.style.zIndex = targetZIndex;
                    }
                });
            } else {
                gsap.set(card, {
                    x: targetX,
                    y: targetY,
                    scale: targetScale,
                    rotation: targetRotation,
                    opacity: targetOpacity,
                    zIndex: targetZIndex
                });
            }
        });

        // Update right side tag benefits
        tags.forEach((tag, idx) => {
            if (idx === currentIndex) {
                tag.classList.add('active');
            } else {
                tag.classList.remove('active');
            }
        });
    }

    // Auto Transition
    function startAutoTimer() {
        stopAutoTimer();
        autoTimer = setInterval(() => {
            swipeTopCard(true); // Swipe right automatically
        }, autoInterval);
    }

    function stopAutoTimer() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    function swipeTopCard(swipeRight = true) {
        const activeCard = cards[currentIndex];
        const flyX = swipeRight ? 420 : -420;
        const flyRotation = swipeRight ? 35 : -35;

        stopAutoTimer();

        // Animate top card swiping away
        gsap.to(activeCard, {
            x: flyX,
            y: 50,
            rotation: flyRotation,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                // Increment currentIndex to reveal next card
                currentIndex = (currentIndex + 1) % totalCards;
                // Rearrange stack (swiped card goes to bottom)
                arrangeCards(true);
                startAutoTimer();
            }
        });
    }

    // Drag / Swipe Gestures on Active Card
    cards.forEach((card) => {
        card.addEventListener('mousedown', startDrag);
        card.addEventListener('touchstart', startDrag, { passive: true });
    });

    function startDrag(e) {
        const activeCard = cards[currentIndex];
        // Only allow dragging on the top active card
        if (this !== activeCard) return;

        isDragging = true;
        stopAutoTimer();

        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        dragX = 0;
        dragY = 0;

        activeCard.classList.add('dragging');

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
        document.addEventListener('mouseleave', endDrag);
    }

    function drag(e) {
        if (!isDragging) return;

        const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const currentY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        dragX = currentX - startX;
        dragY = currentY - startY;

        // Prevent window scrolling on touch
        if (e.type.includes('touch')) {
            e.preventDefault();
        }

        const activeCard = cards[currentIndex];
        // Follow cursor with scaling rotation based on drag distance
        gsap.set(activeCard, {
            x: dragX,
            y: dragY,
            rotation: dragX * 0.08,
            overwrite: "auto"
        });
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;

        const activeCard = cards[currentIndex];
        activeCard.classList.remove('dragging');

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
        document.removeEventListener('mouseleave', endDrag);

        // Threshold of 110px to trigger swipe transition
        if (Math.abs(dragX) > 110) {
            const swipeRight = dragX > 0;
            const flyX = swipeRight ? 450 : -450;
            const flyRotation = swipeRight ? 40 : -40;

            gsap.to(activeCard, {
                x: flyX,
                y: dragY + (dragY > 0 ? 50 : -50),
                rotation: flyRotation,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    currentIndex = (currentIndex + 1) % totalCards;
                    arrangeCards(true);
                    startAutoTimer();
                }
            });
        } else {
            // Snap back if threshold not met
            gsap.to(activeCard, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.65)",
                onComplete: () => {
                    startAutoTimer();
                }
            });
        }
    }

    // Right tags category clicks
    tags.forEach((tag) => {
        tag.addEventListener('click', function() {
            const targetIndex = parseInt(this.getAttribute('data-index'));
            if (targetIndex === currentIndex) return;

            stopAutoTimer();
            const activeCard = cards[currentIndex];
            
            // Slide current top card out to the left
            gsap.to(activeCard, {
                x: -400,
                y: 20,
                rotation: -30,
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => {
                    currentIndex = targetIndex;
                    arrangeCards(true);
                    
                    // Animate the new top card sliding in from the right
                    const newActiveCard = cards[currentIndex];
                    gsap.fromTo(newActiveCard, 
                        { x: 400, y: -20, rotation: 30, opacity: 0 },
                        { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                    );
                    
                    startAutoTimer();
                }
            });
        });
    });

    // Initialize Card Layout and Timer
    arrangeCards(false);
    startAutoTimer();
}

// Expose functions globally for HTML inline event handlers (Vite ESM compatibility)
window.openBooking = openBooking;
window.closeBooking = closeBooking;
window.handleBooking = handleBooking;
window.toggleFaq = toggleFaq;
window.toggleMobile = toggleMobile;


