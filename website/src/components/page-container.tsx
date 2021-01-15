/** @jsx jsx */
import { Badge, Box, nature, jsx } from '@nature-ui/core';
import { useRouter } from 'next/router';
import * as React from 'react';

import Header from './header';

function useHeadingFocusOnRouteChange() {
  const router = useRouter();

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName('h1'));
      heading?.focus();
    };
    router.events.on('routeChangeComplete', onRouteChange);
    return () => {
      router.events.off('routeChangeComplete', onRouteChange);
    };
  }, []);
}

interface PageContainerProps {
  frontMatter: {
    slug?: string;
    title: string;
    description?: string;
    editUrl?: string;
    version?: string;
  };
  children: React.ReactNode;
  sidebar?: any;
  pagination?: any;
}

function PageContainer(props: PageContainerProps) {
  const { frontMatter, children, sidebar, pagination } = props;
  useHeadingFocusOnRouteChange();

  const { title, description, editUrl, version } = frontMatter;

  return (
    <>
      <Header />
      <nature.div as='main' className=''>
        <Box className='flex'>
          {sidebar || null}
          <div style={{ flex: 1 }}>
            <Box
              id='content'
              pt={3}
              px={5}
              mt='4.5rem'
              mx='auto'
              maxW='48rem'
              minH='76vh'
            >
              <nature.h1 className='outline-none'>{title}</nature.h1>
              {version && <Badge color='teal-500'>v{version}</Badge>}
              {children}
              <Box mt='40px'>{editUrl && <nature.a href={editUrl} />}</Box>
              {pagination || null}
            </Box>
          </div>
        </Box>
      </nature.div>
    </>
  );
}

export default PageContainer;
