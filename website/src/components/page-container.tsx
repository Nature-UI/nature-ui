/** @jsx jsx */
import { nature, jsx } from '@nature-ui/core';
import { useRouter } from 'next/router';

import * as React from 'react';

const useHeadingFocusOnRouteChange = () => {
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
  }, [router.events]);
};

interface PageContainerProps {
  frontMatter: any;
  children: React.ReactNode;
  sidebar?: any;
  pagination?: any;
}

const PageContainer = (props: PageContainerProps) => {
  const { frontMatter, children, sidebar, pagination } = props;
  useHeadingFocusOnRouteChange();

  const { title, description, editUrl } = frontMatter;
  return (
    <>
      <nature.h1>{title}</nature.h1>
      {children}
    </>
  );
};

export default PageContainer;
