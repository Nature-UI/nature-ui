import * as React from 'react';
import { forwardRef, nature, PropsOf } from '@nature-ui/system';
import clsx from 'clsx';

const DividerElem = nature('hr');

export type DividerProp = Omit<PropsOf<typeof DividerElem>, 'children'> & {
  /**
   * The thickness of the divider
   */
  size?: number;
};

export const Divider = forwardRef<DividerProp>((props, ref) => {
  const { className = '', size = 0, color = 'gray-200', ...rest } = props;

  const _className = clsx({
    [`border border-${size}`]: size > 0,
    [`border-${color}`]: color,
    [className]: className,
  });

  return <DividerElem className={_className} {...rest} ref={ref} />;
});
