import React from 'react';
import { useSafeLayoutEffect, useForceUpdate } from '@nature-ui/hooks';

export type Descendant<T extends HTMLElement, P = {}> = P & {
  element: T | null;
  index?: number;
  disabled?: boolean;
  focusable?: boolean;
};

export interface DescendantContext<T extends HTMLElement, P = {}> {
  descendants: Descendant<T, P>[];
  register: (descendant: Descendant<T, P>) => void;
  unregister: (element: T) => void;
}

export type UseDescendantProps<T extends HTMLElement, P> = {
  context: DescendantContext<T, P>;
} & Descendant<T, P>;

export const useDescendant = <T extends HTMLElement, P>(
  props: UseDescendantProps<T, P>,
) => {
  const {
    context,
    element,
    index: indexProp,
    disabled,
    focusable,
    ...rest
  } = props;

  const forceUpdate = useForceUpdate();
  const { register, unregister, descendants } = context;

  useSafeLayoutEffect(() => {
    if (!element) {
      forceUpdate();
    }

    /**
     * Don't register this descendant if it's disabled and not focusable
     */
    if (disabled && !focusable) return;

    /**
     * else, register the descendant
     */
    register({
      element,
      disabled,
      focusable,
      ...rest,
    } as any);

    /**
     * when it unmounts, register the descendant
     */
    return () => {
      if (element) {
        unregister(element);
      }
    };
  }, [element, ...Object.values(rest)]);

  const index =
    indexProp ??
    descendants.findIndex((descendant) => descendant.element === element);

  return index;
};

export const useDescendants = <T extends HTMLElement, P>() => {
  const [descendants, setDescendants] = React.useState<Descendant<T, P>[]>([]);

  const register = React.useCallback(
    ({ element, ...rest }: Descendant<T, P>) => {
      if (!element) return;

      // @ts-ignore
      setDescendants((prevDescendants) => {
        if (prevDescendants.find((item) => item.element === element) == null) {
          const index = prevDescendants.findIndex((item) => {
            if (!item.element || !element) return false;

            return Boolean(
              item.element.compareDocumentPosition(element) &
                Node.DOCUMENT_POSITION_PRECEDING,
            );
          });

          const newItem = { element, ...rest };

          if (index === -1) {
            return [...prevDescendants, newItem];
          }

          return [
            ...prevDescendants.slice(0, index),
            newItem,
            ...prevDescendants.slice(index),
          ];
        }
      });
    },
    [],
  );

  const unregister = React.useCallback((element: T) => {
    if (!element) return;

    setDescendants((_descendants) =>
      _descendants.filter((descendant) => element !== descendant.element),
    );
  }, []);

  const context = React.useMemo(() => {
    return { descendants, register, unregister };
  }, [descendants, register, unregister]);

  return context;
};
