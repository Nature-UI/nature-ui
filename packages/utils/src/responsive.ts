import { getLastItem } from './array';
import { isArray, isObject } from './assertions';
import { merge, objectKeys } from './objects';
import { Dict } from './types';

export const mapResponsive = (prop: any, mapper: (val: any) => any) => {
  if (isArray(prop)) {
    return prop.map((item) => {
      if (item === null) return null;

      return mapper(item);
    });
  }

  if (isObject(prop)) {
    return objectKeys(prop).reduce((result: Dict, key) => {
      result[key] = mapper(prop[key]);

      return result;
    }, {});
  }

  if (prop !== null) {
    return mapper(prop);
  }

  return null;
};

export const objectToArrayNotation = (obj: Dict) => {
  const base = [
    ['base', null],
    ['sm', null],
    ['md', null],
    ['lg', null],
  ];

  const entries = merge(base, Object.entries(obj));
  const mergeObj = Object.fromEntries(entries);
  let array = Object.values(mergeObj);

  let isNullBetweenValues = false;

  array.forEach((item, index) => {
    const next = array[index + 1];

    if (item === null && next !== null) {
      isNullBetweenValues = true;
    }
  });

  if (!isNullBetweenValues) {
    array = array.filter((item) => item !== null);
  }

  while (getLastItem(array) === null) {
    array.pop();
  }

  return array;
};
