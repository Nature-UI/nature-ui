import React from 'react';

/**
 * React hook for forcing a component to re-render
 */

export const useForceUpdate = () => {
  const [count, setCount] = React.useState(0);
  const forceUpdate = React.useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return forceUpdate;
};
