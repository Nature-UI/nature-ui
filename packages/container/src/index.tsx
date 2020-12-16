import * as React from 'react';
import { clsx, nature, PropsOf } from '@nature-ui/system';

interface IContainer {
  /**
   * Determine the max-width of the container.
   */
  size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | number;
}

const BASE_STYLE = 'mx-auto container';
const _SIZES = {
  lg: 'max-w-lg',
  md: 'max-w-md',
  sm: 'max-w-sm',
  xl: 'max-w-2xl',
  xs: 'max-w-xs',
};

const DivTag = nature('div');

const Container = (props: IContainer & PropsOf<typeof DivTag>) => {
  const { size = 'lg', children, className = '' } = props;

  const _size = typeof size === 'string' ? _SIZES[size] : size;

  const componentClass: string = clsx(className, BASE_STYLE, _size);

  return <DivTag className={componentClass}>{children}</DivTag>;
};

Container.displayName = 'Container';

export default Container;
