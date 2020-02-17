// let CATCH_NAME = "WiseEconomy";
// let urlToCache = [
//     '/',
//     '/about',
//     '/track'
// ]

// //Install the service worker
// self.addEventListener("install", e => {
//     console.log("installing");
    
//     e.waitUntil(
//         caches.open(CATCH_NAME)
//             .then(cache => {
//                 console.log("Install the cache");
//                 return cache.addAll(urlToCache);
//             })
//     );
// })

// //Cache and return requests
// self.addEventListener("fetch", e => {
//     e.respondWith(
//         caches.match(e.request)
//             .then(response => {
//                 if (response) {
//                     return response;
//                 }
//                 return fetch(e.request);
//             }).cache(err => { console.log(err) })
//     )
// });


// //Update the service worker
// self.addEventListener('activate', e => {
//     let cacheWhitelist = [CATCH_NAME];
//     e.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (cacheWhitelist.indexOf(cacheName) === -1) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         }))
// })


