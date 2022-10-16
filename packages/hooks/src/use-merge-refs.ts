import * as React from 'react';

type ReactRef<T> = React.Ref<T> | React.MutableRefObject<T>;

/**
 * Assigns a value to a ref function or object
 *
 * @param ref the ref to assign to
 * @param value the value
 */
export const assignRef = <T = any>(ref: ReactRef<T> | undefined, value: T) => {
  if (ref === null || ref === undefined || !ref) return;

  if (typeof ref === 'function') {
    ref(value);

    return;
  }

  try {
    // @ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
};

/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * import React from "react";
 * import { useMergeRefs } from `@nature-ui/hooks`;
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 */
export const useMergeRefs = <T>(...refs: (ReactRef<T> | undefined)[]) => {
  return React.useMemo(() => {
    if (refs.every((ref) => ref === null || ref === undefined || !ref)) {
      return null;
    }

    return (node: T) => {
      refs.forEach((ref) => {
        if (ref) assignRef(ref, node);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
};
