if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return c[e]||(s=new Promise((async s=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]}))},s=(s,c)=>{Promise.all(s.map(e)).then((e=>c(1===e.length?e[0]:e)))},c={require:Promise.resolve(s)};self.define=(s,n,i)=>{c[s]||(c[s]=Promise.resolve().then((()=>{let c={};const a={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return c;case"module":return a;default:return e(s)}}))).then((e=>{const s=i(...e);return c.default||(c.default=s),c}))})))}}define("./sw.js",["./workbox-21b21c9a"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/218.d2b5f1e153cdf861e16d.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/226.d58d1c6fb8609988c274.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/24-4801fb15c4ed96101609.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/44.140d6858c099dc6d4170.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/444.3dbb64bbf1552f0922d2.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/457-60ba125ab02be5448d55.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/462-1f59f9a13f908f7a202d.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/49.669fb8278151e7e64139.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/49e4cfa8-a334c89bc8f70ee14a6e.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/61-6e2d1835810334eddc55.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/62.a8062e96a444c238891b.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/695.df60b30cfcde1d2c9de9.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/705-ad3c728e29843feca6a0.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/734-104dc5e6720fc936cac4.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/781.0605a7efe0281a2fe442.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/832.e56c8816837d563e155d.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/882-cf14a9e67b48051e24c4.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/9b9493a3-a6b9ab25fc9ddd7f146a.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/framework-54a34080d01b84667903.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/main-c997a785adc6b00b6289.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/%5Busername%5D/%5Bpublic_id%5D-6ff091dd809a880d42ce.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/_app-33b350d69147546ec995.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/app-3f480c77ffef4d0902a3.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/archived-191ec31f85cec0625596.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/incomplete-dab983a506ba49660ed8.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/index-62a5fb3f1f5ca812d4c1.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/log-in-ffe2b2b4e0c61c13034c.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/p/%5Btitle%5D-ab489fe73b43fe834b96.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/sign-up-1880eaa72646eb6c21b6.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/pages/u/%5Buser_username%5D-62e18a0ab65bfcd95fe7.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/chunks/webpack-e993369ac99411f58d7b.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/css/d8aefe97f72ec9e608a8.css",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/gculDkVNymq_d73Gu9WY-/_buildManifest.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/_next/static/gculDkVNymq_d73Gu9WY-/_ssgManifest.js",revision:"gculDkVNymq_d73Gu9WY-"},{url:"/favicon.ico",revision:"9dfc35ba2130726fa3e1e48dd97fe9f0"},{url:"/icon.png",revision:"495fc3a7f4a0df35c4497f9111f8ecf1"},{url:"/icons/icon-128x128.png",revision:"bb0ca1944aab5cd553017fe246a43f5d"},{url:"/icons/icon-144x144.png",revision:"b08004c71f7068e18cc12a23b302f47a"},{url:"/icons/icon-152x152.png",revision:"b04141bedcaa0db400be4ce237248a65"},{url:"/icons/icon-192x192.png",revision:"f9667a96b46c3a4f2847c1a8641848ac"},{url:"/icons/icon-384x384.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/icons/icon-512x512.png",revision:"7252a12809f8e9db181b58bade14576d"},{url:"/icons/icon-72x72.png",revision:"f0067a9a1d02f8b9702d2ecad45455e1"},{url:"/icons/icon-96x96.png",revision:"33cf274546b756fdfc6c40f28edfc264"},{url:"/images/desktop_app-page.png",revision:"f5959fe81d6c03c380148ec7d2730a42"},{url:"/images/icon.jpg",revision:"fbe902a436f9eb03fe35f261c7d997dc"},{url:"/images/tasks-card_app-page.png",revision:"217152c1db4f037de909c618349554b9"},{url:"/manifest.json",revision:"94f9506862b9985cefff87803b34a561"},{url:"/robots.txt",revision:"ac721ddcaee8cb61a8a9942da0e868d6"},{url:"/sitemap.xml",revision:"2ac317b8baeeb5d1eba823fb3005f01e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
