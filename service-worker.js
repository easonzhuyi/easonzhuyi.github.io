importScripts("./precache-manifest.b4b89ea0816217a7821d172901bf702f.js", "./workbox-v3.0.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.0.1"});
/**
 * @file service-worker.js with workbox api
 * @desc [example](https://workbox-samples.glitch.me/examples/workbox-sw/)
 * @author easonzhu(easonzhu@zhongan.io)
 */

/* globals WorkboxSW */

// 2.1.3
// const workboxSW = new WorkboxSW({
//     cacheId: 'pwa-cache',
//     ignoreUrlParametersMatching: [/^utm_/],
//     skipWaiting: true,
//     clientsClaim: true
// });
// workboxSW.precache([]);
/**
 * example runningCache with api
 */
// workboxSW.router.registerRoute(/^https:\/\/lavas\.baidu\.com\/some\/api/,
//     workboxSW.strategies.networkFirst());

// 3.0.1
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

workbox.core.setCacheNameDetails({
  prefix: "pwa-cahce",
  suffix: "v1",
  precache: "install-time",
  runtime: "run-time",
  googleAnalytics: "ga"
});


// Define precache injection point.
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

//跳过install 和 active监听 覆盖老的service work
workbox.skipWaiting();
workbox.clientsClaim();

