import React from 'react';

import { useLatestRef } from './use-latest-ref';

/**
 * React hook that provides a declarative `setTimeout`
 *
 * @param callback the callback to run after specified delay
 * @param delay the delay (in ms)
 */
export const useTimeout = (callback: Function, delay: number | null) => {
  const saveCallback = useLatestRef(callback);

  React.useEffect(() => {
    if (delay === null) return;

    const timeoutId = setTimeout(() => {
      saveCallback.current?.();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay, saveCallback]);
};
