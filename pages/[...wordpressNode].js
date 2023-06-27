import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
// import { WordPressTemplate } from '@faustwp/core';
// import { getNextServerSideProps } from '@faustwp/core/dist/cjs/getProps';

export default function Page(props) {
  // console.log(props, 'props WordPressTemplate');
  return <WordPressTemplate {...props} />;
}

// export async function getServerSideProps(ctx) {
//   // return getWordPressProps({ ctx });
//   return getNextServerSideProps(ctx, {
//     Page
//    });
// }
export function getStaticProps(ctx) {
  return getWordPressProps({ ctx, revalidate: 10});
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
