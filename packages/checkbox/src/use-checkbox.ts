import * as React from 'react';
import {
  useBoolean,
  useControllableProp,
  useSafeLayoutEffect,
} from '@nature-ui/hooks';
import { callAllHandler, dataAttr, mergeRefs, Dict } from '@nature-ui/utils';
import { visuallyHiddenStyle } from '@nature-ui/visually-hidden';

export interface UseCheckboxProps {
  /**
   * If `true`, the checkbox will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: boolean;
  /**
   * If `true`, the checkbox will be indeterminate.
   * This only affects the icon shown inside checkbox
   * and does not modify the isChecked property.
   */
  isIndeterminate?: boolean;
  /**
   * If `true`, the checkbox will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true` and `isDisabled` is passed, the checkbox will
   * remain tabbable but not interactive
   */
  isFocusable?: boolean;
  /**
   * If `true`, the checkbox will be readonly
   */
  isReadOnly?: boolean;
  /**
   * If `true`, the checkbox is marked as invalid.
   * Changes style of unchecked state.
   */
  isInvalid?: boolean;
  /**
   * If `true`, the checkbox input is marked as required,
   * and `required` attribute will be added
   */
  isRequired?: boolean;
  /**
   * If `true`, the checkbox will be initially checked.
   */
  defaultIsChecked?: boolean;
  /**
   * The callback invoked when the checked state of the `Checkbox` changes..
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * The name of the input field in a checkbox
   * (Useful for form submission).
   */
  name?: string;
  /**
   * The value to be used in the checkbox input.
   * This is the value that will be returned on form submission.
   */
  value?: string | number;
  /**
   * id assigned to input
   */
  id?: string;
}

/**
 * useCheckbox
 *
 * React hook that provides all the state and focus management logic
 * for a checkbox.
 *
 * It is consumed by the `Checkbox` component
 *
 */
export const useCheckbox = (props: UseCheckboxProps = {}) => {
  const {
    defaultIsChecked,
    isChecked: checkedProp,
    isFocusable,
    isDisabled,
    isReadOnly,
    isRequired,
    onChange,
    isIndeterminate,
    isInvalid,
    name,
    value,
    id,
    ...htmlProps
  } = props;

  const [isFocused, setFocused] = useBoolean();
  const [isHovered, setHovered] = useBoolean();
  const [isActive, setActive] = useBoolean();

  const ref = React.useRef<HTMLInputElement>(null);

  const [checkedState, setCheckedState] = React.useState(
    Boolean(defaultIsChecked)
  );

  const [isControlled, isChecked] = useControllableProp(
    checkedProp,
    checkedState
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly || isDisabled) {
        event.preventDefault();

        return;
      }

      if (!isControlled) {
        if (isChecked) {
          setCheckedState(event.target.checked);
        } else {
          setCheckedState(isIndeterminate ? true : event.target.checked);
        }
      }

      onChange?.(event);
    },
    [isReadOnly, isDisabled, isChecked, isControlled, isIndeterminate, onChange]
  );

  useSafeLayoutEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = Boolean(isIndeterminate);
    }
  }, [isIndeterminate]);

  const trulyDisabled = isDisabled && !isFocusable;

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === ' ') {
        setActive.on();
      }
    },
    [setActive]
  );

  const handleKeyUp = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === ' ') {
        setActive.off();
      }
    },
    [setActive]
  );

  const getCheckboxProps = (prop: CustomCheckboxProps = {}) => {
    return {
      ...prop,
      'data-active': dataAttr(isActive),
      'data-hover': dataAttr(isHovered),
      'data-checked': dataAttr(isChecked),
      'data-focus': dataAttr(isFocused),
      'data-indeterminate': dataAttr(isIndeterminate),
      'data-disabled': dataAttr(isDisabled),
      'data-invalid': dataAttr(isInvalid),
      'data-readonly': dataAttr(isReadOnly),
      'aria-hidden': true,
      onMouseDown: callAllHandler(prop.onMouseDown, setActive.on),
      onMouseUp: callAllHandler(prop.onMouseUp, setActive.off),
      onMouseEnter: callAllHandler(prop.onMouseEnter, setHovered.on),
      onMouseLeave: callAllHandler(prop.onMouseLeave, setHovered.off),
      style: {
        touchAction: 'none',
        ...prop.style,
      },
    };
  };

  const getInputProps = (prop: HiddenInputProps = {}) => {
    return {
      ...prop,
      ref: mergeRefs(ref, prop.ref),
      type: 'checkbox',
      name,
      value,
      id,
      onChange: callAllHandler(prop.onChange, handleChange),
      onBlur: callAllHandler(prop.onBlur, setFocused.off),
      onFocus: callAllHandler(prop.onFocus, setFocused.on),
      onKeyDown: callAllHandler(prop.onKeyDown, handleKeyDown),
      onKeyUp: callAllHandler(prop.onKeyUp, handleKeyUp),
      required: isRequired,
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      'aria-invalid': isInvalid,
      'aria-disabled': isDisabled,
      style: visuallyHiddenStyle,
    };
  };

  return {
    state: {
      isInvalid,
      isFocused,
      isChecked,
      isActive,
      isHovered,
      isIndeterminate,
      isDisabled,
      isReadOnly,
      isRequired,
    },
    getCheckboxProps,
    getInputProps,
    getLabelProps: (prop: Dict = {}) => {
      /**
       * Prevent `onBlur` being fired when the checkbox label is touched
       */
      const stop = (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
      };

      return {
        ...prop,
        onMouseDown: callAllHandler(prop.onMouseDown, stop),
        onTouchStart: callAllHandler(prop.onTouchState, stop),
        'data-disabled': dataAttr(isDisabled),
        'data-checked': dataAttr(isChecked),
        'data-invalid': dataAttr(isInvalid),
      };
    },
    htmlProps,
  };
};

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>;

interface CustomCheckboxProps {
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface HiddenInputProps {
  ref?: React.Ref<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
