/** ** */
import { forwardRef, nature, PropsOf, clsx, css } from '@nature-ui/system';
import * as React from 'react';
import { getValidChildren, __DEV__ } from '@nature-ui/utils';

const DivTag = nature('div');
export type StackProps = PropsOf<typeof DivTag> & {
  /**
   * The space between each stack item
   */
  spacing?: string | number;
  /**
   * Sets direction to row.
   */
  row?: boolean;
  /**
   * Sets direction to column.
   */
  col?: boolean;
};

export const Stack = forwardRef<StackProps>((props, ref) => {
  const {
    children,
    spacing = 4,
    row,
    col,
    className = '',
    as,
    ...rest
  } = props;

  const validChildren = getValidChildren(children);

  console.log({ row, col });
  const direction = row ? 'row' : 'col';

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
        [COL]: spacing && col,
        [ROW]: spacing && row,
      });

      const { className: cn, ..._props } = child.props;
      return (
        <React.Fragment key={Number(index)}>
          {React.cloneElement(child as any, {
            ..._props,
            className: clsx(cn, _className),
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
