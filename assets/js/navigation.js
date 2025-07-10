// Navigation moderne avec GSAP
class ModernNavigation {
  constructor() {
    this.navToggle = document.getElementById('navToggle');
    this.navContainer = document.getElementById('navContainer');
    this.navOverlay = document.getElementById('navOverlay');
    this.siteNav = document.querySelector('.site-nav');
    this.navItems = document.querySelectorAll('.nav-item');
    this.isOpen = false;

    this.init();
  }

  init() {
    // Vérifier si GSAP est disponible
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded, falling back to CSS animations');
      this.initFallback();
      return;
    }

    this.setupEventListeners();
    this.setupGSAPAnimations();
  }

  setupEventListeners() {
    // Toggle navigation
    this.navToggle.addEventListener('click', () => {
      this.toggleNavigation();
    });

    // Fermer avec l'overlay
    this.navOverlay.addEventListener('click', () => {
      this.closeNavigation();
    });

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeNavigation();
      }
    });

    // Fermer au clic sur un lien (mobile)
    this.navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          setTimeout(() => this.closeNavigation(), 100);
        }
      });
    });

    // Gestion du redimensionnement
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeNavigation();
      }
    });
  }

  setupGSAPAnimations() {
    // Timeline pour l'ouverture
    this.openTimeline = gsap.timeline({ paused: true });

    // Animation de l'overlay
    this.openTimeline.to(this.navOverlay, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    // Animation du conteneur - utiliser xPercent pour être sûr
    this.openTimeline.to(this.navContainer, {
      xPercent: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2");

    // Animation des éléments de navigation
    this.openTimeline.to(this.navItems, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3");

    // Timeline pour la fermeture
    this.closeTimeline = gsap.timeline({ paused: true });

    this.closeTimeline.to(this.navItems, {
      opacity: 0,
      x: 30,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.in"
    });

    this.closeTimeline.to(this.navContainer, {
      xPercent: 100,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.1");

    this.closeTimeline.to(this.navOverlay, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    }, "-=0.2");
  }

  toggleNavigation() {
    if (this.isOpen) {
      this.closeNavigation();
    } else {
      this.openNavigation();
    }
  }

  openNavigation() {
    if (this.isOpen) return;

    console.log('Opening navigation...');
    console.log('Nav items found:', this.navItems.length);
    console.log('GSAP available:', typeof gsap !== 'undefined');

    this.isOpen = true;
    this.navToggle.classList.add('active');
    this.siteNav.classList.add('nav-open');

    // Désactiver le scroll du body
    document.body.style.overflow = 'hidden';

    // Lancer l'animation GSAP
    if (this.openTimeline) {
      console.log('Playing open timeline...');
      this.openTimeline.play();
    } else {
      console.log('No open timeline available');
    }
  }

  closeNavigation() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.navToggle.classList.remove('active');
    this.siteNav.classList.remove('nav-open');

    // Réactiver le scroll du body
    document.body.style.overflow = '';

    // Lancer l'animation GSAP
    if (this.closeTimeline) {
      this.closeTimeline.play();
    }
  }

  initFallback() {
    // Fallback sans GSAP - animations CSS uniquement
    this.navToggle.addEventListener('click', () => {
      this.siteNav.classList.toggle('nav-open');
      this.navToggle.classList.toggle('active');
      document.body.style.overflow = this.siteNav.classList.contains('nav-open') ? 'hidden' : '';
    });

    this.navOverlay.addEventListener('click', () => {
      this.siteNav.classList.remove('nav-open');
      this.navToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

// Initialiser la navigation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  new ModernNavigation();
});