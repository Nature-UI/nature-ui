import * as React from 'react';
import { useControllableProp } from '@nature-ui/hooks';
import {
  isInputEvent,
  addItem,
  removeItem,
  StringOrNumber,
  Dict,
} from '@nature-ui/utils';

type EventOrValue = React.ChangeEvent<HTMLInputElement> | StringOrNumber;

export interface UseCheckboxGroupProps {
  /**
   * The value of the checkbox group
   */
  value?: StringOrNumber[];
  /**
   * the initial value of the checkbox group
   */
  defaultValue?: StringOrNumber[];
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?(value: StringOrNumber[]): void;
  /**
   * If `true`, input elements will receive
   * `checked` attribute instead of `isChecked`
   *
   * This assumes, you're using native radio inputs
   */
  isNative?: boolean;
}

export const useCheckboxGroup = (props: UseCheckboxGroupProps) => {
  const {
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,
    isNative,
  } = props;

  const [valueState, setValue] = React.useState(defaultValue || []);
  const [isControlled, value] = useControllableProp(valueProp, valueState);

  const updateValue = React.useCallback(
    (nextState: StringOrNumber[]) => {
      if (!isControlled) {
        setValue(nextState);
      }

      onChangeProp?.(nextState);
    },
    [isControlled, onChangeProp]
  );

  const onChange = React.useCallback(
    (eventOrValue: EventOrValue) => {
      if (!value) return;

      const isChecked = isInputEvent(eventOrValue)
        ? eventOrValue.target.checked
        : !value.includes(eventOrValue);

      const selectedValue = isInputEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue;

      const nextValue = isChecked
        ? addItem(value, selectedValue)
        : removeItem(value, selectedValue);

      updateValue(nextValue);
    },
    [updateValue, value]
  );

  return {
    value,
    onChange,
    setValue: updateValue,
    getCheckboxProps: (prop: Dict) => {
      const checkedKey = isNative ? 'checked' : 'isChecked';

      return {
        ...prop,
        [checkedKey]: value.includes(prop.value),
        onChange,
      };
    },
  };
};

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>;
