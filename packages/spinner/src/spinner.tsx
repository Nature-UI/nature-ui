import * as React from 'react';
import { nature, PropsOf, clsx } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import './spinner.css';

interface SpinnerOptions {
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
  size?: number | 'xs' | 'sm' | 'md' | 'lg';
}

const SIZES = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
};

const SpinnerComp = nature('span');

export type SpinnerType = PropsOf<typeof SpinnerComp>;

export const Spinner = React.forwardRef(
  (props: SpinnerType & SpinnerOptions, ref: React.Ref<HTMLDivElement>) => {
    const {
      className = '',
      thickness = '2px',
      color = 'teal',
      size = 'xs',
      ...rest
    } = props;

    const DEFAULTS = `inline-block overflow-hidden spinner border-2 border-transparent border-t-2 align-middle`;
    const _classNames = clsx(DEFAULTS, {
      [className]: className,
      [`w-${SIZES[size]} h-${SIZES[size]}`]: typeof size === 'string',
      [`w-${size} h-${size}`]: typeof size === 'number',
    });

    return (
      <SpinnerComp
        className={_classNames}
        style={{
          borderTop: `${thickness} solid ${color}`,
          borderLeft: `${thickness} solid ${color}`,
        }}
        ref={ref}
        {...rest}
      />
    );
  }
);

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}
