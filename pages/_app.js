import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
// import { useQuery } from '@apollo/client';
// import { GetRedirects } from 'queries/GetRedirects';
import 'normalize.css/normalize.css';
import '../styles/main.scss';
import ThemeStyles from 'components/ThemeStyles/ThemeStyles';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // console.log(pageProps, 'router');
  // router.push('/')

  return (
    <>
      <ThemeStyles />
      <FaustProvider pageProps={pageProps}>
        <Component {...pageProps} key={router.asPath} />
      </FaustProvider>
    </>
  );
}

export default MyApp;


// const RedirectApp = (props) => {
//   const { router, children } = props;
//   const redirects = useQuery(GetRedirects);
//   const redirectsItems = redirects?.data?.redirects ?? []
//   const tmp = redirectsItems.filter(el => el.match_url === router.asPath)
//   // console.log(tmp[0]?.action_data);
//   if (tmp?.length) {
//     // router.push(tmp[0]?.action_data)
//   }
//   // console.log(redirects, 'redirects');
//   return (
//     <>{children}</>
//   )
// }