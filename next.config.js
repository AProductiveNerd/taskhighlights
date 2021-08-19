const withPWA = require('next-pwa')


// const securityHeaders = [
//   {
//     key: 'X-DNS-Prefetch-Control',
//     value: 'on'
//   },
//   {
//     key: 'Strict-Transport-Security',
//     value: 'max-age=31536000; includeSubDomains; preload'
//   },
//   {
//     key: 'X-XSS-Protection',
//     value: '1; mode=block'
//   },
//   {
//     key: 'Content-Security-Policy',
//     value: "default-src 'self' taskhighlights2.vercel.app *.taskhighlights2.vercel.app; img-src http://localhost:3000 taskhighlights2.vercel.app *.taskhighlights2.vercel.app"
//   },
// ]

// eslint-disable-next-line no-undef
module.exports = withPWA({
  // async headers() {
  //   return [
  //     {
  //       // Apply these headers to all routes in your application.
  //       source: '/(.*)',
  //       headers: securityHeaders,
  //     },
  //   ]
  // },
  reactStrictMode: true,
  images: {
    domains: ["avataaars.io"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  pwa: {
    dest: 'public'
  }
})
