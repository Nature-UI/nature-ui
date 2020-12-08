import {
  addItem,
  getFirstItem,
  getLastItem,
  getPrevIndex,
  getPrevItem,
  removeIndex,
  removeItem,
  getNextIndex,
  getNextItem,
  chunk,
  getNextItemFromSearch,
} from '../src';

const array = [1, 2, 3, 4, 5, 6, 7, 8];

describe('first or last item queries', () => {
  test('should get first item', () => {
    expect(getFirstItem(array)).toStrictEqual(1);
  });

  test('should get last item', () => {
    expect(getLastItem(array)).toStrictEqual(8);
  });
});

describe('previous item/index queries', () => {
  test('should loop if at the end', () => {
    const currentIndex = 0;
    const result = getPrevItem(currentIndex, array);

    expect(result).toStrictEqual(8);
  });

  test('should get previous item', () => {
    const currentIndex = 5;
    const result = getPrevItem(currentIndex, array);

    expect(result).toStrictEqual(5);
  });

  test('should get previous index given current index', () => {
    expect(getPrevIndex(0, 5)).toStrictEqual(4);
  });
});

describe('remove and add operations', () => {
  test('should remove item at indexOf', () => {
    const result = removeIndex(array, 2);

    expect(result).toStrictEqual([1, 2, 4, 5, 6, 7, 8]);
  });

  test('should add new item to the end of array', () => {
    const result = addItem(array, 9);

    expect(result).toStrictEqual([...array, 9]);
  });

  test('should remove a given item from array', () => {
    const result = removeItem(array, 8);

    expect(result).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});

describe('next item or index queries', () => {
  test('should get the next index', () => {
    const currentIndex = 1;
    const result = getNextIndex(currentIndex, array.length);

    expect(result).toStrictEqual(2);
  });

  test('should get the next item based on current index', () => {
    const currentIndex = 1;
    const result = getNextItem(currentIndex, array);

    expect(result).toStrictEqual(3);
  });

  test('should loop index back to start', () => {
    const currentIndex = 7;
    const result = getNextIndex(currentIndex, array.length);

    expect(result).toStrictEqual(0);
  });
});

describe('chunk array', () => {
  test('should chunk symmetric array into 2 groups', () => {
    const result = chunk(array, 4);

    expect(result).toStrictEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]);
  });

  test('should chunk non-symetric array into 2 groups', () => {
    const _array = [1, 2, 3, 4, 5, 6, 7];

    const result = chunk(_array, 4);

    expect(result).toStrictEqual([
      [1, 2, 3, 4],
      [5, 6, 7],
    ]);
  });
});

test('get next item based on search', () => {
  const _array = [{ value: 'React' }, { value: 'Vue' }, { value: 'Svelte' }];
  const currentItem = { value: 'React' };
  const result = getNextItemFromSearch(
    _array,
    'vu',
    (item) => item.value,
    currentItem
  );

  expect(result).toStrictEqual({ value: 'Vue' });
});
