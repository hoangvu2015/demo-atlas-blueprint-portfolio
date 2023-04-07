import { getWordPressProps, WordPressTemplate } from '@faustwp/core';

export default function Page(props) {
  // console.log(props, 'props WordPressTemplate');
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
