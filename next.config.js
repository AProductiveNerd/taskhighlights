const withPWA = require("next-pwa");

const withPreact = require("next-plugin-preact");

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
module.exports = withPWA(
  withPreact({
    // async headers() {
    //   return [
    //     {
    //       // Apply these headers to all routes in your application.
    //       source: '/(.*)',
    //       headers: securityHeaders,
    //     },
    //   ]
    // },
    // webpack: (config, { dev, isServer }) => {
    //   // Replace React with Preact only in client production build
    //   if (!dev && !isServer) {
    //     Object.assign(config.resolve.alias, {
    //       react: 'preact/compat',
    //       'react-dom/test-utils': 'preact/test-utils',
    //       'react-dom': 'preact/compat',
    //     });
    //   }

    //   return config;
    // },
    reactStrictMode: true,

    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    pwa: {
      dest: "public",
    },
    // ignoreBuildErrors: true,
  })
);
