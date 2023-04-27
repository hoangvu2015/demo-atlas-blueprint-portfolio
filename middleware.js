import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'

// const red = useQuery(GetRedirects);


const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL + 'graphql'
const api = fetch(apiUrl, {
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
})
export function middleware(request) {
  console.log(api, 'aaa');
  if (request.nextUrl.pathname.startsWith('/hello-me')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// See 'Matching Paths' below to learn more
// export const config = {
//   matcher: '/hello-me',
// }