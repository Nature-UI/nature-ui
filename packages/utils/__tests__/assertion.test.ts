import {
  isArray,
  isDefined,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isInputEvent,
  isNotEmptyObject,
  isNotNumber,
  isNull,
  isNumber,
  isNumeric,
  isObject,
  isString,
  isUndefined,
} from '../src';

describe('Assertion test: ', () => {
  test('is number', () => {
    expect(isNumber(1.3)).toBe(true);
    expect(isNumber('20')).toBe(false);
  });

  test('is integer', () => {
    expect(isNumeric('1.03')).toBe(true);
    expect(isNumeric('2.1232')).toBe(true);

    expect(isNumeric('2.03.34')).toBe(false);
    expect(isNumeric('dfd')).toBe(false);
  });

  test('is object', () => {
    expect(isObject([])).toBe(false);
    expect(isObject({})).toBe(true);
  });

  test('is empty', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(null)).toBe(true);

    expect(isEmpty([1, 2])).toBe(false);
    expect(isEmpty({ a: 2 })).toBe(false);
    expect(isEmpty('df')).toBe(false);
  });

  test('is empty object', () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ a: 3 })).toBe(false);
  });

  test('is not number', () => {
    expect(isNotNumber('1')).toBe(true);
    expect(isNotNumber(1)).toBe(false);
  });

  test('is array', () => {
    expect(isArray([1])).toBe(true);
  });

  test('is empty array', () => {
    expect(isEmptyArray([])).toBe(true);
  });

  test('is function', () => {
    expect(isFunction(() => {})).toBe(true);
  });

  test('is defined', () => {
    expect(isDefined('1')).toBe(true);
  });

  test('is undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  test('is null', () => {
    expect(isNull(null)).toBe(true);
  });

  test('is string', () => {
    expect(isString('1')).toBe(true);
  });

  test('is input event', () => {
    expect(isInputEvent({ target: {} })).toBe(true);
  });

  test('should check is object is not empty', () => {
    expect(isNotEmptyObject({})).toBe(false);
    expect(isNotEmptyObject({ size: 'sm' })).toBe(true);
  });
});
