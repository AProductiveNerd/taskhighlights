if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let a={};const r=e=>i(e,t),o={module:{uri:t},exports:a,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),a)))}}define(["./workbox-82773b5e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/128.fdca2636eeee86bc.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/153-fd036d89af2afd07.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/184-d15ee772770c64ef.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/220.1c785b95b47f4b06.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/244.9bdcfcd294b00524.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/316-470db32ddca44331.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/477.2bf73e2381088499.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/49e4cfa8-08b8971597433ca9.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/553-7d9da2f43b3c2301.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/608-d043ec381c9a4ac4.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/61-3957b0b9215999a5.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/614.1ae074fd5baba1de.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/757.dfb7c9fdb74d1ad9.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/892.d066bd96aa7fd395.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/903-ef204912fde24d49.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/9b9493a3-6cdc3c98568f3d01.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/framework-da92e90c26c4c2e3.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/main-a2ee3f40c0d48333.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/%5Busername%5D/%5Bpublic_id%5D-8f58ea94751b10ea.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/_app-8b36113c1b7fc787.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/app-c238e5fb8699cbd9.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/archived-2c8283a09053b29d.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/incomplete-5b302d9c83f2a94b.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/index-908936fa9ac9ccaf.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/log-in-321df08382877ea4.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/p/%5Btitle%5D-799c8238b2debe12.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/sign-up-412f9afd20055afd.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/pages/u/%5Buser_username%5D-4d34c28f4725991a.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/chunks/webpack-c7030b00969ff463.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/css/10b5c302f5929df6.css",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/m9v0ds0ieJPkiXmWCfy1G/_buildManifest.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/m9v0ds0ieJPkiXmWCfy1G/_middlewareManifest.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/_next/static/m9v0ds0ieJPkiXmWCfy1G/_ssgManifest.js",revision:"m9v0ds0ieJPkiXmWCfy1G"},{url:"/favicon.ico",revision:"9dfc35ba2130726fa3e1e48dd97fe9f0"},{url:"/icon.png",revision:"495fc3a7f4a0df35c4497f9111f8ecf1"},{url:"/icons/icon-128x128.png",revision:"bb0ca1944aab5cd553017fe246a43f5d"},{url:"/icons/icon-144x144.png",revision:"b08004c71f7068e18cc12a23b302f47a"},{url:"/icons/icon-152x152.png",revision:"b04141bedcaa0db400be4ce237248a65"},{url:"/icons/icon-192x192.png",revision:"f9667a96b46c3a4f2847c1a8641848ac"},{url:"/icons/icon-384x384.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/icons/icon-512x512.png",revision:"7252a12809f8e9db181b58bade14576d"},{url:"/icons/icon-72x72.png",revision:"f0067a9a1d02f8b9702d2ecad45455e1"},{url:"/icons/icon-96x96.png",revision:"33cf274546b756fdfc6c40f28edfc264"},{url:"/images/desktop_app-page.png",revision:"f5959fe81d6c03c380148ec7d2730a42"},{url:"/images/icon.jpg",revision:"fbe902a436f9eb03fe35f261c7d997dc"},{url:"/images/tasks-card_app-page.png",revision:"217152c1db4f037de909c618349554b9"},{url:"/manifest.json",revision:"94f9506862b9985cefff87803b34a561"},{url:"/robots.txt",revision:"e23f14837e70b3b55235bb9c1ef9a4df"},{url:"/sitemap-0.xml",revision:"f78dd17fc1a05e724be8d02ae940e4ad"},{url:"/sitemap.xml",revision:"8495c97d0c4443ec280cb216ba52882c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
