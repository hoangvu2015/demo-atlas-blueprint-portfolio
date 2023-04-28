import * as MENUS from 'constants/menus';

import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {
  Footer,
  Header,
  EntryHeader,
  Main,
  ProjectsClientSide,
  SEO,
  NavigationMenu,
} from 'components';
import { pageTitle } from 'utilities';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { getNextServerSideProps } from '@faustwp/core/dist/cjs/getProps';

export default function Page() {
  const { data, loading } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  if (loading) {
    return <></>;
  }

  const { title: siteTitle } = data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO title={pageTitle(data?.generalSettings, 'Projects')} />

      <Header menuItems={primaryMenu} />

      <Main>
        <EntryHeader title="Projects Client Side Rendering" />
        <div className="container">
          <ProjectsClientSide id="project-list" />
        </div>
      </Main>

      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetProjectsPage(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {

    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

export async function getServerSideProps(context) {
  return getNextServerSideProps(context, {
    Page,
  });
}
