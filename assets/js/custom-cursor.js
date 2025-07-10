// Curseur personnalisé et animé
class CustomCursor {
  constructor() {
    this.cursor = null;
    this.trail = null;
    this.isVisible = false;
    this.isHovering = false;
    this.isClicking = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.trailX = 0;
    this.trailY = 0;

    this.init();
  }

  init() {
    // Créer les éléments du curseur
    this.createCursorElements();

    // Ajouter les événements
    this.addEventListeners();

    // Démarrer l'animation
    this.animate();
  }

  createCursorElements() {
    // Créer le curseur principal
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);

    // Créer le trail (traînée)
    this.trail = document.createElement('div');
    this.trail.className = 'cursor-trail';
    document.body.appendChild(this.trail);

    // Garder le curseur de base visible
    document.body.style.cursor = 'default';
  }

    addEventListeners() {
    // Suivre la position de la souris
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (!this.isVisible) {
        this.isVisible = true;
        this.cursor.style.opacity = '1';
        this.trail.style.opacity = '1';
      }
    });

    // Gérer les clics avec effet de ripple
    document.addEventListener('mousedown', (e) => {
      this.isClicking = true;
      this.cursor.classList.add('clicking');

      // Créer un effet de ripple
      this.createRippleEffect(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', () => {
      this.isClicking = false;
      this.cursor.classList.remove('clicking');
    });

    // Gérer les hovers sur les éléments interactifs avec détection de type
    const interactiveElements = document.querySelectorAll('a, button, .works__item, .work__item--image img, .works__nav-button, .hero__title, .hero__role');

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.isHovering = true;
        this.cursor.classList.add('hover');

        // Ajouter une classe spécifique selon le type d'élément
        if (element.classList.contains('works__item')) {
          this.cursor.classList.add('hover-works');
        } else if (element.classList.contains('hero__title') || element.classList.contains('hero__role')) {
          this.cursor.classList.add('hover-hero');
        } else if (element.classList.contains('works__nav-button')) {
          this.cursor.classList.add('hover-nav');
        }
      });

      element.addEventListener('mouseleave', () => {
        this.isHovering = false;
        this.cursor.classList.remove('hover', 'hover-works', 'hover-hero', 'hover-nav');
      });
    });

    // Cacher le curseur quand la souris quitte la fenêtre
    document.addEventListener('mouseleave', () => {
      this.isVisible = false;
      this.cursor.style.opacity = '0';
      this.trail.style.opacity = '0';
    });

    // Gérer le scroll
    let scrollTimeout;
    document.addEventListener('scroll', () => {
      this.cursor.style.opacity = '0';
      this.trail.style.opacity = '0';

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (this.isVisible) {
          this.cursor.style.opacity = '1';
          this.trail.style.opacity = '1';
        }
      }, 100);
    });
  }

        animate() {
    // Animation fluide du curseur principal
    const cursorX = this.lerp(this.cursor.offsetLeft, this.mouseX, 0.2);
    const cursorY = this.lerp(this.cursor.offsetTop, this.mouseY, 0.2);

    this.cursor.style.left = cursorX + 'px';
    this.cursor.style.top = cursorY + 'px';

    // Animation du trail avec délai plus marqué pour un effet de traînée
    const trailX = this.lerp(this.trail.offsetLeft, this.mouseX, 0.1);
    const trailY = this.lerp(this.trail.offsetTop, this.mouseY, 0.1);

    this.trail.style.left = trailX + 'px';
    this.trail.style.top = trailY + 'px';

    // Effet de pulsation douce pour le trail
    const time = Date.now() * 0.001;
    const scale = 1 + Math.sin(time * 2) * 0.1;
    this.trail.style.transform = `translate(-50%, -50%) scale(${scale})`;

    requestAnimationFrame(() => this.animate());
  }

  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

        createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = (x - 15) + 'px';
    ripple.style.top = (y - 15) + 'px';
    ripple.style.width = '30px';
    ripple.style.height = '30px';
    ripple.style.borderRadius = '50%';
    ripple.style.border = '1px solid rgba(0, 0, 0, 0.3)';
    ripple.style.background = 'transparent';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9997';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    document.body.appendChild(ripple);

    // Animer le ripple
    setTimeout(() => {
      ripple.style.transform = 'scale(2.5)';
      ripple.style.opacity = '0';
    }, 10);

    // Nettoyer après l'animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }
}

// Initialiser le curseur quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
});

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
      // Réinitialiser la position si nécessaire
      if (window.innerWidth < 768) {
        // Désactiver le curseur personnalisé sur mobile
        const customCursor = document.querySelector('.custom-cursor');
        const cursorTrail = document.querySelector('.cursor-trail');
        if (customCursor) customCursor.style.display = 'none';
        if (cursorTrail) cursorTrail.style.display = 'none';
        document.body.style.cursor = 'default';
      } else {
        // Réactiver sur desktop
        const customCursor = document.querySelector('.custom-cursor');
        const cursorTrail = document.querySelector('.cursor-trail');
        if (customCursor) customCursor.style.display = 'block';
        if (cursorTrail) cursorTrail.style.display = 'block';
        document.body.style.cursor = 'default';
      }
    });