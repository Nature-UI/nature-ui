import * as React from 'react';
import { nature, PropsOf, forwardRef } from '@nature-ui/system';

const BoxLayout = nature('div');

export type BoxProps = PropsOf<typeof BoxLayout>;

// type Omitted = "size" | "boxSize" | "width" | "height" | "w" | "h"

export type SquareProps = BoxProps & {
  /**
   * The size (width and height) of the square
   * It uses the range value in your tailwind.config.js file
   * i.e lg = w-2/3
   */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * If `true`, the content will be centered in the square
   */
  centerContent?: boolean;
  /**
   * If variant is set to circle then the @borderRadius will
   * take the maximum borderRadius in your tailwind.config.js file.
   */
  variant?: 'square' | 'circle';
};

const sizes = {
  xs: 'w-1/6',
  sm: 'w-1/3',
  md: 'w-2/4',
  lg: 'w-2/3',
  xl: 'w-11/12',
};

export const Box = forwardRef<SquareProps>((props, ref) => {
  const { children, ...rest } = props;

  const values = {
    ref,
  };

  return (
    <BoxLayout {...rest} {...values}>
      {children}
    </BoxLayout>
  );
});
