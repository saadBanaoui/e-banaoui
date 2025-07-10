/**
 * CLS Optimizer - Prevents Cumulative Layout Shift and optimizes LCP
 * This script helps reduce CLS and improve LCP by managing resource loading and reserving space
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCLSOptimizer);
  } else {
    initCLSOptimizer();
  }

  function initCLSOptimizer() {
    // Reserve space for images that don't have dimensions
    reserveImageSpace();

    // Optimize font loading for LCP
    optimizeFontLoading();

    // Prevent layout shift for dynamic content
    preventDynamicLayoutShift();

    // Optimize LCP elements
    optimizeLCPElements();
  }

  function reserveImageSpace() {
    // Find all images without explicit dimensions
    const images = document.querySelectorAll('img:not([width]):not([height])');

    images.forEach(img => {
      // Set default aspect ratio if not specified
      if (!img.style.aspectRatio) {
        img.style.aspectRatio = '1';
      }

      // Add loading placeholder
      if (!img.complete) {
        img.style.backgroundColor = '#f0f0f0';
        img.style.minHeight = '100px';

        img.addEventListener('load', function() {
          this.style.backgroundColor = '';
          this.style.minHeight = '';
        });
      }
    });
  }

  function optimizeFontLoading() {
    // Check if fonts are loaded
    if ('fonts' in document) {
      // Monitor font loading to prevent layout shift and improve LCP
      const fonts = [
        { family: 'Marcellus', weight: '400' },
        { family: 'Source Sans 3', weight: '400' }
      ];

      fonts.forEach(font => {
        document.fonts.load(`${font.weight} 16px "${font.family}"`).then(() => {
          // Font loaded, optimize rendering
          optimizeTextRendering();
        }).catch(() => {
          // Fallback font will be used
        });
      });
    }
  }

  function optimizeTextRendering() {
    // Optimize text rendering for LCP elements
    const lcpElements = document.querySelectorAll('.hero__title, .hero__role, .subtitle');

    lcpElements.forEach(element => {
      element.style.textRendering = 'optimizeSpeed';
      element.style.webkitFontSmoothing = 'antialiased';
      element.style.mozOsxFontSmoothing = 'grayscale';
    });
  }

  function preventDynamicLayoutShift() {
    // Reserve space for elements that might change size
    const heroElements = document.querySelectorAll('.hero__title, .hero__role, .subtitle');

    heroElements.forEach(element => {
      // Ensure minimum height to prevent layout shift
      const computedStyle = window.getComputedStyle(element);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const fontSize = parseFloat(computedStyle.fontSize);

      if (lineHeight === 0 || isNaN(lineHeight)) {
        element.style.minHeight = `${fontSize * 1.2}px`;
      }
    });

    // Prevent layout shift for navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.style.minHeight = '20px';
    });
  }

  function optimizeLCPElements() {
    // Optimize the main LCP element (hero title)
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
      // Add containment for better performance
      heroTitle.style.contain = 'layout style';
      heroTitle.style.willChange = 'transform';

      // Ensure the element is rendered as soon as possible
      heroTitle.style.display = 'block';
      heroTitle.style.visibility = 'visible';
    }

    // Optimize hero role text
    const heroRole = document.querySelector('.hero__role');
    if (heroRole) {
      heroRole.style.willChange = 'transform';
    }

    // Optimize background image loading
    optimizeBackgroundImages();
  }

  // Monitor for dynamic content changes
  if ('MutationObserver' in window && document.body) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          // New elements added, check for layout shift prevention
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const images = node.querySelectorAll('img');
              images.forEach(img => {
                if (!img.complete) {
                  img.style.backgroundColor = '#f0f0f0';
                  img.style.minHeight = '100px';

                  img.addEventListener('load', function() {
                    this.style.backgroundColor = '';
                    this.style.minHeight = '';
                  });
                }
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Optimize background image loading
  function optimizeBackgroundImages() {
    const elementsWithBg = document.querySelectorAll('[style*="background"]');

    elementsWithBg.forEach(element => {
      const style = element.getAttribute('style');
      if (style && style.includes('background-image')) {
        // Add a placeholder background color
        element.style.backgroundColor = '#f0f0f0';

        // Remove placeholder when background is loaded
        const img = new Image();
        const bgUrl = style.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (bgUrl) {
          img.src = bgUrl[1];
          img.onload = function() {
            element.style.backgroundColor = '';
          };
        }
      }
    });
  }

  // Call background optimization
  optimizeBackgroundImages();

})();