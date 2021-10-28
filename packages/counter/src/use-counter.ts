import { useCallbackRef, useControllableProp } from '@nature-ui/hooks';
import {
  maxSafeInteger,
  minSafeInteger,
  StringOrNumber,
} from '@nature-ui/utils';
import { useCallback, useState } from 'react';
import {
  clampValue,
  countDecimalPlaces,
  toPrecision,
} from './../../utils/src/numbers';

const parse = (value: StringOrNumber) =>
  parseFloat(value.toString().replace(/[^\w.-]+/g, ''));

const getDecimalPlaces = (value: number, step: number) =>
  Math.max(countDecimalPlaces(step), countDecimalPlaces(value));

function cast(value: StringOrNumber, step: number, precision?: number) {
  const parsedValue = parse(value);
  if (Number.isNaN(parsedValue)) return undefined;
  const decimalPlaces = getDecimalPlaces(parsedValue, step);
  return toPrecision(parsedValue, precision ?? decimalPlaces);
}

export interface UseCounterProps {
  /**
   * The callback fired when the value changes.
   * @param valueAsString The value as a string.
   * @param valueAsNumber The value as a number.
   * @returns void
   */
  onChange?(valueAsString: string, valueAsNumber: number): void;
  /**
   * The number of decimal places to round to.
   * @default 0
   */
  precision?: number;

  /**
   * The initial value of the counter. should be less than `max` and greater than `min`.
   */
  defaultValue?: StringOrNumber;

  /**
   * The value of the counter. should be less than `max` and greater than `min`.
   */
  value?: StringOrNumber;
  /**
   * The step used to increment or decrement the value
   */
  step?: number;
  /**
   * The minimum value of the counter
   * @default -Infinity
   */
  min?: number;
  /**
   * The maximum value of the counter
   * @default Infinity
   */
  max?: number;
  /**
   * This controls the value update behavior in general.
   *
   * - If `true` and you use the stepper or up/down arrow keys,
   *  the value will not exceed the `max` or go lower than `min`
   *
   * - If `false`, the value will be allowed to go out of range.
   *
   * @default true
   */
  keepWithinRange?: boolean;
}

export const useCounter = (props: UseCounterProps = {}) => {
  const {
    onChange,
    precision: precisionProp,
    defaultValue,
    value: valueProp,
    step: stepProp = 1,
    min = minSafeInteger,
    max = maxSafeInteger,
    keepWithinRange = true,
  } = props;

  const onChangeProp = useCallbackRef(onChange);

  const [valueState, setValue] = useState<StringOrNumber>(() => {
    if (defaultValue == null) return '';
    return cast(defaultValue, stepProp, precisionProp) ?? '';
  });

  /**
   * Because the component that consumes this hook can be controlled or uncontrolled
   * we'll keep track of that
   */
  const [isControlled, value] = useControllableProp(valueProp, valueState);

  const decimalPlaces = getDecimalPlaces(parse(value), stepProp);

  const precision = precisionProp ?? decimalPlaces;

  const update = useCallback(
    (next: StringOrNumber) => {
      if (next === value) return;
      if (!isControlled) {
        setValue(next.toString());
      }
      onChangeProp?.(next.toString(), parse(next));
    },
    [onChangeProp, isControlled, value],
  );

  /**
   * Function to clamp the value and around it to the precision
   */
  const clamp = useCallback(
    (v: number) => {
      let nextValue = v;

      if (keepWithinRange) {
        nextValue = clampValue(nextValue, min, max);
      }

      return toPrecision(nextValue, precision);
    },
    [precision, keepWithinRange, max, min],
  );

  const increment = useCallback(
    (_step = stepProp) => {
      let next: StringOrNumber;

      /**
       * Let's follow the native browser behavior for
       * scenarios where the input starts empty
       */
      if (value === '') {
        next = parse(_step);
      } else {
        next = parse(value) + _step;
      }

      next = clamp(next as number);
      update(next);
    },
    [clamp, stepProp, update, value],
  );

  const decrement = useCallback(
    (_step = stepProp) => {
      let next: StringOrNumber;

      if (value === '') {
        next = parse(-_step);
      } else {
        next = parse(value) - _step;
      }

      next = clamp(next as number);
      update(next);
    },
    [clamp, stepProp, update, value],
  );

  const reset = useCallback(() => {
    let next: StringOrNumber;
    if (defaultValue == null) {
      next = '';
    } else {
      next = cast(defaultValue, stepProp, precisionProp) ?? min;
    }
    update(next);
  }, [defaultValue, precisionProp, stepProp, update, min]);

  const castValue = useCallback(
    (v: StringOrNumber) => {
      const nextValue = cast(v, stepProp, precisionProp) ?? min;
      update(nextValue);
    },
    [precision, stepProp, update, min],
  );

  const valueAsNumber = parse(value);

  /**
   * Common range checks
   */
  const isOutOfRange = valueAsNumber > max || valueAsNumber < min;
  const isAtMax = valueAsNumber === max;
  const isAtMin = valueAsNumber === min;

  return {
    isOutOfRange,
    isAtMax,
    isAtMin,
    precision,
    value,
    valueAsNumber,
    update,
    reset,
    increment,
    decrement,
    clamp,
    cast: castValue,
    setValue,
  };
};
