/**
 * LCP Monitor - Monitors Largest Contentful Paint performance
 * This script helps identify and optimize LCP elements
 */

(function() {
  'use strict';

  // Check if PerformanceObserver is supported
  if (!('PerformanceObserver' in window)) {
    console.warn('PerformanceObserver not supported, LCP monitoring disabled');
    return;
  }

  let lcpElement = null;
  let lcpValue = 0;

  // Create performance observer for LCP
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    // Update LCP value
    lcpValue = lastEntry.startTime;
    lcpElement = lastEntry.element;

    // Log LCP information
    console.log('LCP detected:', {
      value: lcpValue,
      element: lcpElement,
      tagName: lcpElement?.tagName,
      className: lcpElement?.className,
      id: lcpElement?.id,
      src: lcpElement?.src,
      textContent: lcpElement?.textContent?.substring(0, 50)
    });

    // Add visual indicator for LCP element
    if (lcpElement) {
      highlightLCPElement(lcpElement);
    }

    // Log performance metrics
    logPerformanceMetrics();
  });

  // Start observing LCP
  observer.observe({ entryTypes: ['largest-contentful-paint'] });

  function highlightLCPElement(element) {
    // Remove previous highlights
    document.querySelectorAll('.lcp-highlight').forEach(el => {
      el.classList.remove('lcp-highlight');
    });

    // Add highlight to current LCP element
    element.classList.add('lcp-highlight');

    // Add CSS for highlighting
    if (!document.getElementById('lcp-highlight-style')) {
      const style = document.createElement('style');
      style.id = 'lcp-highlight-style';
      style.textContent = `
        .lcp-highlight {
          outline: 3px solid #ff6b6b !important;
          outline-offset: 2px !important;
          position: relative !important;
        }
        .lcp-highlight::after {
          content: 'LCP Element' !important;
          position: absolute !important;
          top: -25px !important;
          left: 0 !important;
          background: #ff6b6b !important;
          color: white !important;
          padding: 2px 6px !important;
          font-size: 12px !important;
          border-radius: 3px !important;
          z-index: 1000 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  function logPerformanceMetrics() {
    // Get other performance metrics
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');

    const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
    const lcp = paint.find(entry => entry.name === 'largest-contentful-paint');

    console.group('Performance Metrics');
    console.log('LCP:', lcpValue + 'ms');
    console.log('FCP:', fcp?.startTime + 'ms');
    console.log('DOM Content Loaded:', navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart + 'ms');
    console.log('Load Complete:', navigation?.loadEventEnd - navigation?.loadEventStart + 'ms');
    console.groupEnd();
  }

  // Monitor for LCP changes
  let lcpUpdateCount = 0;
  const maxLCPUpdates = 3;

  // Listen for LCP updates
  document.addEventListener('DOMContentLoaded', () => {
    // Check for LCP after a short delay
    setTimeout(() => {
      if (lcpElement) {
        console.log('Initial LCP element identified:', lcpElement);
      }
    }, 1000);
  });

  // Clean up highlights after 5 seconds
  setTimeout(() => {
    document.querySelectorAll('.lcp-highlight').forEach(el => {
      el.classList.remove('lcp-highlight');
    });
  }, 5000);

})();