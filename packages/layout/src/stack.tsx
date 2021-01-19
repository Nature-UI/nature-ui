/** @jsx jsx */
import { forwardRef, nature, PropsOf, clsx, jsx } from '@nature-ui/system';
import * as React from 'react';
import { getValidChildren, __DEV__ } from '@nature-ui/utils';
import { css } from 'emotion';

const DivTag = nature('div');
export type StackProps = PropsOf<typeof DivTag> & {
  /**
   * The space between each stack item
   */
  spacing?: string | number;
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
    as,
    ...rest
  } = props;

  const validChildren = getValidChildren(children);

  const clones = validChildren.map((child, index) => {
    const isLast = index + 1 === validChildren.length;

    const SPACING = typeof spacing === 'number' ? `${spacing}px` : spacing;

    const ROW = css`
      margin-right: ${SPACING};
    `;

    const COL = css`
      margin-bottom: ${SPACING};
    `;

    if (!isLast) {
      const _className = clsx({
        [COL]: spacing && direction === 'col',
        [ROW]: spacing && direction === 'row',
      });

      // return (
      //   <Box key={Number(index)} className={_className}>
      //     {child}
      //   </Box>
      // );
      return (
        <React.Fragment key={Number(index)}>
          {React.cloneElement(child as any, {
            className: clsx(child.props.className, _className),
          })}
        </React.Fragment>
      );
    }

    return child;
  });

  const DEFAULT_CLASS = 'flex';
  const _className = clsx(className, DEFAULT_CLASS, {
    [`flex-${direction}`]: direction,
  });

  return (
    <DivTag className={_className} {...rest} ref={ref}>
      {clones}
    </DivTag>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}
