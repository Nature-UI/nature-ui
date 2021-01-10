import * as React from 'react';
import * as natureComponents from '@nature-ui/core';
import { MDXProvider } from '@mdx-js/react';

import MDXComponents from 'components/mdx-components';
import PageContainer from 'components/page-container';
import { getRouteContext } from 'utils/get-route-context';
import { findRouteByPath, removeFromLast } from 'utils/find-route-by-path';

import docsSidebar from 'configs/docs-sidebar.json';

export const getRoutes = (slug: string) => {
  const configMap = {
    '/docs': docsSidebar,
  };

  const [_path, sidebar] =
    Object.entries(configMap).find(([path, _sidebar]) =>
      slug.startsWith(path),
    ) ?? [];

  return sidebar?.routes ?? [];
};

const MDXLayout = ({ frontMatter, children }) => {
  return (
    <MDXProvider components={{ ...natureComponents, ...MDXComponents }}>
      <PageContainer frontMatter={frontMatter}>{children}</PageContainer>
    </MDXProvider>
  );
};

export default MDXLayout;
