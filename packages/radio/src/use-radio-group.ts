import { useControllableProp, useId } from '@nature-ui/hooks';
import {
  isInputEvent,
  StringOrNumber,
  Dict,
  mergeRefs,
} from '@nature-ui/utils';
import React, { useCallback, useRef, useState } from 'react';

type EventOrValue = React.ChangeEvent<HTMLInputElement> | StringOrNumber;

export interface UseRadioGroupProps {
  /**
   * The value of the radio to be `checked`
   * (in controlled mode)
   */
  value?: StringOrNumber;
  /**
   * The value of the radio to be `checked`
   * initially (in uncontrolled mode)
   */
  defaultValue?: StringOrNumber;
  /**
   * Function called once a radio is checked
   * @param nextValue the value of the checked radio
   */
  onChange?(nextValue: StringOrNumber): void;
  /**
   * The `name` attribute forwarded to each `radio` element
   */
  name?: string;
  /**
   * If `true`, input elements will receive
   * `checked` attribute instead of `isChecked`.
   *
   * This assumes, you're using native radio inputs
   */
  isNative?: boolean;
}

/**
 * React hook to manage a group of radio inputs
 */
export const useRadioGroup = (props: UseRadioGroupProps = {}) => {
  const {
    onChange: onChangeProp,
    value: valueProp,
    defaultValue,
    name: nameProp,
    isNative,
    ...htmlProps
  } = props;

  const [valueState, setValue] = useState<StringOrNumber>(defaultValue || '');

  const [isControlled, value] = useControllableProp(valueProp, valueState);

  const ref = useRef<any>(null);

  const focus = useCallback(() => {
    const rootNode = ref.current;

    if (!rootNode) return;

    let query = 'input:not(:disabled):checked';

    const firstEnabledAndCheckedInput = rootNode.querySelector(
      query,
    ) as HTMLElement;

    if (firstEnabledAndCheckedInput) {
      firstEnabledAndCheckedInput.focus();

      return;
    }

    query = 'input:not(:disabled)';

    const firstEnabledInput = rootNode.querySelector(query) as HTMLElement;

    firstEnabledInput?.focus();
  }, []);

  /**
   * All radio options must use the same name
   */
  const name = useId(nameProp, 'radio');

  const onChange = useCallback(
    (eventOrValue: EventOrValue) => {
      const nextValue = isInputEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue;

      if (!isControlled) {
        setValue(nextValue);
      }

      onChangeProp?.(nextValue);
    },
    [onChangeProp, isControlled],
  );

  return {
    getRootProps: (_props: Dict = {}) => ({
      ..._props,
      ref: mergeRefs(_props.ref, ref),
      role: 'radiogroup',
    }),
    getRadioProps: (_props: Dict = {}) => {
      const checkedKey = isNative ? 'checked' : 'isChecked';

      return {
        ..._props,
        name,
        [checkedKey]: _props.value === value,
        onChange,
      };
    },
    name,
    ref,
    focus,
    setValue,
    value,
    onChange,
    htmlProps,
  };
};

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;
