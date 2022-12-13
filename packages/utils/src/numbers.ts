import { isNotNumber } from './assertions';
import { warn } from './logger';

export const minSafeInteger = Number.MIN_SAFE_INTEGER || -9007199254740991;
export const maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991;

/**
 * Convert a value to number
 * @param value the value to convert
 */
const toNumber = (value: any) => {
  const num = parseFloat(value);

  return isNotNumber(num) ? 0 : num;
};

/**
 * Converts a value to a specific precision (or decimal points).
 *
 * Returns a string representing a number in fixed-point notation.
 *
 * @param value the value to convert
 * @param precision the precision or decimal points
 */
export const toPrecision = (value: number, precision?: number) => {
  let nextValue: string | number = toNumber(value);
  const _pres = precision ?? 10;
  const scaleFactor = 10 ** _pres;

  nextValue = Math.round(nextValue * scaleFactor) / scaleFactor;

  return precision ? nextValue.toFixed(precision) : nextValue.toString();
};

/**
 * Counts the number of decimal places a number has
 *
 * @param value the decimal value to count
 */
export const countDecimalPlaces = (value: number) => {
  if (!Number.isFinite(value)) return 0;

  let e = 1;
  let p = 0;

  while (Math.round(value * e) / e !== value) {
    e *= 10;
    p++;
  }

  return p;
};

/**
 * Convert a value to percentage based on lower and upper bound values
 *
 * @param value the value in number
 * @param min the minimum value
 * @param max the maximum value
 */
export const valueToPercent = (value: number, min: number, max: number) =>
  ((value - min) * 100) / (max - min);

/**
 * Clamps a value to ensure it stays within the min and max range.
 *
 * @param value the value to clamp
 * @param min the minimum value
 * @param max the maximum value
 */
export const clampValue = (value: number, min: number, max: number) => {
  if (value === null) return value;

  warn({
    condition: max < min,
    message: '[Nature UI] clamp: max cannot be less than min',
  });

  return Math.min(Math.max(value, min), max);
};
