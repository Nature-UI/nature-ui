import { ariaAttr, callAllHandler } from '@nature-ui/utils';
import React from 'react';
// eslint-disable-next-line import/no-cycle
import { FormControlOptions, useFormControlContext } from './form-control';

export type UseFormControlProps<T extends HTMLElement> = FormControlOptions & {
  id?: string;
  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
};

export const useFormControlProps = <T extends HTMLElement>(
  props: UseFormControlProps<T>,
) => {
  const field = useFormControlContext();

  const {
    id,
    disabled,
    readonly,
    required,
    isRequired,
    isInvalid,
    isReadOnly,
    isDisabled,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const labelIds: string[] = props['aria-describedby']
    ? [props['aria-describedby']]
    : [];

  // Error message must be described first in all scenarios
  if (field?.hasFeedbackText && field?.isInvalid) {
    labelIds.push(field.feedbackId);
  }

  if (field?.hasHelpText) {
    labelIds.push(field.helpTextId);
  }

  return {
    ...rest,
    'aria-describedby': labelIds.join(' ') ?? undefined,
    id: id ?? field?.id,
    isDisabled: disabled ?? isDisabled ?? field?.isDisabled,
    isReadOnly: readonly ?? isReadOnly ?? field?.isReadOnly,
    isRequired: required ?? isRequired ?? field?.isRequired,
    isInvalid: isInvalid ?? field?.isInvalid,
    onFocus: callAllHandler(field?.onFocus, onFocus),
    onBlur: callAllHandler(field?.onBlur, onBlur),
  };
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
  const { isDisabled, isInvalid, isReadOnly, isRequired, ...rest } =
    useFormControlProps(props);

  return {
    ...rest,
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    'aria-invalid': ariaAttr(isInvalid),
    'aria-required': ariaAttr(isRequired),
    'aria-readonly': ariaAttr(isReadOnly),
  };
};
