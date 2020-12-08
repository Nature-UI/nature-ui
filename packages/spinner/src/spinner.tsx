import * as React from 'react';
import { nature, PropsOf, clsx, css, keyframes } from '@nature-ui/system';
import VisuallyHidden from '@nature-ui/visually-hidden';
import { __DEV__ } from '@nature-ui/utils';

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
  label?: string;
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
      label = 'Loading...',
      ...rest
    } = props;

    const _css = css`
      border-radius: 100%;

      animation: spin 0.5s infinite linear;
    `;

    const spin = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    `;

    const DEFAULTS = `inline-block overflow-hidden border-2 border-transparent border-t-2 align-middle`;
    const _classNames = clsx(className, _css, spin, DEFAULTS, {
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
      >
        {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </SpinnerComp>
    );
  }
);

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}
