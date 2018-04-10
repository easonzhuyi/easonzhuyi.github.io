importScripts("./precache-manifest.e6f11c2f21a90736459d3ad33aaa76c7.js", "./workbox-v3.0.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.0.1"});
/**
 * @file service-worker.js with workbox api
 * @desc [example](https://workbox-samples.glitch.me/examples/workbox-sw/)
 * @author easonzhu(easonzhu@zhongan.io)
 */

/* globals WorkboxSW */

const workboxSW = new WorkboxSW({
    cacheId: 'pwa-cache',
    ignoreUrlParametersMatching: [/^utm_/],
    skipWaiting: true,
    clientsClaim: true
});


// Define precache injection point.
workboxSW.precache([]);

/**
 * example runningCache with api
 */
// workboxSW.router.registerRoute(/^https:\/\/lavas\.baidu\.com\/some\/api/,
//     workboxSW.strategies.networkFirst());


/**
 * example runningCache with resources from CDN
 * including maxAge, maxEntries
 * cacheableResponse is important for CDN
 */
// workboxSW.router.registerRoute(/^https:\/\/cdn\.baidu\.com/i,
//     workboxSW.strategies.cacheFirst({
//         cacheName: 'lavas-cache-images',
//         cacheExpiration: {
//             maxEntries: 100,
//             maxAgeSeconds: 7 * 24 * 60 * 60
//         },
//         cacheableResponse: {
//             statuses: [0, 200]
//         }
//     })
// );

