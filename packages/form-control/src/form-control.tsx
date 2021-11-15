/** ** */
import { useBoolean, useId } from '@nature-ui/hooks';
import { PropGetter, PropGetterV2 } from '@nature-ui/react-utils';
import { clsx, nature, NatureComponent, PropsOf } from '@nature-ui/system';
import { createContext, dataAttr, mergeRefs, __DEV__ } from '@nature-ui/utils';
import * as React from 'react';
const DivTag = nature('div');

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

type FieldContext = Omit<
  ReturnType<typeof useFormControlProvider>,
  'htmlProps'
>;

const [FormControlContextProvider, useFormControlContext] =
  createContext<FieldContext>({
    strict: false,
    name: 'FormControlContext',
  });

export { useFormControlContext };

const useFormControlProvider = (props: FormControlContext) => {
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
  const helpTextId = `${id}-helptext`;

  /**
   * Track whether the `FormErrorMessage` has been rendered.
   * We use this to append its id to the `aria-describedby` of the `input`.
   */
  const [hasFeedbackText, setHasFeedbackText] = useBoolean(false);
  /**
   * Track of when the `FormHelperText` has been rendered.
   * Er use this to append it's id the `aria-describedby` of the `input`
   */
  const [hasHelpText, setHasHelpText] = useBoolean();

  // Lets keep track of when we focus the form element (e.g `input`)
  const [isFocused, setFocus] = useBoolean();

  const getHelpTextProps = React.useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      id: helpTextId,
      ...props,
      /**
       * Notify the field context when the help text is rendered on scree,
       * so we can apply the correct `aria-describedby` to the field.
       */
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node) return;
        setHasHelpText.on();
      }),
    }),
    [helpTextId],
  );

  const getLabelProps = React.useCallback<PropGetterV2<'label'>>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      'data-focus': dataAttr(isFocused),
      'data-disabled': dataAttr(isDisabled),
      'data-invalid': dataAttr(isInvalid),
      'data-readonly': dataAttr(isReadOnly),
      id: props.id ?? labelId,
      htmlFor: props.htmlFor ?? id,
    }),
    [id, labelId, isFocused, isDisabled, isInvalid, isReadOnly],
  );

  const getErrorMessageProps = React.useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      id: feedbackId,
      /**
       * Notify the field context when the error message is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g input, textarea).
       */
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node) return;
        setHasFeedbackText.on();
      }),
    }),
    [feedbackId],
  );

  const getRootProps = React.useCallback<PropGetterV2<'div'>>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ...htmlProps,
      ref: forwardedRef,
      role: 'group',
    }),
    [htmlProps],
  );

  const getRequiredIndicatorProps = React.useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      role: 'presentation',
      'aria-hidden': true,
      children: props.children ?? '*',
    }),
    [],
  );

  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: setFocus.on,
    onBlur: setFocus.off,
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps,
    getHelpTextProps,
    getErrorMessageProps,
    getRootProps,
    getLabelProps,
    getRequiredIndicatorProps,
  };
};

const StyledFormControl = (props: PropsOf<typeof DivTag>) => {
  const { className = '', ...rest } = props;

  const _className = clsx('w-full relative', className);

  return <DivTag role='group' className={_className} {...rest} />;
};

export type FormControlProps = NatureComponent<'div'> & FormControlContext & {};

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
    const { htmlProps, ...context } = useFormControlProvider(props);

    return (
      <FormControlContextProvider value={context}>
        <StyledFormControl ref={ref} {...htmlProps} />
      </FormControlContextProvider>
    );
  },
);

if (__DEV__) {
  FormControl.displayName = 'FormControl';
}
