import {
  clsx,
  forwardRef,
  HTMLNatureProps,
  keyframes,
  nature,
} from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import VisuallyHidden from '@nature-ui/visually-hidden';

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

interface SpinnerOptions {
  emptyColor?: string;
  /**
   * The color of the spinner
   */
  color?: string;
  /**
   * The thickness of the spinner
   * @example
   * ```jsx
   * <Spinner thickness="4px"/>
   * ```
   */
  thickness?: string;
  size?: string;
  label?: string;
  speed?: string;
}

export interface SpinnerProps
  extends Omit<HTMLNatureProps<'div'>, keyof SpinnerOptions>,
    SpinnerOptions {}

export const Spinner = forwardRef<SpinnerProps, 'div'>((props, ref) => {
  const {
    className,
    thickness = '2px',
    speed = '0.45s',
    emptyColor = 'transparent',
    color = 'blue-500',
    size = '1.5rem',
    label = 'Loading...',
    ...rest
  } = props;

  const spinnerStyles = {
    animation: `${spin} ${speed} linear infinite`,
    borderWidth: thickness,
    width: size,
    height: size,
    borderBottomColor: emptyColor,
    borderLeftColor: emptyColor,
    ...(props.css as any),
  };

  return (
    <nature.div
      className={clsx(
        `inline-block border-current border-solid rounded-full`,
        {
          [`text-${color}`]: color,
        },
        className,
      )}
      css={spinnerStyles}
      ref={ref}
      {...rest}
    >
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </nature.div>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}
