import {
  isArray,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isInputEvent,
  isNotEmptyObject,
  isNotNumber,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from '../src';

describe('Assertion test: ', () => {
  test('is number', () => {
    expect(isNumber(1.3)).toBe(true);
    expect(isNumber('20')).toBe(false);
  });

  test('is object', () => {
    expect(isObject([])).toBe(false);
    expect(isObject({})).toBe(true);
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
