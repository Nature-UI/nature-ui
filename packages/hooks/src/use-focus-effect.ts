import * as React from 'react';
import { useUpdateEffect } from './use-update-effect';
import { focus, hasFocusWithin } from '@nature-ui/utils';

export type UseFocusEffectOptions = {
  shouldFocus: boolean;
  preventScroll?: boolean;
};

/**
 * React hook to focus an element conditionally
 *
 * @param ref the ref of the element to focus
 * @param options focus management options
 */

export const useFocusEffect = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  options: UseFocusEffectOptions
) => {
  const { shouldFocus, preventScroll } = options;

  useUpdateEffect(() => {
    const node = ref.current;
    if (!node || !shouldFocus) return;

    if (!hasFocusWithin(node)) {
      focus(node, { preventScroll });
    }
  });
};
