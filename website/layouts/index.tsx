import * as React from 'react';
import dynamic from 'next/dynamic';

const MDXLayout = dynamic(() => import('layouts/mdx'));

const DefaultLayout = ({ children, frontMatter }: any) => {
  const { slug } = frontMatter;
  const layoutMap = {
    '/docs': <MDXLayout frontMatter={frontMatter}>{children}</MDXLayout>,
  };

  const layout = Object.entries(layoutMap).find(([path]) => {
    return String(slug).startsWith(path);
  });

  console.log({ layout });

  return layout[1];
};

export default DefaultLayout;
