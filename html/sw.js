const CACHE_NAME = "game-edukasi-v1.0"; // Ganti versi setiap kali ada perubahan besar
const FILES_TO_CACHE = [
  "/",
  "/halaman-utama.html",
  "/login.html",
  "/petunjuk.html",
  "/pelajari-materi.html",
  "/cara-bermain.html",
  "/profil.html",
  "/level-mudah.html",
  "/level-sedang.html",
  "/level-sulit.html",
  "/level-petualangan.html",
  "/asset/image/favicon_game.png",
  "/asset/sound/mouse-click.wav",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Fetch Handler
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/halaman-utama.html");
          }
        })
      );
    })
  );
});

// Pesan dari halaman
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    self.skipWaiting();
  }
});
