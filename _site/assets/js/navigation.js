// Navigation simple avec CSS uniquement
class ModernNavigation {
  constructor() {
    this.navToggle = document.getElementById('navToggle');
    this.navContainer = document.getElementById('navContainer');
    this.navOverlay = document.getElementById('navOverlay');
    this.siteNav = document.querySelector('.site-nav');
    this.navItems = document.querySelectorAll('.nav-item');
    this.isOpen = false;
    this.isMobile = window.innerWidth <= 768;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleResponsive();
  }

  setupEventListeners() {
    // Toggle navigation
    this.navToggle.addEventListener('click', (e) => {
      e.preventDefault();
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
        if (this.isMobile) {
          setTimeout(() => this.closeNavigation(), 100);
        }
      });
    });

    // Gestion du redimensionnement
    window.addEventListener('resize', () => {
      this.handleResponsive();
      if (!this.isMobile && this.isOpen) {
        this.closeNavigation();
      }
    });
  }

  handleResponsive() {
    this.isMobile = window.innerWidth <= 768;

    if (!this.isMobile) {
      // Réinitialiser les styles desktop
      this.siteNav.classList.remove('nav-open');
      this.navToggle.classList.remove('active');
      document.body.style.overflow = '';

      // Supprimer tous les styles inline
      this.navContainer.style.transform = '';
      this.navContainer.style.opacity = '';
      this.navOverlay.style.opacity = '';
      this.navItems.forEach(item => {
        item.style.opacity = '';
        item.style.transform = '';
      });
    }
  }

  toggleNavigation() {
    if (!this.isMobile) return;

    if (this.isOpen) {
      this.closeNavigation();
    } else {
      this.openNavigation();
    }
  }

  openNavigation() {
    if (!this.isMobile || this.isOpen) return;

    this.isOpen = true;
    this.navToggle.classList.add('active');
    this.siteNav.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
  }

  closeNavigation() {
    if (!this.isMobile || !this.isOpen) return;

    this.isOpen = false;
    this.navToggle.classList.remove('active');
    this.siteNav.classList.remove('nav-open');
    document.body.style.overflow = '';
  }
}

// Initialiser la navigation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  new ModernNavigation();
});