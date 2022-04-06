import memoizeOne from 'memoize-one';
import { isFunction } from './assertions';
import { FunctionArguments } from './types';

export const runIfFn = <T, U>(
  valueOrFn: T | ((...args: U[]) => T),
  ...args: U[]
): T => {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
};

export const callAllHandler = <T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) => {
  return (event: FunctionArguments<T>[0]): any => {
    fns.some((fn) => {
      fn?.(event);

      return event?.defaultPrevented;
    });
  };
};

export { memoizeOne };

export const once = (fn?: Function | null): any => {
  let result: any;

  return function (this: any, ...args: any[]) {
    if (fn) {
      result = fn.apply(this, args);
      fn = null;
    }

    return result;
  };
};

/**
 *
 * @param value a valid tailwindcss color
 * Avoid specifying where the color is going to be applied
 * @example `blue-400`, `blue-200` is a valid color
 * things like `bg-red-500`, `text-gray-100`... are invalid values.
 */
export const darken = (
  value: string,
  amount?: number,
): {
  color: string;
  shade: number;
} => {
  const splitStr = value.split('-');

  if (splitStr.length > 2) {
    throw new Error(`${value} is an invalid type`);
  }

  let result = {
    color: splitStr[0],
    shade: Number(splitStr[1]),
  };

  if (result.shade >= 800) {
    result.shade = result.shade - (amount || 200);
  } else {
    result.shade = result.shade + (amount || 200);
  }

  return result;
};

export const lighten = (
  value: string,
  amount?: number,
): {
  color: string;
  shade: number;
} => {
  const splitStr = value.split('-');

  let result = {
    color: splitStr[0],
    shade: Number(splitStr[1]),
  };

  if (result.shade <= 200) {
    result.shade = 100;
  } else {
    result.shade = result.shade - (amount || 200);
  }

  return result;
};
