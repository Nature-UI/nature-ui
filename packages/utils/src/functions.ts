import { isFunction } from './assertions';
import { FunctionArguments } from './types';

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
