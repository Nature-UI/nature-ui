import { addItem, removeItem } from '../src';

const array = [1, 2, 3, 4, 5, 6, 7, 8];

describe('remove and add operations', () => {
  test('should add new item to the end of array', () => {
    const result = addItem(array, 9);

    expect(result).toStrictEqual([...array, 9]);
  });

  test('should remove a given item from array', () => {
    const result = removeItem(array, 8);

    expect(result).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
