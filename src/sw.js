/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

const googleFontsAndFirebaseSvgCachePlugins = [
  new workbox.cacheableResponse.CacheableResponsePlugin({
    statuses: [0, 200],
  }),
  new workbox.expiration.ExpirationPlugin({
    maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
    maxEntries: 30,
  }),
];

workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: googleFontsAndFirebaseSvgCachePlugins,
  })
);

workbox.routing.registerRoute(
  new RegExp('https://www.gstatic.com/firebasejs/(.*).svg$'),
  new workbox.strategies.CacheFirst({
    cacheName: 'google-firebase-svgs',
    plugins: googleFontsAndFirebaseSvgCachePlugins,
  })
);

workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
const navigationRoute = new workbox.routing.NavigationRoute(handler);
workbox.routing.registerRoute(navigationRoute);

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});
