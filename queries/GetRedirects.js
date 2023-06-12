import { gql } from '@apollo/client';
// import { getRedirectStatus } from 'next/dist/lib/load-custom-routes';

export const GetRedirects = gql`
  query GetRedirects {
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
  }
`;