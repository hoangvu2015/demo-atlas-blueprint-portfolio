
const { withFaust, getWpHostname } = require('@faustwp/core');

async function redirects() {
  let cmsRedirects = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL + '/graphql';
    const results = await (await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query GetRedirects {
            redirects {
              id
              url
              title
              position
              match_url
              action_code
              action_type
              action_data
            }
          }`
      })
    })).json();
    console.log(results.data?.redirects, 'redirects')
    results.data?.redirects.forEach((item) => {
      cmsRedirects.push({
        source: item.url,
        destination: item.action_data,
        permanent: true,
      })
    });
  } catch (err) {
    console.error("Error getting CMS redirects:", err.message);
  }
  
  return cmsRedirects;
}


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
  redirects
});
