/** @jsx jsx */
import { nature, PropsOf, jsx, clsx } from '@nature-ui/system';
import { isUndefined, StringOrNumber, __DEV__ } from '@nature-ui/utils';
import { css } from 'emotion';
import React from 'react';
import { getProgressProps, spin } from './progress.utils';

const CircleTag = nature('circle');

type CircleProps = PropsOf<typeof CircleTag> & {
  /**
   * The color name of the progress track.
   */
  trackColor?: string;
  /**
   * The color of the progress indicator.
   */
  colorScheme?: string;
};

/**
 * Circle
 *
 * SVG circle element visually indicating the shape of the component
 */
const Circle = (props: CircleProps) => {
  const { className = '', trackColor, colorScheme, ...rest } = props;

  const _className = clsx(`stroke-current text-${trackColor || colorScheme}`, {
    [className]: className,
  });

  return (
    <CircleTag
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

const SVGTag = nature('svg');

type ShapeProps = PropsOf<typeof SVGTag> & {
  size?: StringOrNumber;
  isIndeterminate?: boolean;
};

const SIZES = {
  sm: 32,
  md: 48,
  lg: 64,
};
/**
 * Shape
 *
 * SVG wrapper element for the component's circular shape
 */
const Shape = (props: ShapeProps) => {
  const { size, isIndeterminate, ...rest } = props;

  return <SVGTag width={size} height={size} viewBox='0 0 100 100' {...rest} />;
};

if (__DEV__) {
  Shape.displayName = 'Shape';
}

interface CircularProgressOptions {
  /**
   * The size of the circular progress in CSS units
   */
  size?: 'sm' | 'md' | 'lg' | number;
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
  label?: string;
  /**
   * A function that returns the desired valueText to use in place of the value
   */
  getValueText?(value?: number, percent?: number): string;
}

const ProgressTag = nature('div');

const StyledProgress = React.forwardRef(
  (props: PropsOf<typeof ProgressTag>, ref: React.Ref<HTMLDivElement>) => {
    const { className = '', ...rest } = props;
    const _className = clsx(`inline-block relative align-middle`, {
      [className]: className,
    });
    return <ProgressTag className={_className} {...rest} ref={ref} />;
  }
);

export type CircularProgressProps = PropsOf<typeof ProgressTag> &
  CircularProgressOptions;

/**
 * React component used to indicate the progressof an activity
 *
 * It's built using `svg` and `circle` components.
 */
export const CircularProgress = React.forwardRef(
  (props: CircularProgressProps, ref: React.Ref<any>) => {
    const {
      size = 'md',
      max = 100,
      min = 0,
      label,
      getValueText,
      value,
      capIsRound,
      children,
      thickness = '10px',
      colorScheme = 'blue-400',
      trackColor = 'gray-100',
      ...rest
    } = props;

    const progress = getProgressProps({
      min,
      max,
      value,
      valueText: label,
      getValueText,
    });

    const _size = typeof size === 'string' ? `${SIZES[size]}px` : `${size}px`;

    const isIndeterminate = isUndefined(progress.percent);

    const determinant = isUndefined(progress.percent)
      ? undefined
      : progress.percent * 2.64;

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
          // className: (className: string) => `${_animation} ${className}`,
        }
      : {
          strokeDashoffset: 66,
          strokeDasharray,
          // className: (className: string) => `${_transition} ${className}`,
        };

    return (
      <StyledProgress {...progress.bind} {...rest} ref={ref}>
        <Shape size={_size} isIndeterminate={isIndeterminate}>
          <Circle trackColor={trackColor} strokeWidth={thickness} />

          <Circle
            colorScheme={colorScheme}
            strokeWidth={thickness}
            strokeLinecap={capIsRound ? 'round' : undefined}
            {...indicatorProps}
          />
        </Shape>
        {children}
      </StyledProgress>
    );
  }
);

if (__DEV__) {
  CircularProgress.displayName = 'CircularProgress';
}

/**
 * CircularProgressLabel
 *
 * CircularProgress component label. In most cases it's a numeric indicator
 * of the circular progress component's value
 */
export const CircularProgressLabel = (props: PropsOf<typeof ProgressTag>) => {
  const { className = '', ...rest } = props;
  const STYLES = css`
    top: 50%;
    left: 50%;
    width: 100%;
    text-align: center;
    position: absolute;
    transform: translate(-50%, -50%);
  `;

  const _className = clsx(STYLES, {
    [className]: className,
  });
  return <ProgressTag className={_className} {...rest} />;
};
