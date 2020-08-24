import * as React from 'react';
import { forwardRef, nature, PropsOf } from '@nature-ui/system';
import { getValidChildren, __DEV__ } from '@nature-ui/utils';
import clsx from 'clsx';

import { Box } from './box';

const StackElem = nature('div');

export type StackProps = PropsOf<typeof StackElem> & {
  /**
   * The space between each stack item
   */
  spacing?: number;
  /**
   * The direction to stack the items.
   */
  direction?: 'row' | 'col';
};

export const Stack = forwardRef<StackProps>((props, ref) => {
  const {
    children,
    spacing = 4,
    direction = 'col',
    className = '',
    ...rest
  } = props;

  const validChildren = getValidChildren(children);

  const clones = validChildren.map((child, index) => {
    const isLast = index + 1 === validChildren.length;

    if (!isLast) {
      const _className = clsx({
        [`mb-${spacing}`]: spacing && direction === 'col',
        [`mr-${spacing}`]: spacing && direction === 'row',
      });

      return <Box className={_className}>{child}</Box>;
    }

    return child;
  });

  const DEFAULT_CLASS = `flex`;
  const _className = clsx(DEFAULT_CLASS, {
    [`flex-${direction}`]: direction,
    [className]: className,
  });

  return (
    <StackElem className={_className} {...rest} ref={ref}>
      {clones}
    </StackElem>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}
