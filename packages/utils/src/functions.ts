import memoizeOne from 'memoize-one';

import { FunctionArguments } from './types';
import { isFunction } from './assertions';

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
      // eslint-disable-next-line no-unused-expressions
      fn && fn(event);

      return event && event.defaultPrevented;
    });
  };
};

export { memoizeOne };

export const once = (fn?: Function | null): any => {
  let result: any;

  // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
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
 * @example `blue-400`, `orange-200` is a valid color
 * things like `bg-red-500`, `text-gray-100`... are invalid values.
 */

export const darken = (value: string, amount = 100): string => {
  const splitStr = value.split('-');

  if (splitStr.length > 2) {
    throw new Error(`${value} is an invalid type`);
  }

  const dept = Number(splitStr[1]);
  const color = splitStr[0];

  if (dept >= 800) {
    return `${color}-${dept - amount ?? 200}`;
  }

  return `${color}-${dept + amount ?? 200}`;
};

export const lighten = (value: string, amount = 100): string => {
  const color = value.split('-')[0];

  return `${color}-${amount}`;
};
