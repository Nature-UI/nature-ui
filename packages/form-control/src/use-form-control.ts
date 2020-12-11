import React from 'react';
import { ariaAttr, dataAttr, callAllHandler, Dict } from '@nature-ui/utils';

import { FormControlOptions, useFormControlContext } from './form-control';

export type UseFormControlProps<T extends HTMLElement> = FormControlOptions & {
  id?: string;
  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
  disabled?: boolean;
  readonly?: boolean;
};

/**
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 */
export const useFormControl = <T extends HTMLElement>(
  props: UseFormControlProps<T>,
) => {
  const field = useFormControlContext();
  const describedBy: string[] = [];

  if (field?.isInvalid) {
    /**
     * Error message must be described first
     * in all scenarios
     */
    if (describedBy.length > 0) {
      describedBy.unshift(field.feedbackId);
    } else {
      describedBy.push(field.feedbackId);
    }
  }

  if (field?.hasHelpText) describedBy.push(field.helptextId);

  const ariaDescribedBy = describedBy.join(' ');

  return {
    ...props,
    id: props.id ?? field?.id,
    disabled: props.disabled || props.isDisabled || field?.isDisabled,
    readOnly: props.readonly || props.isReadOnly || field?.isReadOnly,
    'aria-invalid': ariaAttr(props.isInvalid || field?.isInvalid),
    'aria-required': ariaAttr(props.isRequired || field?.isRequired),
    'aria-readonly': ariaAttr(props.isReadOnly || field?.isReadOnly),
    'aria-describedby': ariaDescribedBy || undefined,
    onFocus: callAllHandler(field?.onFocus, props.onFocus),
    onBlur: callAllHandler(field?.onBlur, props.onBlur),
  };
};

export const useFormControlLabel = (props: Dict) => {
  const field = useFormControlContext();

  return {
    ...props,
    'data-focus': dataAttr(field?.isFocused),
    'data-disabled': dataAttr(field?.isDisabled),
    'data-invalid': dataAttr(field?.isInvalid),
    'data-loading': dataAttr(field?.isLoading),
    'data-readonly': dataAttr(field?.isReadOnly),
    id: props.id ?? field?.labelId,
    htmlFor: props.htmlFor ?? field?.id,
  };
};
