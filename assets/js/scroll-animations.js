// GSAP Scroll Animations for Home Page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Scroll animations script loaded');

    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded');
        return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        console.log('Reduced motion preferred, animations disabled');
        return;
    }

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    console.log('GSAP and ScrollTrigger registered');

    // Set default ScrollTrigger settings for better performance
    ScrollTrigger.defaults({
        markers: false,
        toggleActions: "play none none reverse"
    });

    // Check if elements exist
    const hero = document.querySelector('.hero');
    const services = document.querySelector('.services');
    const works = document.querySelector('.works');

    console.log('Elements found:', {
        hero: !!hero,
        services: !!services,
        works: !!works
    });

    // Hero section animation with enhanced timing
    gsap.fromTo('.hero',
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.hero',
                start: "top 85%",
                end: "bottom 15%"
            }
        }
    );

    // Hero content staggered animation with more sophisticated timing
    const heroElements = gsap.utils.toArray('.hero__role, .hero__title, .subtitle, .hero__button');
    gsap.fromTo(heroElements,
        {
            opacity: 0,
            y: 40,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.25,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.hero',
                start: "top 80%",
                end: "bottom 20%"
            }
        }
    );

    // Services section animation with enhanced effects
    gsap.fromTo('.services',
        {
            opacity: 0,
            y: 60,
            scale: 0.98
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.services',
                start: "top 80%",
                end: "bottom 20%"
            }
        }
    );

    // Services items staggered animation with rotation effect
    const serviceItems = gsap.utils.toArray('.services__item');
    gsap.fromTo(serviceItems,
        {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotationY: 15
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.services',
                start: "top 70%",
                end: "bottom 20%"
            }
        }
    );

    // Works section animation with slide effect
    gsap.fromTo('.works',
        {
            opacity: 0,
            y: 60,
            scale: 0.98
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.works',
                start: "top 80%",
                end: "bottom 20%"
            }
        }
    );

    // Works header animation with slide from left
    gsap.fromTo('.works__header',
        {
            opacity: 0,
            x: -50,
            y: 30
        },
        {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.works',
                start: "top 80%",
                end: "bottom 20%"
            }
        }
    );

    // Works items staggered animation with 3D effect
    const workItems = gsap.utils.toArray('.works__item');
    gsap.fromTo(workItems,
        {
            opacity: 0,
            y: 60,
            scale: 0.85,
            rotationX: 10
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.1,
            stagger: 0.25,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.works',
                start: "top 70%",
                end: "bottom 20%"
            }
        }
    );

    // Blog posts section animation with enhanced timing
    gsap.fromTo('.post-list',
        {
            opacity: 0,
            y: 50,
            scale: 0.98
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.post-list',
                start: "top 80%",
                end: "bottom 20%"
            }
        }
    );

    // Blog posts items staggered animation with slide effect
    const postItems = gsap.utils.toArray('.post-item');
    gsap.fromTo(postItems,
        {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotationY: 5
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.post-list',
                start: "top 70%",
                end: "bottom 20%"
            }
        }
    );

    // Enhanced section animations with individual timing
    const sections = gsap.utils.toArray('section');
    sections.forEach((section, index) => {
        gsap.fromTo(section,
            {
                opacity: 0,
                y: 40,
                scale: 0.98
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    end: "bottom 15%"
                }
            }
        );
    });

    // Subtle parallax effect for main sections
    gsap.utils.toArray('.hero, .services, .works').forEach(section => {
        gsap.to(section, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // Add floating animation to service icons
    gsap.utils.toArray('.services__item-icon').forEach(icon => {
        gsap.to(icon, {
            y: -10,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
    });

    // Add hover effects for interactive elements
    gsap.utils.toArray('.services__item, .works__item, .post-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Performance optimization: Refresh ScrollTrigger on resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });

    // Cleanup function for better memory management
    window.addEventListener('beforeunload', () => {
        ScrollTrigger.killAll();
    });
});