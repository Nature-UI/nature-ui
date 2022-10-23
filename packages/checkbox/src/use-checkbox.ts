import { useFormControlProps } from '@nature-ui/form-control';
import {
  useBoolean,
  useCallbackRef,
  useControllableProp,
  useSafeLayoutEffect,
} from '@nature-ui/hooks';
import { PropGetter } from '@nature-ui/react-utils';
import { callAllHandler, dataAttr, mergeRefs, omit } from '@nature-ui/utils';
import { visuallyHiddenStyle } from '@nature-ui/visually-hidden';
import { trackFocusVisible } from '@zag-js/focus-visible';
import React, { useCallback, useEffect } from 'react';
import { CheckboxState, UseCheckboxProps } from './checkbox-types';

/**
 * Prevent `onBlur` being fired when the checkbox label is touched
 */
const stopEvent = (event: React.SyntheticEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

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
  const formControlProps = useFormControlProps(props);
  const {
    isDisabled,
    isReadOnly,
    isRequired,
    isInvalid,
    id,
    onBlur,
    onFocus,
    'aria-describedby': ariaDescribedBy,
  } = formControlProps;

  const {
    defaultIsChecked,
    isChecked: checkedProp,
    isFocusable,
    onChange,
    isIndeterminate,
    name,
    value,
    tabIndex = undefined,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-invalid': ariaInvalid,
    ...rest
  } = props;

  const htmlProps = omit(rest, [
    'isDisabled',
    'isReadOnly',
    'isRequired',
    'isInvalid',
    'id',
    'aria-describedby',
  ]);

  const [isFocused, setFocused] = useBoolean();
  const [isHovered, setHovered] = useBoolean();
  const [isActive, setActive] = useBoolean();
  const [rootIsLabelElement, setRootIsLabelElement] = useBoolean(true);
  const [isFocusVisible, setIsFocusVisible] = useBoolean();

  const ref = React.useRef<HTMLInputElement>(null);

  const [checkedState, setCheckedState] = useBoolean(Boolean(defaultIsChecked));

  useEffect(() => {
    return trackFocusVisible(setIsFocusVisible.on);
  }, []);

  const [isControlled, isChecked] = useControllableProp(
    checkedProp,
    checkedState,
  );

  const onChangeProp = useCallbackRef(onChange);
  const onBlurProp = useCallbackRef(onBlur);
  const onFocusProp = useCallbackRef(onFocus);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly || isDisabled) {
        event.preventDefault();

        return;
      }

      if (!isControlled) {
        if (isChecked) {
          setCheckedState.setState(event.target.checked);
        } else {
          setCheckedState.setState(
            isIndeterminate ? true : event.target.checked,
          );
        }
      }

      onChangeProp?.(event);
    },
    [
      isReadOnly,
      isDisabled,
      isChecked,
      isControlled,
      isIndeterminate,
      onChangeProp,
    ],
  );

  useSafeLayoutEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = Boolean(isIndeterminate);
    }
  }, [isIndeterminate]);

  const trulyDisabled = isDisabled && !isFocusable;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === ' ') {
        setActive.on();
      }
    },
    [setActive],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === ' ') {
        setActive.off();
      }
    },
    [setActive],
  );

  const getRootProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => ({
      ...htmlProps,
      ...props,
      ref: mergeRefs(forwardedRef, (node: HTMLElement) => {
        if (!node) return;
        setRootIsLabelElement.setState(node.tagName === 'LABEL');
      }),
      onClick: callAllHandler(props.onClick, () => {
        /**
         * Accessibility:
         *
         * Ideally, `getRootProps` should be spread unto a `label` element.
         *
         * If the element was changed using the `as` prop or changing
         * the dom node `getRootProps` is spread unto (to a `div` or `span`), we'll trigger
         * click on the input when the element is clicked.
         * @see Issue https://github.com/chakra-ui/chakra-ui/issues/3480
         */
        if (!rootIsLabelElement) {
          ref.current?.click();
          requestAnimationFrame(() => {
            ref.current?.focus();
          });
        }
      }),
      'data-disabled': dataAttr(isDisabled),
      'data-checked': dataAttr(isChecked),
      'data-invalid': dataAttr(isInvalid),
    }),
    [htmlProps, isDisabled, isChecked, isInvalid, rootIsLabelElement],
  );

  const getCheckboxProps: PropGetter = useCallback(
    (prop = {}, forwardedRef = null) => {
      const onPressDown = (event: React.MouseEvent) => {
        if (isFocused) {
          event.preventDefault();
        }
        setActive.on();
      };
      return {
        ...prop,
        ref: forwardedRef,
        'data-active': dataAttr(isActive),
        'data-hover': dataAttr(isHovered),
        'data-checked': dataAttr(isChecked),
        'data-focus': dataAttr(isFocused),
        'data-indeterminate': dataAttr(isIndeterminate),
        'data-disabled': dataAttr(isDisabled),
        'data-invalid': dataAttr(isInvalid),
        'data-readonly': dataAttr(isReadOnly),
        'aria-hidden': true,
        onMouseDown: callAllHandler(prop.onMouseDown, onPressDown),
        onMouseUp: callAllHandler(prop.onMouseUp, setActive.off),
        onMouseEnter: callAllHandler(prop.onMouseEnter, setHovered.on),
        onMouseLeave: callAllHandler(prop.onMouseLeave, setHovered.off),
        style: {
          touchAction: 'none',
          ...prop.style,
        },
      };
    },
    [
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isFocusVisible,
      isHovered,
      isIndeterminate,
      isInvalid,
      isReadOnly,
    ],
  );

  const getInputProps: PropGetter = useCallback(
    (prop = {}, forwardedRef = null) => {
      return {
        ...prop,
        ref: mergeRefs(ref, forwardedRef),
        type: 'checkbox',
        name,
        value,
        id,
        onChange: callAllHandler(prop.onChange, handleChange),
        onBlur: callAllHandler(prop.onBlur, onBlurProp, setFocused.off),
        onFocus: callAllHandler(prop.onFocus, onFocusProp, setFocused.on),
        onKeyDown: callAllHandler(prop.onKeyDown, handleKeyDown),
        onKeyUp: callAllHandler(prop.onKeyUp, handleKeyUp),
        required: isRequired,
        checked: isChecked,
        disabled: trulyDisabled,
        readOnly: isReadOnly,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-invalid': ariaInvalid ? Boolean(ariaInvalid) : isInvalid,
        'aria-describedby': ariaDescribedBy,
        'aria-disabled': isDisabled,
        style: visuallyHiddenStyle,
      };
    },
    [
      name,
      value,
      id,
      handleChange,
      onBlurProp,
      onFocusProp,
      handleKeyDown,
      handleKeyUp,
      isRequired,
      isChecked,
      trulyDisabled,
      isReadOnly,
      ariaLabel,
      ariaLabelledBy,
      ariaInvalid,
      isInvalid,
      ariaDescribedBy,
      isDisabled,
      tabIndex,
    ],
  );

  const getLabelProps: PropGetter = useCallback(
    (prop = {}, forwardedRef = null) => {
      return {
        ...prop,
        ref: forwardedRef,
        onMouseDown: callAllHandler(prop.onMouseDown, stopEvent),
        onTouchStart: callAllHandler(prop.onTouchState, stopEvent),
        'data-disabled': dataAttr(isDisabled),
        'data-checked': dataAttr(isChecked),
        'data-invalid': dataAttr(isInvalid),
      };
    },
    [isChecked, isDisabled, isInvalid],
  );

  const state: CheckboxState = {
    isInvalid,
    isFocused,
    isChecked,
    isActive,
    isHovered,
    isIndeterminate,
    isDisabled,
    isReadOnly,
    isRequired,
  };

  return {
    state,
    getRootProps,
    getCheckboxProps,
    getInputProps,
    getLabelProps,
    htmlProps,
  };
};

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>;
