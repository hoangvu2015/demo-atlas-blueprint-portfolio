import { getSitemapProps } from '@faustwp/core';

export default function Sitemap() {}

export function getServerSideProps(ctx) {
  return getSitemapProps(ctx, {
    // sitemapIndexPath: '/sitemap_index.xml',
    frontendUrl: process.env.FRONTEND_URL || 'https://hnn38av7e7w8o4to8pn2eny2f.js.wpenginepowered.com/',
    // frontendUrl: 'https://hnn38av7e7w8o4to8pn2eny2f.js.wpenginepowered.com/',
    // frontendUrl: 'http://localhost:3000/',
    pages: [
      {
        path: '/hard-code-page',
      },
    ],
  });
}