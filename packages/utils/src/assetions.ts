import { ChangeEvent } from 'react';

import { Dict } from './types';

export const isFunction = (value: unknown): value is Function => {
  return typeof value === 'function';
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

export const isNotNumber = (value: unknown): boolean =>
  typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNumber = (value: any): number => {
  if (isNumber(value)) {
    return value;
  }

  return Number.parseFloat(value);
};

export const isNumeric = (value: unknown): boolean => {
  return isNumber(value) && value !== null && value - value + 1 >= 0;
};

export const isArray = <T>(value: unknown): value is Array<T> => {
  return Array.isArray(value);
};

export const isEmptyArray = (value: unknown): boolean =>
  isArray(value) && value.length === 0;

export const isDefined = (value: unknown): boolean =>
  typeof value === 'undefined' || value === undefined;

export const isUndefined = (value: any): value is undefined =>
  typeof value === 'undefined' || value === undefined;

export const isObject = (value: unknown): value is Dict => {
  const type = typeof value;

  return (
    value !== null &&
    (type === 'object' || type === 'function') &&
    !isArray(value)
  );
};

export const isEmptyObject = (value: unknown): boolean =>
  isObject(value) && !Object.keys(value).length;

export const isNotEmptyObject = (value: unknown): value is object =>
  value && !isEmptyObject(value);

export const isNull = (value: unknown): value is null => value === null;

export const isString = (value: unknown): value is string =>
  Object.prototype.toString.call(value) === '[object String]';

export const isInputEvent = (value: unknown): value is ChangeEvent =>
  value && isObject(value) && isObject(value.target);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isEmpty = (value: any): boolean => {
  if (isArray(value)) return isEmptyArray(value);

  if (isObject(value)) return isEmptyObject(value);

  if (value === null || value.trim === '') return true;

  return false;
};

export const __DEV__ = process.env.NODE_ENV !== 'production';
