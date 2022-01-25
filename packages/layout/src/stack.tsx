/** ** */
import { clsx, css, forwardRef, nature } from '@nature-ui/system';
import { getValidChildren, __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

export type StackProps = {
  /**
   * The space between each stack item
   */
  spacing?: string;
  /**
   * Sets direction to row.
   */
  row?: boolean;
  /**
   * Sets direction to column.
   */
  col?: boolean;
};

export const Stack = forwardRef<StackProps, 'div'>((props, ref) => {
  const {
    children,
    spacing = '1rem',
    row,
    col,
    className = '',
    as,
    ...rest
  } = props;

  const validChildren = getValidChildren(children);

  const direction = row ? 'row' : 'col';

  const clones = validChildren.map((child, index) => {
    const isLast = index + 1 === validChildren.length;
    const { className: cn, ..._props } = child.props;

    const _css = css({
      marginRight: row ? spacing : undefined,
      marginBottom: col ? spacing : undefined,
    });
    const childClassName = clsx(_css, cn);

    if (!isLast) {
      return (
        <React.Fragment key={`nature-${Number(index)}`}>
          {React.cloneElement(child as any, {
            ..._props,
            className: childClassName,
          })}
        </React.Fragment>
      );
    }

    return child;
  });

  const _className = clsx(
    'flex',
    {
      [`flex-${direction}`]: direction,
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
