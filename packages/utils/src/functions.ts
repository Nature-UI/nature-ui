import memoizeOne from 'memoize-one';

import { FunctionArguments } from './types';
import { isFunction } from './assetions';

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
      // eslint-disable-next-line no-param-reassign
      fn = null;
    }

    return result;
  };
};
