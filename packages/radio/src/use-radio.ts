import { useFormControlContext } from '@nature-ui/form-control';
import { useBoolean, useControllableProp, useId } from '@nature-ui/hooks';
import { PropGetter } from '@nature-ui/react-utils';
import { ariaAttr, callAllHandler, dataAttr, Dict } from '@nature-ui/utils';
import { visuallyHiddenStyle } from '@nature-ui/visually-hidden';
import * as React from 'react';
import { InputDOMAttributes } from './../../react-utils/src/types';
import { useRadioGroupContext } from './radio-group';

/**
 * Prevent `onBlur` being fired when the checkbox label is touched
 */
const stop = (event: React.SyntheticEvent) => {
  event.preventDefault();
  event.stopPropagation();
};
export interface UseRadioProps {
  /**
   * id assigned to input
   */
  id?: string;
  /**
   * The name of the input field in a radio
   * (Useful for form submission).
   */
  name?: string;
  /**
   * The value to be used in the radio button.
   * This is the value that will be returned on form submission.
   */
  value?: string | number;
  /**
   * If `true`, the radio will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: boolean;
  /**
   * If `true`, the radio will be initially checked.
   */
  defaultChecked?: boolean;
  /**
   * If `true`, the radio will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true` and `isDisabled` is true, the radio will remain
   * focusable but not interactive.
   */
  isFocusable?: boolean;
  /**
   * If `true`, the radio will be read-only
   */
  isReadOnly?: boolean;
  /**
   * If `true`, the radio button will be invalid. This sets `aria-invalid` to `true`.
   */
  isInvalid?: boolean;
  /**
   * If `true`, the radio button will be invalid. This sets `aria-invalid` to `true`.
   */
  isRequired?: boolean;
  /**
   * Function called when checked state of the `input` changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  'data-radiogroup'?: any;
  /**
   * Refers to the `id` of the element that labels the radio element.
   */
  'aria-describedby'?: string;
}

export interface RadioState {
  isInvalid: boolean | undefined;
  isFocused: boolean;
  isChecked: boolean;
  isActive: boolean;
  isHovered: boolean;
  isDisabled: boolean | undefined;
  isReadOnly: boolean | undefined;
  isRequired: boolean | undefined;
}

export const useRadio = (props: UseRadioProps = {}) => {
  const {
    defaultChecked,
    isChecked: isCheckedProp,
    isFocusable,
    isDisabled: isDisabledProp,
    isReadOnly: isReadOnlyProp,
    isRequired: isRequiredProp,
    onChange,
    isInvalid: isInvalidProp,
    name,
    value,
    id: idProp,
    'data-radiogroup': dataRadioGroup,
    'aria-describedby': ariaDescribedBy,
    ...htmlProps
  } = props;

  const uuid = useId(undefined, 'radio');

  const formControl = useFormControlContext();
  const group = useRadioGroupContext();

  const isWithinRadioGroup = !!group || !!dataRadioGroup;
  const isWithinFormControl = !!formControl;

  let id = isWithinFormControl && !isWithinRadioGroup ? formControl.id : uuid;
  id = idProp ?? id;

  const isDisabled = isDisabledProp ?? formControl?.isDisabled;
  const isReadOnly = isReadOnlyProp ?? formControl?.isReadOnly;
  const isRequired = isRequiredProp ?? formControl?.isRequired;
  const isInvalid = isInvalidProp ?? formControl?.isInvalid;
  const { onFocus, onBlur } = formControl ?? {};

  const [isFocused, setFocused] = useBoolean();
  const [isHovered, setHovering] = useBoolean();
  const [isActive, setActive] = useBoolean();

  const [isCheckedState, setChecked] = React.useState(Boolean(defaultChecked));

  const [isControlled, isChecked] = useControllableProp(
    isCheckedProp,
    isCheckedState,
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly || isDisabled) {
        event.preventDefault();

        return;
      }

      if (!isControlled) {
        setChecked(event.target.checked);
      }

      onChange?.(event);
    },
    [isControlled, isDisabled, isReadOnly, onChange],
  );

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setActive.on();
      }
    },
    [setActive],
  );

  const onKeyUp = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setActive.off();
      }
    },
    [setActive],
  );

  const getRadioProps: PropGetter = React.useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      'data-active': dataAttr(isActive),
      'data-hover': dataAttr(isHovered),
      'data-disabled': dataAttr(isDisabled),
      'data-invalid': dataAttr(isInvalid),
      'data-checked': dataAttr(isChecked),
      'data-focus': dataAttr(isFocused),
      'data-readonly': dataAttr(isReadOnly),
      'aria-hidden': true,
      onMouseDown: callAllHandler(props.onMouseDown, setActive.on),
      onMouseUp: callAllHandler(props.onMouseUp, setActive.off),
      onMouseEnter: callAllHandler(props.onMouseEnter, setHovering.on),
      onMouseLeave: callAllHandler(props.onMouseLeave, setHovering.off),
    }),
    [
      isActive,
      isHovered,
      isDisabled,
      isInvalid,
      isChecked,
      isFocused,
      isReadOnly,
      setActive.on,
      setActive.off,
      setHovering.on,
      setHovering.off,
    ],
  );

  const getInputProps: PropGetter<InputDOMAttributes, InputDOMAttributes> =
    React.useCallback(
      (props: Dict = {}, ref = null) => {
        const trulyDisabled = isDisabled && !isFocusable;
        return {
          ...props,
          ref,
          type: 'radio',
          name,
          value,
          id,
          onChange: callAllHandler(props.onChange, handleChange),
          onBlur: callAllHandler(props.onBlur, setFocused.off),
          onFocus: callAllHandler(props.onFocus, setFocused.on),
          onKeyDown: callAllHandler(props.onKeyDown, onKeyDown),
          onKeyUp: callAllHandler(props.onKeyUp, onKeyUp),
          checked: isChecked,
          disabled: trulyDisabled,
          readOnly: isReadOnly,
          required: isRequired,
          'aria-invalid': ariaAttr(isInvalid),
          'aria-required': ariaAttr(isRequired),
          'aria-disabled': ariaAttr(trulyDisabled),
          'data-readonly': dataAttr(isReadOnly),
          'aria-describedby': ariaDescribedBy,
          style: visuallyHiddenStyle,
        };
      },
      [
        isDisabled,
        isFocusable,
        id,
        name,
        value,
        handleChange,
        onBlur,
        setFocused,
        onFocus,
        onKeyDown,
        onKeyUp,
        isChecked,
        isReadOnly,
        isRequired,
        isInvalid,
        ariaDescribedBy,
      ],
    );

  const getLabelProps: PropGetter = (props: Dict = {}, ref = null) => {
    return {
      ...props,
      ref,
      style: {
        ...props.style,
        touchAction: 'none',
      },
      onMouseDown: callAllHandler(props.onMouseDown, stop),
      onTouchStart: callAllHandler(props.onTouchState, stop),
      'data-disabled': dataAttr(isDisabled),
      'data-checked': dataAttr(isChecked),
      'data-invalid': dataAttr(isInvalid),
    };
  };

  const getRootProps: PropGetter = (props, ref = null) => ({
    ...props,
    ref,
    'data-disabled': dataAttr(isDisabled),
    'data-checked': dataAttr(isChecked),
    'data-invalid': dataAttr(isInvalid),
  });

  const state: RadioState = {
    isInvalid,
    isFocused,
    isChecked,
    isActive,
    isHovered,
    isDisabled,
    isReadOnly,
    isRequired,
  };

  return {
    state,
    getCheckboxProps: getRadioProps,
    getInputProps,
    getLabelProps,
    getRootProps,
    htmlProps,
  };
};

export type UseRadioReturn = ReturnType<typeof useRadio>;
