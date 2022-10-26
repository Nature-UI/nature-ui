import React from 'react';

import { useSafeLayoutEffect } from './use-safe-layout-effect';

/**
 * React hook for performant `useCallbacks`
 *
 * @see https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */

export const useEventCallback = <T extends Event | React.SyntheticEvent>(
  callback: (event: T, ...args: any[]) => void,
) => {
  const ref = React.useRef(callback);

  useSafeLayoutEffect(() => {
    ref.current = callback;
  });

  return React.useCallback(
    (event: T, ...args: any[]) => ref.current(event, ...args),
    [],
  );
};
