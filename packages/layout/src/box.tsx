import * as React from 'react';
import { nature, PropsOf, forwardRef } from '@nature-ui/system';
import clsx from 'clsx';
import { __DEV__ } from '@nature-ui/utils';

const BoxLayout = nature('div');

export type BoxProps = PropsOf<typeof BoxLayout>;

// type Omitted = "size" | "boxSize" | "width" | "height" | "w" | "h"

export type SquareProps = BoxProps & {
  /**
   * The size (width and height) of the square
   * It uses the range value in your tailwind.config.js file
   * i.e lg = w-2/3
   * Also accept values like 100%, 20px, 40 ...
   */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * If `true`, the content will be centered in the square
   */
  centerContent?: boolean;
};

const sizes = {
  xs: 'w-1/4',
  sm: 'w-1/3',
  md: 'w-2/5',
  lg: 'w-2/4',
  xl: 'w-3/5',
};

export const Box = forwardRef<SquareProps>((props, ref) => {
  const {
    children,
    className = '',
    size = 'md',
    centerContent = false,
    ...rest
  } = props;

  const CENTER_CONTENT = `flex items-center justify-center`;

  const DEFAULTS = ``;
  let SIZE;

  if (typeof size === 'number') {
    SIZE = {
      width: size,
    };
  }

  const _classNames = clsx(DEFAULTS, {
    [className]: className,
    [sizes[size]]: typeof size !== 'number',
    [CENTER_CONTENT]: centerContent,
  });

  const values = {
    ref,
    className: _classNames,
  };

  return (
    <BoxLayout {...rest} {...values} style={{ ...SIZE }}>
      {children}
    </BoxLayout>
  );
});

if (__DEV__) {
  Box.displayName = 'Box';
}
