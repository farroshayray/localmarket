if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>i(e,n),o={module:{uri:n},exports:t,require:r};s[n]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/SxsT57NutrM6rWZlAPG39/_buildManifest.js",revision:"f273294fb380aa0b8a393a9501c3310f"},{url:"/_next/static/SxsT57NutrM6rWZlAPG39/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/119.26a4ecc869eda9e3.js",revision:"26a4ecc869eda9e3"},{url:"/_next/static/chunks/121-c40d7637e55292d0.js",revision:"c40d7637e55292d0"},{url:"/_next/static/chunks/246-f18ea2b20f2276d9.js",revision:"f18ea2b20f2276d9"},{url:"/_next/static/chunks/351.5e5fbac39a184502.js",revision:"5e5fbac39a184502"},{url:"/_next/static/chunks/356-6d9b74c0e83b3181.js",revision:"6d9b74c0e83b3181"},{url:"/_next/static/chunks/374.2807f70d386a09bf.js",revision:"2807f70d386a09bf"},{url:"/_next/static/chunks/495-292d4a43a1d03f31.js",revision:"292d4a43a1d03f31"},{url:"/_next/static/chunks/557-8381a32a0ebf8e41.js",revision:"8381a32a0ebf8e41"},{url:"/_next/static/chunks/723-fe78bcfcae99ef33.js",revision:"fe78bcfcae99ef33"},{url:"/_next/static/chunks/7d0bf13e-7c6281cfebdc17b1.js",revision:"7c6281cfebdc17b1"},{url:"/_next/static/chunks/801-8de8495a5e6dcda5.js",revision:"8de8495a5e6dcda5"},{url:"/_next/static/chunks/909-fdbc22518eb18594.js",revision:"fdbc22518eb18594"},{url:"/_next/static/chunks/942-e07b5b4d6d1e3da7.js",revision:"e07b5b4d6d1e3da7"},{url:"/_next/static/chunks/cb355538-b7c2c2c9d5f4c57d.js",revision:"b7c2c2c9d5f4c57d"},{url:"/_next/static/chunks/framework-a6b3d2fb26bce5d1.js",revision:"a6b3d2fb26bce5d1"},{url:"/_next/static/chunks/main-3ae2315102d581f5.js",revision:"3ae2315102d581f5"},{url:"/_next/static/chunks/pages/401-f9f7d2390b0da371.js",revision:"f9f7d2390b0da371"},{url:"/_next/static/chunks/pages/404-79340be936296ee1.js",revision:"79340be936296ee1"},{url:"/_next/static/chunks/pages/_app-9255f52502e5f865.js",revision:"9255f52502e5f865"},{url:"/_next/static/chunks/pages/_error-fde50cb7f1ab27e0.js",revision:"fde50cb7f1ab27e0"},{url:"/_next/static/chunks/pages/admin-0c937d75584f2dd3.js",revision:"0c937d75584f2dd3"},{url:"/_next/static/chunks/pages/agen-babab437c92e6198.js",revision:"babab437c92e6198"},{url:"/_next/static/chunks/pages/cartpage-2e7a0b47cc52af44.js",revision:"2e7a0b47cc52af44"},{url:"/_next/static/chunks/pages/category/%5Bid%5D-8709e804d3015168.js",revision:"8709e804d3015168"},{url:"/_next/static/chunks/pages/driver-d132324b1a04c057.js",revision:"d132324b1a04c057"},{url:"/_next/static/chunks/pages/edit_product/%5Bid%5D-362717a9ebcbe0fb.js",revision:"362717a9ebcbe0fb"},{url:"/_next/static/chunks/pages/edit_promotion/%5BpromotionId%5D-e647fa5687679e16.js",revision:"e647fa5687679e16"},{url:"/_next/static/chunks/pages/home-33e6e39f7dafbda1.js",revision:"33e6e39f7dafbda1"},{url:"/_next/static/chunks/pages/home/category_list-2da30cf0cb5eb344.js",revision:"2da30cf0cb5eb344"},{url:"/_next/static/chunks/pages/home/market_list-80b5bb6be014d1b0.js",revision:"80b5bb6be014d1b0"},{url:"/_next/static/chunks/pages/home/product_grid-68160ae78aea76de.js",revision:"68160ae78aea76de"},{url:"/_next/static/chunks/pages/index-d7307d6999731fcf.js",revision:"d7307d6999731fcf"},{url:"/_next/static/chunks/pages/input_product-e687dcef9be37d7c.js",revision:"e687dcef9be37d7c"},{url:"/_next/static/chunks/pages/input_promotion-cde12ffda86e6b08.js",revision:"cde12ffda86e6b08"},{url:"/_next/static/chunks/pages/input_promotion/promotionList-0cfdb58b786cdd4e.js",revision:"0cfdb58b786cdd4e"},{url:"/_next/static/chunks/pages/list_product-b9d349185fe5a739.js",revision:"b9d349185fe5a739"},{url:"/_next/static/chunks/pages/login-aadaf71f9e727e63.js",revision:"aadaf71f9e727e63"},{url:"/_next/static/chunks/pages/market_product/%5BmarketId%5D-6c28778de6fd44c2.js",revision:"6c28778de6fd44c2"},{url:"/_next/static/chunks/pages/product/%5Bid%5D-5d60bd7bc10a6a9b.js",revision:"5d60bd7bc10a6a9b"},{url:"/_next/static/chunks/pages/profile-a272c5b5b235514c.js",revision:"a272c5b5b235514c"},{url:"/_next/static/chunks/pages/register-3748f09f4e8e9408.js",revision:"3748f09f4e8e9408"},{url:"/_next/static/chunks/pages/topUpBalance-6817a8d3ae2a2545.js",revision:"6817a8d3ae2a2545"},{url:"/_next/static/chunks/pages/transaction-2805886b7b6c2768.js",revision:"2805886b7b6c2768"},{url:"/_next/static/chunks/pages/transaction_detail/%5Bid%5D-0ee267f4875e05c9.js",revision:"0ee267f4875e05c9"},{url:"/_next/static/chunks/pages/transaction_list-7b3aac54d0c699c7.js",revision:"7b3aac54d0c699c7"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-8bd86a6b821405a4.js",revision:"8bd86a6b821405a4"},{url:"/_next/static/css/0e731007ac8b46d9.css",revision:"0e731007ac8b46d9"},{url:"/_next/static/css/3d37293462bcdc88.css",revision:"3d37293462bcdc88"},{url:"/_next/static/css/6e291d0014f1bee1.css",revision:"6e291d0014f1bee1"},{url:"/_next/static/css/71b966c6efc95508.css",revision:"71b966c6efc95508"},{url:"/_next/static/css/8f15d1c210c7a52e.css",revision:"8f15d1c210c7a52e"},{url:"/_next/static/css/c2df5248e247f2f8.css",revision:"c2df5248e247f2f8"},{url:"/_next/static/css/c958495e87d51b81.css",revision:"c958495e87d51b81"},{url:"/_next/static/media/ajax-loader.0b80f665.gif",revision:"0b80f665"},{url:"/_next/static/media/revicons.652e7269.eot",revision:"652e7269"},{url:"/_next/static/media/revicons.b96bdb22.ttf",revision:"b96bdb22"},{url:"/_next/static/media/revicons.ff59b316.woff",revision:"ff59b316"},{url:"/_next/static/media/slick.25572f22.eot",revision:"25572f22"},{url:"/_next/static/media/slick.653a4cbb.woff",revision:"653a4cbb"},{url:"/_next/static/media/slick.6aa1ee46.ttf",revision:"6aa1ee46"},{url:"/_next/static/media/slick.f895cfdf.svg",revision:"f895cfdf"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/favicon.png",revision:"59b41eb82ba8187fd5fddeee3c33ce6d"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icons/icon-144x144.png",revision:"978e1a75f43622725eb844b1ce51c83b"},{url:"/icons/icon-192x192.png",revision:"ef97357a712e3a5634e00d0a8892c262"},{url:"/icons/icon-48x48.png",revision:"1f12b7c609802e56cbec19144f454037"},{url:"/icons/icon-72x72.png",revision:"8f7a4d9ae0fc0e1a22cd2ed2439f4eff"},{url:"/icons/icon-96x96.png",revision:"8c23c14c41f51104a3a030a3ddf058d8"},{url:"/images/Golekin_logo.png",revision:"75da9cc08e33a8446a1df09de9b41d9c"},{url:"/images/driver_pinloc.png",revision:"fdec63511b09203e17efcfbe0d177e1e"},{url:"/images/user-polos.jpg",revision:"d7068367c4367960647a732c708d3ca8"},{url:"/manifest.json",revision:"cdd9b12222c152981d3303da78aa2b26"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
