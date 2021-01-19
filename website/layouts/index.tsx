import * as React from 'react';
import dynamic from 'next/dynamic';
import PageContainer from 'components/page-container';

const MDXLayout = dynamic(() => import('layouts/mdx'));

const DefaultLayout = ({ children, frontMatter }: any) => {
  const { slug } = frontMatter;
  const layoutMap = {
    '/docs': <MDXLayout frontMatter={frontMatter}>{children}</MDXLayout>,
    default: (
      <PageContainer frontMatter={frontMatter}>{children}</PageContainer>
    ),
  };

  const layout = Object.entries(layoutMap).find(([path]) => {
    return String(slug).startsWith(path);
  });

  return layout[1] ?? layoutMap.default;
};

export default DefaultLayout;
