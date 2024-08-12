// public/register-sw.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js') // Register the existing Workbox-generated service worker
      .then(function (registration) {
        console.log('Workbox Service Worker registered with scope:', registration.scope);
      })
      .catch(function (err) {
        console.error('Workbox Service Worker registration failed:', err);
      });

    navigator.serviceWorker
      .register('/custom-sw.js') // Register the new custom service worker
      .then(function (registration) {
        console.log('Custom Service Worker registered with scope:', registration.scope);
      })
      .catch(function (err) {
        console.error('Custom Service Worker registration failed:', err);
      });
      navigator.serviceWorker
      .register('/service-worker.js') // Register the new custom service worker
      .then(function (registration) {
        console.log('Custom Service Worker registered with scope:', registration.scope);
      })
      .catch(function (err) {
        console.error('Custom Service Worker registration failed:', err);
      });
  });
}
