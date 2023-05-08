import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import appConfig from 'app.config';
import {
  Heading,
  FeaturedImage,
  LoadMore
} from 'components';
import className from 'classnames/bind';
import useFocusFirstNewResult from 'hooks/useFocusFirstNewResult.js';

import styles from './Projects.module.scss';

const cx = className.bind(styles);

function Projects({ id, emptyText = 'No projects found.' }) {
  const [projects, setProjects] = useState([])

  const { firstNewResultRef, firstNewResultIndex } = useFocusFirstNewResult(projects);


  const queryResult = useQuery(Projects.query, {
    variables: {
      first: appConfig.projectsPerPage,
      after: '',
    }
  });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL + '/graphql/';
    (async () => {
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
      })
      console.log(api);
    })()
    // console.log(api.json());
  })

  useEffect(() => {
    let tmpPro = [];
    if (queryResult.data) {
      tmpPro = queryResult.data?.projects?.edges.map(el => el.node)
      setProjects(tmpPro)
    }
  }, [queryResult.data])

  if (queryResult.loading) return <></>

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <>
      <section {...(id && { id })}>
        {projects?.map((project, i) => {
          const isFirstNewResult = i === firstNewResultIndex;

          return (
            <div
              className="row"
              key={project.id ?? ''}
              id={`project-${project.id}`}
            >
              <div className={cx('list-item')}>
                <FeaturedImage
                  className={cx('image')}
                  image={project?.featuredImage?.node}
                  priority={i < appConfig.projectsAboveTheFold}
                />
                <div className={cx('content')}>
                  <Heading level="h3">
                    <Link href={project?.uri ?? '#'}>
                      <a ref={isFirstNewResult ? firstNewResultRef : null}>
                        {project.title}
                      </a>
                    </Link>
                  </Heading>
                  <div>{project.summary}</div>
                </div>
              </div>
            </div>
          );
        })}
        {projects && projects?.length < 1 && <p>{emptyText}</p>}
      </section>
      <LoadMore className="text-center"
        hasNextPage={queryResult?.data?.projects?.pageInfo?.hasNextPage}
        endCursor={queryResult?.data?.projects?.pageInfo?.endCursor}
        isLoading={queryResult?.loading}
        fetchMore={queryResult?.fetchMore}
      />
    </>
  );
}


Projects.query = gql`
${FeaturedImage.fragments.entry}
  query Projects (
    $first: Int!
    $after: String!
  ) {
    projects(first: $first, after: $after) {
      edges {
        node {
          id
          title
          summary
          uri
          ...FeaturedImageFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export default Projects;
