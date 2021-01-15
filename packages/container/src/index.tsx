import * as React from 'react';
import { nature, PropsOf, clsx } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';

const DivTag = nature('div');

export type ContainerProps = PropsOf<typeof DivTag>;

// type Omitted = "size" | "boxSize" | "width" | "height" | "w" | "h"

export type SquareProps = ContainerProps & {
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
  xs: 'lg:w-1/4',
  sm: 'lg:w-1/3',
  md: 'lg:w-2/5',
  lg: 'lg:w-2/4',
  xl: 'lg:w-3/5',
};

export const Container = (props: SquareProps) => {
  const {
    children,
    className = '',
    size = 'Lg',
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

  const _classNames = clsx(className, 'md:w-4/5 w-5/6', {
    [sizes[size]]: SIZE,
    'mx-auto': centered,
    [CENTER_CONTENT]: centerContent,
  });

  return (
    <DivTag
      {...rest}
      className={_classNames}
      css={{
        width: SIZE,
      }}
    >
      {children}
    </DivTag>
  );
};

if (__DEV__) {
  Container.displayName = 'Container';
}
