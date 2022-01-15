import { MDXProvider } from '@mdx-js/react';
import * as natureComponents from '@nature-ui/core';
import MDXComponents from 'components/mdx-components';
import PageContainer from 'components/page-container';
import { Pagination } from 'components/pagination';
import Sidebar from 'components/sidebar/sidebar';
import docsSidebar from 'configs/docs-sidebar.json';
import * as React from 'react';
import { findRouteByPath, removeFromLast } from 'utils/find-route-by-path';
import { getRouteContext } from 'utils/get-route-context';

export const getRoutes = (slug: string) => {
  const configMap = {
    '/docs': docsSidebar,
  };

  const [, sidebar] =
    Object.entries(configMap).find(([path]) => slug.startsWith(path)) ?? [];

  return sidebar?.routes ?? [];
};

const MDXLayout = ({ frontMatter, children }: any) => {
  const routes = getRoutes(frontMatter.slug);

  const route = findRouteByPath(removeFromLast(frontMatter.slug, '#'), routes);
  const routeContext = getRouteContext(route, routes);

  return (
    <MDXProvider components={{ ...natureComponents, ...MDXComponents }}>
      <PageContainer
        sidebar={<Sidebar routes={routes} />}
        frontMatter={frontMatter}
        pagination={
          <Pagination
            next={routeContext.nextRoute}
            previous={routeContext.prevRoute}
          />
        }
      >
        {children}
      </PageContainer>
    </MDXProvider>
  );
};

export default MDXLayout;
