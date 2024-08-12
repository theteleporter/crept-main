
// public/sw.js

// Cache name (change as needed)
const CACHE_NAME = "offline-cache";

// List of files to cache (including your TSX route and its dependencies)
const urlsToCache = [
  "/offline", // Example TSX route
  // Add any CSS, JavaScript, images, etc. needed for your offline page
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // Forces the waiting service worker to become active
  );
});
  // If offline, return cached response or offline page
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        if (event.request.mode === "navigate") {
          return caches.open(CACHE_NAME).then((cache) => {
            return cache.match("/offline").then((response) => {
              return response || fetch(event.request);
            });
          });
        }
        // For other resources, try fetching from the network first
        return fetch(event.request).catch(() => {
          // If network request fails, return the offline page if available
          return caches.match("/_next/static/chunks/pages/offline.tsx");
        });
      })
    );
  });

// Optional: Activate event to clean up old caches
self.addEventListener("activate", (event) => {
  // ... (code to delete old caches)
});