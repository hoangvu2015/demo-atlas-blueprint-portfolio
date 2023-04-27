
const { withFaust, getWpHostname } = require('@faustwp/core');


/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        source: '/sample-page',
        destination: '/',
        permanent: true,
      },
      // {
      //   source: '/hello-me',
      //   destination: '/',
      //   permanent: true,
      // },
    ]
  },
});
