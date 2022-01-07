/** ** */
import { clsx, forwardRef, nature } from '@nature-ui/system';
import { getValidChildren, StringOrNumber, __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

export type StackProps = {
  /**
   * The space between each stack item
   */
  spacing?: StringOrNumber;
  /**
   * Sets direction to row.
   */
  row?: boolean;
  /**
   * Sets direction to column.
   */
  col?: boolean;
  /**
   * Sets margins on left and right to auto and displays component as block
   */
  responsive?: boolean;
};

export const Stack = forwardRef<StackProps, 'div'>((props, ref) => {
  const {
    children,
    spacing = 4,
    row,
    col,
    className = '',
    responsive,
    as,
    ...rest
  } = props;

  const validChildren = getValidChildren(children);

  const direction = row ? 'row' : 'col';

  const clones = validChildren.map((child, index) => {
    const isLast = index + 1 === validChildren.length;
    const { className: cn, ..._props } = child.props;

    if (!isLast) {
      const _className = clsx({
        [`mb-${spacing}`]: spacing && col && !responsive,
        [`mr-${spacing}`]: spacing && row && !responsive,
        [`sm:mr-${spacing}`]: spacing && responsive,
        [`sm:mb-0 mb-${spacing}`]: responsive,
      });

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

  const _className = clsx(
    {
      flex: !responsive,
      'block sm:flex': responsive,
      [`flex-${direction}`]: direction && !responsive,
    },
    className,
  );

  return (
    <nature.div className={_className} {...rest} ref={ref}>
      {clones}
    </nature.div>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}
