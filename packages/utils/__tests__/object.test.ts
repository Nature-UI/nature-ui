import { omit } from '../src';

const object = {
  a: 1,
  b: 2,
  c: { d: 3 },
};

describe('Object tests', () => {
  test('should return object with omitted property', () => {
    expect(omit(object, ['a'])).toStrictEqual({
      b: 2,
      c: { d: 3 },
    });
  });
});
