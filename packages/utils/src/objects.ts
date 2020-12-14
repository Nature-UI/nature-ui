import merge from 'deepmerge';

import { Omit, Dict } from './types';

export const omit = <T extends Dict, K extends keyof T>(
  object: T,
  keys: K[],
) => {
  const result: Dict = {};

  Object.keys(object).forEach((key) => {
    if (!keys.includes(key as any)) {
      result[key] = object[key];
    }
  });

  return result as Omit<T, K>;
};

export const pick = <T extends Dict, K extends keyof T>(
  object: T,
  keys: K[],
) => {
  const result = {} as { [P in K]: T[P] };

  Object.keys(keys).forEach((key) => {
    if (key in object) {
      result[key] = object[key];
    }
  });

  return result;
};

export const split = <T extends Dict, K extends keyof T>(
  object: T,
  keys: K[],
) => {
  const picked: Dict = {};
  const omitted: Dict = {};

  Object.keys(object).forEach((key) => {
    if (keys.includes(key as T[K])) {
      picked[key] = object[key];
    } else {
      omitted[key] = object[key];
    }
  });

  return [picked, omitted] as [{ [P in K]: T[P] }, Omit<T, K>];
};

/**
 * Get value from a deeply nested object using a string path
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */

export const get = (
  obj: any,
  path: string | number,
  fallback?: any,
  index?: number,
) => {
  // @ts-ignore
  path = (path?.split?.('.') ?? [path]) as string;

  for (index = 0; index < path.length; index++) {
    obj = obj ? obj[path[index]] : undefined;
  }

  const result = obj === undefined ? fallback : obj;

  return result;
};

/**
 * Get value from deeply nested object, based on path
 * It returns the path value if not found in object
 *
 * @param path - the string path or value
 * @param scale - the string path or value
 */

export const getWithDefault = (path: any, scale: any) => {
  return get(scale, path, path);
};

export { merge };

export const filterUndefined = (object: Dict) => {
  const result = { ...object };

  Object.keys(result).forEach((item) => {
    if (typeof result[item] === 'undefined') {
      delete result[item];
    }
  });

  return result;
};

export const objectKeys = <T extends Dict>(obj: T) =>
  (Object.keys(obj) as unknown) as (keyof T)[];
