import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRouteChanged = (fn: () => void) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (uri: string) => {
      fn();
      console.log('App is changin yo: ', uri);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, fn]);
};
