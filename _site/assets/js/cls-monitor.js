/**
 * CLS Monitor - Real-time Cumulative Layout Shift measurement
 * This script helps monitor and measure CLS during development
 */

(function() {
  'use strict';

  // Only run in development
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return;
  }

  let clsValue = 0;
  let clsEntries = [];
  let sessionEntries = [];
  let sessionValue = 0;

  // Create observer for layout shifts
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);

        // Log CLS events in development
        console.log('CLS Event:', {
          value: entry.value,
          total: clsValue,
          element: entry.sources?.[0]?.node || 'unknown',
          timestamp: new Date().toISOString()
        });
      }
    }
  });

  // Start observing
  try {
    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.warn('PerformanceObserver not supported');
  }

  // Log CLS value periodically
  setInterval(() => {
    if (clsValue > 0) {
      console.log('Current CLS:', clsValue.toFixed(3));

      // Show warning if CLS is high
      if (clsValue > 0.1) {
        console.warn('⚠️ High CLS detected:', clsValue.toFixed(3));
      }
    }
  }, 5000);

  // Add visual indicator
  function createCLSIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'cls-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #333;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      opacity: 0.8;
    `;
    document.body.appendChild(indicator);
    return indicator;
  }

  // Update indicator
  function updateIndicator() {
    let indicator = document.getElementById('cls-indicator');
    if (!indicator) {
      indicator = createCLSIndicator();
    }

    const color = clsValue > 0.1 ? '#ff4444' : clsValue > 0.05 ? '#ffaa00' : '#44ff44';
    indicator.style.background = color;
    indicator.textContent = `CLS: ${clsValue.toFixed(3)}`;
  }

  // Update indicator every second
  setInterval(updateIndicator, 1000);

  // Log final CLS on page unload
  window.addEventListener('beforeunload', () => {
    console.log('Final CLS:', clsValue.toFixed(3));
  });

  // Export for debugging
  window.CLSMonitor = {
    getValue: () => clsValue,
    getEntries: () => clsEntries,
    reset: () => {
      clsValue = 0;
      clsEntries = [];
    }
  };

})();