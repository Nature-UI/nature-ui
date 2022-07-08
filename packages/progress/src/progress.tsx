/** ** */
import { generateStripe } from '@nature-ui/color';
import { clsx, css, HTMLNatureProps, nature } from '@nature-ui/system';
import { isUndefined, __DEV__ } from '@nature-ui/utils';
import React from 'react';
import {
  getProgressProps,
  GetProgressPropsOptions,
  progress,
  stripe,
} from './progress.utils';

export interface ProgressLabelProps extends HTMLNatureProps<'div'> {
  fontSize?: number;
}
/**
 * ProgressLabel (Linear)
 *
 * Progress component used to show the numeric value of the progress.
 */
export const ProgressLabel: React.FC<ProgressLabelProps> = ({
  className,
  fontSize = 12,
  ...rest
}) => {
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

  return <nature.div className={clsx(DEFAULTS, className)} {...rest} />;
};

if (__DEV__) {
  ProgressLabel.displayName = 'ProgressLabel';
}

export interface ProgressTrackProps
  extends HTMLNatureProps<'div'>,
    GetProgressPropsOptions {
  size?: string;
}

export type ProgressIndicatorProps = HTMLNatureProps<'div'> &
  GetProgressPropsOptions;

/**
 * ProgressTrack
 *
 * Wrapper element which houses the progress indicator and progress label.
 */
const ProgressTrack: React.FC<ProgressTrackProps> = (props) => {
  const {
    className,
    size,
    min,
    max,
    value,
    valueText,
    isIndeterminate,
    ...rest
  } = props;

  const progress = getProgressProps({
    value,
    min,
    max,
    valueText,
    isIndeterminate,
  });

  const trackStyles = clsx(className, {
    [css`
      width: ${progress.percent}%;
    `]: progress.percent,
  });
  return <nature.div className={trackStyles} {...progress.bind} {...rest} />;
};

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
  trackClassName?: string;
  indicatorClassName?: string;
  /**
   * If `true`, will show the percentage of progress bar
   */
  showPercent?: boolean;
  /**
   * If provided, will overwrite the percent label
   */
  valueText?: string;
}

const SIZES = {
  sm: 8,
  md: 12,
  lg: 16,
};

export interface ProgressProps
  extends ProgressOptions,
    HTMLNatureProps<'div'> {}

/**
 * Progress (Linear)
 *
 * Progress is used to display the progress status for a task that takes a long time or consists of several steps.
 *
 * It includes accessible attributes to help assistive technologies understand and speak the progress values
 */
export const Progress = (props: ProgressProps) => {
  const {
    value,
    min = 0,
    max = 100,
    hasStripe,
    isAnimated,
    children,
    size = 'md',
    indicatorClassName = 'bg-blue-500',
    valueText,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className,
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
  const indeterminateStyles = css`
    position: absolute;
    will-change: left;
    min-width: 50%;
    animation: ${progress} 1s ease infinite normal none running;
  `;

  const _indicatorStyles = clsx(indicatorClassName, `h-full`, {
    [stripeStyle]: shouldAddStripe,
    [stripAnimation]: shouldAnimateStripe,
    [indeterminateStyles]: isIndeterminate,
  });

  const _height = css`
    height: ${_size};
  `;
  const trackStyles = clsx(
    'overflow-hidden relative bg-gray-300 w-full h-6',
    _height,
    className,
  );

  return (
    <nature.div className={trackStyles} {...rest}>
      <ProgressTrack
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        value={value}
        valueText={valueText}
        min={min}
        max={max}
        className={_indicatorStyles}
        size={_size}
      />
    </nature.div>
  );
};

if (__DEV__) {
  Progress.displayName = 'Progress';
}
