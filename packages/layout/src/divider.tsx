import * as React from 'react';
import { forwardRef, nature, PropsOf } from '@nature-ui/system';
import clsx from 'clsx';

import './styles/divider.css';

const DividerElem = nature('hr');

export type DividerProp = Omit<PropsOf<typeof DividerElem>, 'children'> & {
  orientation?: 'vertical' | 'horizontal';
};

export const Divider = forwardRef<DividerProp>((props, ref) => {
  const {
    className = 'mr-0 ml-0',
    color = 'gray-200',
    orientation = 'horizontal',
    ...rest
  } = props;

  const _className = clsx({
    [className]: className,
    [`border-${color}`]: color,
    [`h-full border border-t-0 border-r-0 border-b-0 nature__hr border-${color}`]:
      orientation === 'vertical',
  });

  return <DividerElem className={_className} {...rest} ref={ref} />;
});
