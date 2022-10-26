import { Dict, Omit } from './types';

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

export const objectKeys = <T extends Dict>(obj: T) =>
  Object.keys(obj) as unknown as (keyof T)[];
