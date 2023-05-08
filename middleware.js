import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'

// const red = useQuery(GetRedirects);


export async function middleware(request) {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL + '/graphql/';
  const api = await fetch(apiUrl, {
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
  });

  const redirects = api.data?.redirects ?? [];//[{match_url: '/hello-me', action_data: '/'}];
  for (let i = 0; i < redirects.length; i++) {
    if (request.nextUrl.pathname.startsWith(redirects[i].match_url)) {
      return NextResponse.redirect(new URL(redirects[i].action_data, request.url))
    }
  }
  // })();
  // if (request.nextUrl.pathname.startsWith('/hello-me')) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }
}

// See 'Matching Paths' below to learn more
// export const config = {
//   matcher: '/hello-me',
// }