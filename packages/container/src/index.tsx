/** ** */
import { nature, PropsOf, clsx } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

// type Omitted = "size" | "boxSize" | "width" | "height" | "w" | "h"

export type ContainerProps = PropsOf<typeof nature.div> & {
  /**
   * The size (width and height) of the square
   * It uses the range value in your tailwind.config.js file
   * i.e lg = w-2/3
   * Also accept values like 100%, 20px, 40 ...
   */
  size?: string | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * If `true`, the content will be centered in the square
   */
  centerContent?: boolean;
  centered?: boolean;
};

const sizes = {
  xs: 'max-w-xl',
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-screen-xl',
};

export const Container = (props: ContainerProps) => {
  const {
    children,
    className = '',
    size = 'lg',
    centerContent = false,
    centered = false,
    ...rest
  } = props;

  const CENTER_CONTENT = 'flex items-center justify-center';

  let SIZE;

  Object.keys(sizes).forEach((_size) => {
    if (!size.includes(_size)) {
      SIZE = size;
    } else {
      SIZE = size;
    }
  });

  const _classNames = clsx(className, {
    [sizes[size]]: sizes[size],
    'mx-auto': centered,
    [CENTER_CONTENT]: centerContent,
  });

  return (
    <nature.div
      {...rest}
      className={_classNames}
      css={{
        width: SIZE,
      }}
    >
      {children}
    </nature.div>
  );
};

if (__DEV__) {
  Container.displayName = 'Container';
}
