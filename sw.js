const CACHE_NAME = "perkalian-app-v1";
const FILES_TO_CACHE = [
  "/",
  "/halaman-utama.html",
  "/login.html",
  "/petunjuk-penggunaan.html",
  "/tentang-perkalian.html",
  "/cara-bermain.html",
  "/profil.html",
  "/level-mudah.html",
  "/level-sedang.html",
  "/level-sulit.html",
  "/asset/image/favicon_game.png",
  "/asset/sound/mouse-click.wav",
  "/asset/sound/soundBenar.mp3",
  "/asset/sound/soundSalah.mp3",
  "/asset/sound/musik-latar2.mp3",
  "/asset/sound/gameSelesai.wav",
  "/asset/sound/detik.mp3",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
