import { clsx, forwardRef, HTMLNatureProps, nature } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import { useFormControlContext } from '.';

export interface RequiredIndicatorProps extends HTMLNatureProps<'span'> {}

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required
 */
export const RequiredIndicator = forwardRef<RequiredIndicatorProps, 'span'>(
  (props, ref) => {
    const field = useFormControlContext();

    if (!field?.isRequired) return null;

    return <nature.span {...field?.getRequiredIndicatorProps(props, ref)} />;
  },
);

if (__DEV__) {
  RequiredIndicator.displayName = 'RequiredIndicator';
}

export interface FormLabelProps extends HTMLNatureProps<'label'> {
  /**
   * @type React.ReactElement
   */
  requiredIndicator?: React.ReactElement;
}

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field
 *
 * Accessibility: Every form field should have a form label
 */
export const FormLabel = forwardRef<FormLabelProps, 'label'>((props, ref) => {
  const { className = '', requiredIndicator, children, ...rest } = props;

  const field = useFormControlContext();
  const ownProps = field?.getLabelProps(rest, ref) ?? { ref, ...rest };
  return (
    <nature.label {...ownProps} className={clsx(className)}>
      {children}
      {field.isRequired && (requiredIndicator || <RequiredIndicator />)}
    </nature.label>
  );
});

if (__DEV__) {
  FormLabel.displayName = 'FormLabel';
}
