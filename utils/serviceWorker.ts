export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
  
            // Check if Badge API is supported
            if ('setAppBadge' in registration) {
              console.log('Badge API is supported');
            } else {
              console.warn('Badge API not supported in this browser.');
            }
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }
  