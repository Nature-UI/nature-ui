/** ** */
import { clsx, css, HTMLNatureProps, nature } from '@nature-ui/system';
import { isUndefined, StringOrNumber, __DEV__ } from '@nature-ui/utils';
import React from 'react';
import { getProgressProps, rotate, spin } from './progress.utils';

type CircleProps = HTMLNatureProps<'circle'> & {
  /**
   * The color name of the progress track.
   */
  trackColor?: string;
  /**
   * The color of the progress indicator.
   */
  colorScheme?: string;
  _transition?: string;
  _animation?: string;
};

/**
 * Circle
 *
 * SVG circle element visually indicating the shape of the component
 */
const Circle = (props: CircleProps) => {
  const {
    className = '',
    trackColor,
    colorScheme,
    _animation,
    _transition,
    ...rest
  } = props;

  const _className = clsx(
    `stroke-current text-${trackColor || colorScheme}`,
    {
      [className]: className,
    },
    _animation,
    _transition,
  );

  return (
    <nature.circle
      className={_className}
      cx={50}
      cy={50}
      fill='transparent'
      r={42}
      {...rest}
    />
  );
};

if (__DEV__) {
  Circle.displayName = 'Circle';
}

type ShapeProps = HTMLNatureProps<'svg'> & {
  size?: StringOrNumber;
  isIndeterminate?: boolean;
  children?: React.ReactNode;
};

/**
 * Shape
 *
 * SVG wrapper element for the component's circular shape
 */
const Shape = (props: ShapeProps) => {
  const { size, isIndeterminate, className, ...rest } = props;

  const _className = clsx(
    {
      [css`
        animation: ${rotate} 2s linear infinite;
      `]: isIndeterminate,
    },
    className,
  );

  return (
    <nature.svg
      className={_className}
      width={size}
      height={size}
      viewBox='0 0 100 100'
      {...rest}
    />
  );
};

if (__DEV__) {
  Shape.displayName = 'Shape';
}

interface CircularProgressOptions {
  /**
   * The size of the circular progress in CSS units
   */
  size?: StringOrNumber;
  /**
   * Maximum value defining 100% progress made (must be higher than 'min')
   */
  max?: number;
  /**
   * Minimum value defining 'no progress' (must be lower than 'max')
   */
  min?: number;
  /**
   * The thickness of progress indicator as a ratio of `size`. Must be between `0` and `1`
   */
  thickness?: StringOrNumber;
  /**
   * Current progress (must be between min/max)
   */
  value?: number;
  /**
   * If `true`, the cap of the progress indicator will be rounded.
   */
  capIsRound?: boolean;
  /**
   * The content of the circular progress bar. If passed, the content will be inside and centered in the progress bar.
   */
  children?: React.ReactNode;
  /**
   * The color name of the progress track.
   */
  trackColor?: string;
  /**
   * The color of the progress indicator.
   */
  colorScheme?: string;
  /**
   * The desired valueText to use in place of the value and also displayed within the circular-progress
   */
  valueText?: string;
  /**
   * If `true`, will show the percentage of progress bar
   */
  showPercent?: boolean;
  /**
   * A function that returns the desired valueText to use in place of the value
   */
  getValueText?(value?: number, percent?: number): string;
  /**
   * If `true`, the progress will be indeterminate and the `value`
   * prop will be ignored
   */
  isIndeterminate?: boolean;
}

export type CircularProgressProps = HTMLNatureProps<'div'> &
  CircularProgressOptions;

/**
 * CircularProgressLabel
 *
 * CircularProgress component label. In most cases it's a numeric indicator
 * of the circular progress component's value
 */
export const CircularProgressLabel = (
  props: HTMLNatureProps<'div'> & {
    fontSize?: StringOrNumber;
  },
) => {
  const { className = '', fontSize = '0.7rem', ...rest } = props;

  const STYLES = css`
    top: 50%;
    left: 50%;
    width: 100%;
    text-align: center;
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: ${fontSize};
  `;

  const _className = clsx(STYLES, {
    [className]: className,
  });

  return <nature.div className={_className} {...rest} />;
};

/**
 * React component used to indicate the progressof an activity
 *
 * It's built using `svg` and `circle` components.
 */
export const CircularProgress: React.FC<CircularProgressProps> = (props) => {
  const {
    size = '32px',
    max = 100,
    min = 0,
    valueText,
    getValueText,
    value,
    capIsRound,
    children,
    thickness = '10px',
    colorScheme = 'blue-500',
    trackColor = 'gray-300',
    showPercent,
    isIndeterminate,
    className,
    ...rest
  } = props;

  const progress = getProgressProps({
    min,
    max,
    value,
    valueText,
    getValueText,
    isIndeterminate,
  });

  const _size = typeof size === 'string' ? size : `${size}px`;

  const determinant = isIndeterminate
    ? undefined
    : (progress.percent ?? 0) * 2.64;

  const strokeDasharray = isUndefined(determinant)
    ? undefined
    : `${determinant} ${264 - determinant}`;

  const _animation = css`
    animation: ${spin} 1.5s linear infinite;
  `;

  const _transition = css`
    transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease;
  `;

  const indicatorProps = isIndeterminate
    ? {
        _animation,
      }
    : {
        strokeDashoffset: 66,
        strokeDasharray,
        _transition,
      };

  const _fontSize = `${(20 / 100) * parseFloat(_size)}px`;

  return (
    <nature.div
      className={clsx('inline-block relative align-middle', className)}
      {...progress.bind}
      {...rest}
    >
      <Shape size={_size} isIndeterminate={isIndeterminate}>
        <Circle trackColor={trackColor} strokeWidth={thickness} />

        <Circle
          colorScheme={colorScheme}
          strokeWidth={thickness}
          strokeLinecap={capIsRound ? 'round' : undefined}
          {...indicatorProps}
        />
      </Shape>
      {showPercent && !valueText ? (
        <CircularProgressLabel fontSize={_fontSize}>
          {value}%
        </CircularProgressLabel>
      ) : valueText ? (
        <CircularProgressLabel fontSize={_fontSize}>
          {valueText}
        </CircularProgressLabel>
      ) : (
        children
      )}
    </nature.div>
  );
};

if (__DEV__) {
  CircularProgress.displayName = 'CircularProgress';
}
