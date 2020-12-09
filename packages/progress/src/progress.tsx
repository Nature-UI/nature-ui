/** @jsx jsx */
import { clsx, jsx, nature, PropsOf } from '@nature-ui/system';
import { generateStripe } from '@nature-ui/color';
import { __DEV__, isUndefined } from '@nature-ui/utils';
import { css } from 'emotion';
import React from 'react';

import {
  getProgressProps,
  progress,
  GetProgressPropsOptions,
  stripe,
} from './progress.utils';

/**
 * ProgressLabel (Linear)
 *
 * Progress component used to show the numeric value of the progress.
 */
export const ProgressLabel = React.forwardRef(
  (
    {
      className = '',
      fontSize = 12,
      ...rest
    }: PropsOf<typeof nature.div> & { fontSize?: number },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const _size = `${(60 / 100) * fontSize}px`;

    const DEFAULTS = css`
      top: 50%;
      left: 50%;
      width: 100%;
      text-align: center;
      position: absolute;
      transform: translate(-50%, -50%);
      font-size: ${_size};
    `;

    const _className = clsx(DEFAULTS, {
      [className]: className,
    });

    return <nature.div className={_className} {...rest} ref={ref} />;
  }
);

if (__DEV__) {
  ProgressLabel.displayName = 'ProgressLabel';
}

export type ProgressLabelProps = PropsOf<typeof ProgressLabel>;

export type ProgressIndicatorProps = PropsOf<typeof nature.div> &
  GetProgressPropsOptions;

type CustomProps = { isIndeterminate?: boolean; size?: string };

/**
 * ProgressIndicator
 *
 */
const StyledIndicator = ({ ...rest }: PropsOf<typeof nature.div>) => (
  <nature.div {...rest} />
);

export type ProgressTrackProps = PropsOf<typeof nature.div>;

/**
 * ProgressTrack
 *
 * Wrapper element which houses the progress indicator and progress label.
 */
const ProgressTrack = React.forwardRef(
  (
    { className = '', size, ...rest }: CustomProps & ProgressTrackProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const _height = css`
      height: ${size};
    `;
    const _className = clsx(
      'overflow-hidden relative bg-gray-300 w-full h-6',
      _height,
      {
        [className]: className,
      }
    );

    return <nature.div className={_className} {...rest} ref={ref} />;
  }
);

interface ProgressOptions {
  /**
   * The `value` of the progress indicator
   * If `undefined` the progress bar will be in `indeterminate` state
   */
  value?: number;
  /**
   * The minimum value of the progress
   */
  min?: number;
  /**
   * The maximum value of the progress
   */
  max?: number;
  /**
   * If `true`, the progress bar will show stripe
   */
  hasStripe?: boolean;
  /**
   * If `true`, and hasStripe is `true`, the stripes will be animated
   */
  isAnimated?: boolean;
  /**
   * Determines the height of the progress bar
   * defaults to `md`
   */
  size?: 'sm' | 'md' | 'lg' | number;
  /**
   * Tailwindcss color scheme.
   * @example `blue-400`
   */
  colorScheme?: string;
  /**
   * If `true`, will show the percentage of progress bar
   */
  showPercent?: boolean;
  /**
   * If provided, will overwrite the percent label
   */
  label?: string;
}

const SIZES = {
  sm: 8,
  md: 12,
  lg: 16,
};

export type ProgressProps = ProgressOptions & PropsOf<typeof nature.div>;

/**
 * Progress (Linear)
 *
 * Progress is used to display the progress status for a task that takes a long time or consists of several steps.
 *
 * It includes accessible attributes to help assistive technologies understand and speak the progress values
 */
export const Progress = React.forwardRef(
  (props: ProgressProps, ref: React.Ref<any>) => {
    const {
      value,
      min = 0,
      max = 100,
      hasStripe,
      isAnimated,
      children,
      size = 'md',
      colorScheme = 'teal-400',
      showPercent = false,
      label,
      ...rest
    } = props;

    const _size = typeof size === 'string' ? `${SIZES[size]}px` : `${size}px`;

    /**
     * Generate a stripe style for the progress bar
     */
    const stripeStyle = generateStripe();

    const isIndeterminate = isUndefined(value);
    const stripAnimation = css`
      animation: ${stripe} 1s linear infinite;
    `;

    /**
     * We should not use stripe if it's `indeterminate`
     */
    const shouldAddStripe = !isIndeterminate && hasStripe;

    const shouldAnimateStripe = shouldAddStripe && isAnimated;

    /**
     * Generate styles for stipe and stripe animation
     */
    const STYLES = css`
      position: absolute;
      will-change: left;
      min-width: 50%;
      animation: ${progress} 1s ease infinite normal none running;
    `;

    const _indicatorStyles = clsx(`h-full bg-${colorScheme}`, {
      [stripeStyle]: shouldAddStripe,
      [stripAnimation]: shouldAnimateStripe,
      [STYLES]: isIndeterminate,
    });

    const _fontSize = SIZES[size] || size;

    const _progress = getProgressProps({
      value,
      min,
      max,
      valueText: label,
    });

    const DEFAULTS = clsx(_indicatorStyles, {
      [css`
        width: ${_progress.percent}%;
      `]: _progress.percent,
    });

    return (
      <ProgressTrack size={_size} {...rest} ref={ref}>
        <StyledIndicator {..._progress.bind} {...rest} className={DEFAULTS} />
        {showPercent && !label ? (
          <ProgressLabel fontSize={_fontSize}>{value}%</ProgressLabel>
        ) : label ? (
          <ProgressLabel fontSize={_fontSize}>{label}</ProgressLabel>
        ) : (
          children
        )}
      </ProgressTrack>
    );
  }
);

if (__DEV__) {
  Progress.displayName = 'Progress';
}
