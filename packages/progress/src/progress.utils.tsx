import { keyframes } from '@nature-ui/system';
import { isFunction, valueToPercent } from '@nature-ui/utils';

/**
 * CSS Animation for progress spin effect
 */
export const spin = keyframes`
0% {
stroke-dasharray: 1, 400;
stroke-dashoffset: 0;
}

50% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -100;
}

100% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -200;
}
`;

/**
 * CSS Animation for progress rotate effect
 */
export const rotate = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;

/**
 * CSS Animation for progress indeterminate effect
 */
export const progress = keyframes`
  0% { left: -40% }
  100% { left: 100% }
`;

/**
 * CSS Animation for progress stripe effect
 */
export const stripe = keyframes`
from {background-position: 1rem 0;}
too {background-position: 0 0;}
`;

export interface GetProgressPropsOptions {
  value?: number;
  min: number;
  max: number;
  valueText?: string;
  getValueText?(value?: number, percent?: number): string;
  isIndeterminate?: boolean;
}

/**
 * Get the common `aria-*` attributes for both the linear and circular
 * progress components
 */
export const getProgressProps = (options: GetProgressPropsOptions) => {
  const {
    value = 0,
    min,
    max,
    valueText,
    getValueText,
    isIndeterminate,
  } = options;

  const percent = valueToPercent(value, min, max);

  const getAriaValueText = () => {
    if (value == null) return undefined;
    return isFunction(getValueText) ? getValueText(value, percent) : valueText;
  };

  const bind = {
    'data-indeterminate': isIndeterminate ? '' : undefined,
    'aria-valuemax': max,
    'aria-valuemin': min,
    'aria-valuenow': isIndeterminate ? undefined : value,
    'aria-valuetext': getAriaValueText(),
    role: 'progressbar',
  };

  return {
    bind,
    percent,
    value,
  };
};
