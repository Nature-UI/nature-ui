import {
  ariaAttr,
  dataAttr,
  getOwnerDocument,
  getWindow,
  normalizeEventKey,
} from '../src';

describe('dome tests', () => {
  test('should get window object', () => {
    expect(getWindow()).toBe(window);
  });

  test('should normalize keyboard events', () => {
    const keyboardEvent: any = {
      key: 'Left',
      keyCode: 38,
    };

    expect(normalizeEventKey(keyboardEvent)).toBe('ArrowLeft');
  });

  test('should return data attribute value from boolean', () => {
    expect(dataAttr(true)).toBe('');
  });

  test('should return aria attribute value from boolean', () => {
    expect(ariaAttr(false)).toBeUndefined();
  });

  test('should get document object', () => {
    expect(getOwnerDocument()).toBe(document);
  });
});
