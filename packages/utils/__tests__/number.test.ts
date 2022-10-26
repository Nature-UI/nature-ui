import {
  clampValue,
  countDecimalPlaces,
  toPrecision,
  valueToPercent,
} from '../src';

describe('Number test', () => {
  test('should round number to specific prevision', () => {
    expect(toPrecision(1.4567, 2)).toStrictEqual('1.46');
  });

  test('should return number of decimal places', () => {
    expect(countDecimalPlaces(1.1231)).toStrictEqual(4);
  });

  test('should return percent of value in a specific range', () => {
    expect(valueToPercent(5, 0, 10)).toStrictEqual(50);
  });

  test('should clamp value to specified minimum', () => {
    expect(clampValue(5, 6, 10)).toStrictEqual(6);
  });
});
