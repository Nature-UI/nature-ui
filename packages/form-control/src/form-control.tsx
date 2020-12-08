/** @jsx jsx */
import { clsx, jsx, nature, PropsOf } from '@nature-ui/system';
import { __DEV__, createContext } from '@nature-ui/utils';
import * as React from 'react';
import { useBoolean, useId, useSafeLayoutEffect } from '@nature-ui/hooks';
import { Icon, SvgIconProps } from '@nature-ui/icon';

import { useFormControlLabel } from './use-form-control';

const DivTag = nature('div');
const LabelTag = nature('label');
const SpanTag = nature('span');

export interface FormControlOptions {
  /**
   * If `true`, the form control will be required. This has 2 side effects:
   * - The `FormLabel` will show a required indicator
   * - The form element (e.g, Input) will have `aria-required` set to `true``
   */
  isRequired?: boolean;
  /**
   * If `true`, the form control will be disabled. This has 2 side effects:
   * - The `FormLabel` will have `data-disabled` attribute
   * - The form element (e.g, Input) will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true`, the form control will be invalid. This has 2 side effects:
   * - The `FormLabel` and `FormErrorIcon` will have `data-invalid` set to `true`
   * - The form element (e.g, Input) will have `aria-invalid` set to `true`
   */
  isInvalid?: boolean;
  /**
   * If `true`, the form control will be readonly
   */
  isReadOnly?: boolean;
  /**
   * If `true`, the form control will be in it's `loading` state
   */
  isLoading?: boolean;
}

interface FormControlContext extends FormControlOptions {
  /**
   * The label text used to inform users as to what information is
   * requested for a text field.
   */
  label?: string;
  /**
   * The error message to be displayed when `isInvalid` is set to `true`
   */
  errorText?: string;
  /**
   * The assistive text to be displayed that provides additional guidance to users
   */
  helperText?: string;
  /**
   * The custom `id` to use for the form control. This is passed directly to the form element (e.g, Input).
   * - The form element (e.g Input) gets the `id`
   * - The form label id: `form-label-${id}`
   * - The form error text id: `form-error-text-${id}`
   * - The form helper text id: `form-helper-text-${id}`
   */
  id?: string;
}

type FieldContext = Omit<ReturnType<typeof useProvider>, 'htmlProps'>;

const [FormControlContextProvider, useFormControlContext] = createContext<
  FieldContext
>({
  strict: false,
  name: 'FormControlContext',
});

export { useFormControlContext };

const useProvider = (props: FormControlContext) => {
  const {
    id: idProp,
    isReadOnly,
    isRequired,
    isDisabled,
    isLoading,
    isInvalid,
    ...htmlProps
  } = props;

  const uuid = useId();
  const id = idProp || `field-${uuid}`;

  const labelId = `${id}-label`;
  const feedbackId = `${id}-feedback`;
  const helptextId = `${id}-helptext`;

  /**
   * Track of when the `FormHelperText` has been rendered.
   * Er use this to append it's id the `aria-describedby` of the `input`
   */
  const [hasHelpText, setHasHelpText] = useBoolean();

  // Lets keep track of when we focus the form element (e.g `input`)
  const [isFocused, setFocus] = useBoolean();

  const context = {
    isRequired: Boolean(isRequired),
    isInvalid: Boolean(isInvalid),
    isLoading: Boolean(isLoading),
    isReadOnly: Boolean(isReadOnly),
    isDisabled: Boolean(isDisabled),
    isFocused: Boolean(isFocused),
    onFocus: setFocus.on,
    onBlur: setFocus.off,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helptextId,
    htmlProps,
  };

  return context;
};

const StyledFormControl = (props: PropsOf<typeof DivTag>) => {
  const { className = '', ...rest } = props;

  const _className = clsx(`w-full relative`, {
    [className]: className,
  });

  return <DivTag role='group' className={_className} {...rest} />;
};

export type FormControlProps = FormControlContext &
  PropsOf<typeof StyledFormControl>;
/**
 * FormControl
 *
 * React component that provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements
 *
 * This is commonly used in form elements such as `input`, `select`, `textarea`, etc
 */
export const FormControl = React.forwardRef(
  (props: FormControlProps, ref: React.Ref<any>) => {
    const { htmlProps, ...context } = useProvider(props);

    return (
      <FormControlContextProvider value={context}>
        <StyledFormControl ref={ref} {...htmlProps} />
      </FormControlContextProvider>
    );
  }
);

if (__DEV__) {
  FormControl.displayName = 'FormControl';
}

/**
 * label
 */
const StyledLabel = (props: PropsOf<typeof LabelTag>) => {
  const { className = '', ...rest } = props;

  const _className = clsx(`block text-left`, {
    [className]: className,
  });

  return <LabelTag className={_className} {...rest} />;
};

export type FormLabelProps = PropsOf<typeof StyledLabel>;

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to infor users as to what information is required for a form field.
 *
 * Accessibility: Every form field should have a form label
 */
export const FormLabel = React.forwardRef(
  (props: FormLabelProps, ref: React.Ref<any>) => {
    const { className = '', ...rest } = props;

    const _className = clsx(`mb-2`, {
      [className]: className,
    });
    const ownProps = useFormControlLabel(rest);

    return <StyledLabel ref={ref} className={_className} {...ownProps} />;
  }
);

if (__DEV__) {
  FormLabel.displayName = 'FormLabel';
}

/**
 * RequiredIndicator
 */
const StyledIndicator = ({
  'aria-hidden': AriaHidden = true,
  ...rest
}: PropsOf<typeof SpanTag>) => {
  return <SpanTag role='presentation' aria-hidden={AriaHidden} {...rest} />;
};

export type RequiredIndicatorProps = PropsOf<typeof StyledIndicator>;

/**
 * Used to show a `required` text or an asterisks (*) to indicate that a field is required
 */
export const RequiredIndicator = React.forwardRef(
  (props: RequiredIndicatorProps, ref: React.Ref<HTMLSpanElement>) => {
    const field = useFormControlContext();

    if (!field?.isRequired) return null;

    return (
      <StyledIndicator ref={ref} {...props}>
        {props.children || '*'}
      </StyledIndicator>
    );
  }
);

if (__DEV__) {
  RequiredIndicator.displayName = 'RequiredIndicator';
}

/**
 * FormHelperText
 */
const StyledHelperText = (props: PropsOf<typeof DivTag>) => (
  <DivTag {...props} />
);

export type HelpTextProps = PropsOf<typeof StyledHelperText>;

/**
 * FormHelperText
 *
 * Assistive componenet that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const FormHelperText = React.forwardRef(
  (props: HelpTextProps, ref: React.Ref<any>) => {
    const field = useFormControlContext();
    const { className = '', ...rest } = props;

    /**
     * Notify the field context when the help text is rendered on
     * screen, so we can apply the correct `aria-describedby` to the field (e.g input, textarea)
     */
    useSafeLayoutEffect(() => {
      field?.setHasHelpText.on();

      return () => field?.setHasHelpText.off();
    }, []);

    const _className = clsx(`mt-2 text-sm text-gray-600`, {
      [className]: className,
    });

    return (
      <StyledHelperText
        className={_className}
        ref={ref}
        id={props.id ?? field?.helptextId}
        {...rest}
      />
    );
  }
);

if (__DEV__) {
  FormHelperText.displayName = 'FormHelperText';
}

/**
 * ErrorText
 */
const StyledErrorText = (props: PropsOf<typeof DivTag>) => {
  const { className = '', ...rest } = props;

  const _className = clsx(`flex items-center`, {
    [className]: className,
  });

  return <DivTag {...rest} className={_className} aria-live='polite' />;
};

export type FormErrorMessageProps = PropsOf<typeof StyledErrorText>;

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FormErrorMessage = React.forwardRef(
  (props: FormErrorMessageProps, ref: React.Ref<any>) => {
    const { className = '', ...rest } = props;
    const field = useFormControlContext();

    if (!field?.isInvalid) return null;

    const _className = clsx(`text-sm mt-2  text-red-600`, {
      [className]: className,
    });

    return (
      <StyledErrorText
        className={_className}
        ref={ref}
        id={props.id ?? field?.feedbackId}
        {...rest}
      />
    );
  }
);

if (__DEV__) {
  FormErrorMessage.displayName = 'FormErrorMessage';
}

/**
 * Used as the visual indicator that a field is invalid or
 * a field has incorrect values
 */
export const FormErrorIcon = React.forwardRef(
  (props: SvgIconProps, ref: React.Ref<any>) => {
    const field = useFormControlContext();

    if (!field?.isInvalid) return null;
    const { className = '', ...rest } = props;
    const _className = clsx(`mr-2 text-red-600`, {
      [className]: className,
    });

    return (
      <Icon
        boxSize='1rem'
        className={_className}
        ref={ref}
        aria-hidden
        {...rest}
      >
        <path
          fill='currentColor'
          d='M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z'
        />
      </Icon>
    );
  }
);
