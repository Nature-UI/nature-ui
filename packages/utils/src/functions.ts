import { isFunction } from './assertions';
import { FunctionArguments } from './types';

export const noop = () => {};

export type MaybeFunction<T, Args extends unknown[] = []> =
  | T
  | ((...args: Args) => T);

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
export const darken = (value: string, amount?: number): string => {
  const splitStr = value.split('-');

  let shade = Number(splitStr.at(-1));

  if (isNaN(shade)) {
    return value;
  }

  if (shade >= 800) {
    shade = shade - (amount || 200);
  } else {
    shade = shade + (amount || 200);
  }

  return `bg-${splitStr[1]}-${shade}`;
};

export const lighten = (value: string, amount?: number): string => {
  const splitStr = value.split('-');

  let shade = Number(splitStr.at(-1));
  if (isNaN(shade)) {
    return value;
  }

  if (shade <= 200) {
    shade = 100;
  } else {
    shade = shade - (amount || 200);
  }

  return `${splitStr[1]}-${shade}`;
};
