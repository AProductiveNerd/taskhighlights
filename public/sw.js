if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,i,a)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const c={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return n;case"module":return c;default:return e(s)}}))).then((e=>{const s=a(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-21b21c9a"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/RHo4AOTs8bpA2QdRhkp_u/_buildManifest.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/RHo4AOTs8bpA2QdRhkp_u/_ssgManifest.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/181.71878e9ae879b2f158a0.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/218.74d97cab0c4853a717b5.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/226.1eacc3a3601717aec51a.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/24-4801fb15c4ed96101609.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/314-89a56ef51c171fde95cc.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/334.0498dd5596029806f654.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/444.3dbb64bbf1552f0922d2.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/457-60ba125ab02be5448d55.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/49-94f0e517f6465963fea2.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/49e4cfa8-a334c89bc8f70ee14a6e.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/509.9f40bc6ea28a883ab19c.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/541.53443068c37e472d8bad.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/61-6e2d1835810334eddc55.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/695.ae491b727a638ccb62d1.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/705-ad3c728e29843feca6a0.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/781.bea82291e629b7a5b640.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/785.2b27f67fe061d40f52de.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/832.c7d9a2851b4aafe46f5b.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/882-46acad82c28213284418.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/973-9f645efdc72220a095e1.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/990-11f0d8978b2679941a01.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/9b9493a3-a6b9ab25fc9ddd7f146a.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/framework-54a34080d01b84667903.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/main-c997a785adc6b00b6289.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/%5Busername%5D/%5Bpublic_id%5D-fefd90408ead45f41e39.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/_app-33b350d69147546ec995.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/app-8e25dd882dffd65cc134.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/archived-5586169be754b419e124.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/habits-c60de606a63fdd709146.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/incomplete-9553f9181b8a4ce9c095.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/index-8eb588fc00242c353806.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/log-in-ca4e3091dd707bb5d19c.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/p/%5Btitle%5D-1cf66150670ebf3a1eae.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/sign-up-7a9146fd4948ef9d069c.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/templates-7523e395807c24e077ff.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/pages/u/%5Buser_username%5D-709f7f0bc58e0b06f918.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/chunks/webpack-94c106128d2f13fbc779.js",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/_next/static/css/a9736c5770390cd96956.css",revision:"RHo4AOTs8bpA2QdRhkp_u"},{url:"/favicon.ico",revision:"9dfc35ba2130726fa3e1e48dd97fe9f0"},{url:"/icon.png",revision:"495fc3a7f4a0df35c4497f9111f8ecf1"},{url:"/icons/icon-128x128.png",revision:"bb0ca1944aab5cd553017fe246a43f5d"},{url:"/icons/icon-144x144.png",revision:"b08004c71f7068e18cc12a23b302f47a"},{url:"/icons/icon-152x152.png",revision:"b04141bedcaa0db400be4ce237248a65"},{url:"/icons/icon-192x192.png",revision:"f9667a96b46c3a4f2847c1a8641848ac"},{url:"/icons/icon-384x384.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/icons/icon-512x512.png",revision:"7252a12809f8e9db181b58bade14576d"},{url:"/icons/icon-72x72.png",revision:"f0067a9a1d02f8b9702d2ecad45455e1"},{url:"/icons/icon-96x96.png",revision:"33cf274546b756fdfc6c40f28edfc264"},{url:"/images/desktop_app-page.png",revision:"f5959fe81d6c03c380148ec7d2730a42"},{url:"/images/icon.jpg",revision:"fbe902a436f9eb03fe35f261c7d997dc"},{url:"/images/tasks-card_app-page.png",revision:"217152c1db4f037de909c618349554b9"},{url:"/manifest.json",revision:"94f9506862b9985cefff87803b34a561"},{url:"/robots.txt",revision:"ac721ddcaee8cb61a8a9942da0e868d6"},{url:"/sitemap.xml",revision:"5b5381ea8cb0cad090e4eaabe42b008b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
