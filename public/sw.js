if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let n=Promise.resolve();return s[e]||(n=new Promise((async n=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=n}else importScripts(e),n()}))),n.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},n=(n,s)=>{Promise.all(n.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(n)};self.define=(n,c,i)=>{s[n]||(s[n]=Promise.resolve().then((()=>{let s={};const a={uri:location.origin+n.slice(1)};return Promise.all(c.map((n=>{switch(n){case"exports":return s;case"module":return a;default:return e(n)}}))).then((e=>{const n=i(...e);return s.default||(s.default=n),s}))})))}}define("./sw.js",["./workbox-21b21c9a"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/181.71878e9ae879b2f158a0.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/218.455685a403baaefcc7e8.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/226.047565ac40036d8389ef.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/24-4801fb15c4ed96101609.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/314-89a56ef51c171fde95cc.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/334.1276ea2380a5d2be2766.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/421-3c0210af292e46646a8b.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/444.3dbb64bbf1552f0922d2.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/457-60ba125ab02be5448d55.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/49-94f0e517f6465963fea2.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/509.9f40bc6ea28a883ab19c.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/541.53443068c37e472d8bad.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/61-6e2d1835810334eddc55.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/621ca4e0-89701ef3690a27714187.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/695.ae491b727a638ccb62d1.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/781.7bbfe466dca9ace11e5a.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/785.2b27f67fe061d40f52de.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/832.c7d9a2851b4aafe46f5b.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/882-81b69c5f61f8edbccdbe.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/900-699e0f2778361e3d62c7.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/973-9f645efdc72220a095e1.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/9b9493a3-a6b9ab25fc9ddd7f146a.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/framework-54a34080d01b84667903.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/main-c997a785adc6b00b6289.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/%5Busername%5D/%5Bpublic_id%5D-2eedbe8462314932fea6.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/_app-33b350d69147546ec995.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/app-671cb9ea8303728e286a.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/archived-d4cbbe61541bde3ae95e.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/habits-2f283a9cb0f89f6a7da9.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/incomplete-0a80b2a6d451d878186c.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/index-451c1badd99fc25a81cc.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/log-in-05c73f8d112a11407725.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/p/%5Btitle%5D-10379054610c7667f490.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/sign-up-6db0ba69c68b9b7d1fd3.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/templates-8f9f64440a9745e3cd65.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/pages/u/%5Buser_username%5D-76eba01a7ebc1eec88a9.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/chunks/webpack-a9733642a503ee92b1ae.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/css/a9736c5770390cd96956.css",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/nQBvNGRywcqqw3df1n1ck/_buildManifest.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/_next/static/nQBvNGRywcqqw3df1n1ck/_ssgManifest.js",revision:"nQBvNGRywcqqw3df1n1ck"},{url:"/favicon.ico",revision:"9dfc35ba2130726fa3e1e48dd97fe9f0"},{url:"/icon.png",revision:"495fc3a7f4a0df35c4497f9111f8ecf1"},{url:"/icons/icon-128x128.png",revision:"bb0ca1944aab5cd553017fe246a43f5d"},{url:"/icons/icon-144x144.png",revision:"b08004c71f7068e18cc12a23b302f47a"},{url:"/icons/icon-152x152.png",revision:"b04141bedcaa0db400be4ce237248a65"},{url:"/icons/icon-192x192.png",revision:"f9667a96b46c3a4f2847c1a8641848ac"},{url:"/icons/icon-384x384.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/icons/icon-512x512.png",revision:"7252a12809f8e9db181b58bade14576d"},{url:"/icons/icon-72x72.png",revision:"f0067a9a1d02f8b9702d2ecad45455e1"},{url:"/icons/icon-96x96.png",revision:"33cf274546b756fdfc6c40f28edfc264"},{url:"/images/desktop_app-page.png",revision:"f5959fe81d6c03c380148ec7d2730a42"},{url:"/images/icon.jpg",revision:"fbe902a436f9eb03fe35f261c7d997dc"},{url:"/images/tasks-card_app-page.png",revision:"217152c1db4f037de909c618349554b9"},{url:"/manifest.json",revision:"94f9506862b9985cefff87803b34a561"},{url:"/robots.txt",revision:"ac721ddcaee8cb61a8a9942da0e868d6"},{url:"/sitemap.xml",revision:"7112c189fbc5996e537febe388565a9a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:c})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
