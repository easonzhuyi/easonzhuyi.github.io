importScripts("./precache-manifest.589bc5198bd1310c688ac1da609bb036.js", "./workbox-v3.0.1/workbox-sw.js");
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

//跳过install 和 active监听 覆盖老的service work并激活
workbox.skipWaiting();
workbox.clientsClaim();

// 策略 strategies
workbox.routing.registerRoute(
  "http://static.zhongan.com/website/public/js/jquery/v1.8.1/jquery-1.8.1.min.js",
  // networkFirst 请求优先 
  // cacheFirst 读取缓存 没有缓存更新
  // staleWhileRevalidate 直接读取缓存 同时更新
  // cacheOnly 
  // networkOnly 
  workbox.strategies.staleWhileRevalidate({
    plugins: [
      // 这个插件是让匹配的请求的符合开发者指定的条件的返回结果可以被缓存
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: "workbox:image",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
);

