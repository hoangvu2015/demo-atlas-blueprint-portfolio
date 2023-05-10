
const { withFaust, getWpHostname } = require('@faustwp/core');
const { default: request, gql } = require("graphql-request");


/**
 * @type {import('next').NextConfig}
 **/

async function redirects() {
  const redirectResult = [];
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL + 'graphql/';
  try {
    const api = await request(apiUrl, gql`query GetRedirects {
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
        }`);

    const redirects = api.data?.redirects ?? [];
    for (let i = 0; i < redirects.length; i++) {
      if (redirects[i].match_url && redirects[i].action_data) {
        redirectResult.push({
          source: redirects[i].match_url,
          destination: redirects[i].action_data,
          permanent: true,
        });
      }
    }
  } catch (err) {
    console.error("Error getting CMS redirects:", err.message);
  }

  return redirectResult;
}
// async function redirects() {
//   const redirectResult = [];
//   const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL + 'graphql/';
//   const api = await fetch(apiUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       query: `query GetRedirects {
//           redirects {
//             id
//             url
//             title
//             position
//             match_url
//             action_code
//             action_type
//             action_data
//           }
//         }`
//     })
//   });
//   const redirects = api.data?.redirects ?? [{match_url: '/hello-me', action_data: '/'}];
//   for (let i = 0; i < redirects.length; i++) {
//     if (redirects[i].match_url && redirects[i].action_data) {
//       redirectResult.push({
//         source: redirects[i].match_url,
//         destination: redirects[i].action_data,
//         permanent: true,
//       });
//     }
//   }

//   return redirectResult;
// }

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
