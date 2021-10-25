import { clsx, forwardRef, nature, PropsOf } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';

const BoxLayout = nature('div');

export type BoxProps = PropsOf<typeof BoxLayout>;

// type Omitted = "size" | "boxSize" | "width" | "height" | "w" | "h"

export type SquareProps = BoxProps & {
  size?: string;
  /**
   * If `true`, the content will be centered in the square
   */
  centerContent?: boolean;
  centered?: boolean;
};

export const Box = forwardRef<SquareProps>((props, ref) => {
  const {
    children,
    className = '',
    size,
    centerContent = false,
    centered = false,
    ...rest
  } = props;

  const CENTER_CONTENT = 'flex items-center justify-center';

  const _classNames = clsx(
    {
      'mx-auto': centered,
      [CENTER_CONTENT]: centerContent,
    },
    className,
  );

  const defaults = size
    ? {
        css: {
          width: size,
        },
      }
    : {};

  return (
    <BoxLayout ref={ref} {...defaults} className={_classNames} {...rest}>
      {children}
    </BoxLayout>
  );
});

if (__DEV__) {
  Box.displayName = 'Box';
}
