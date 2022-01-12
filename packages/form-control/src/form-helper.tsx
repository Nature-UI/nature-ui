import { useSafeLayoutEffect } from '@nature-ui/hooks';
import { clsx, forwardRef, HTMLNatureProps, nature } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import { useFormControlContext } from './form-control';

/**
 * FormHelperText
 *
 * Assistive componenet that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const FormHelperText = forwardRef<HTMLNatureProps<'div'>, 'div'>(
  (props, ref) => {
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

    const _className = clsx('mt-2 text-sm text-gray-400', className);

    return (
      <nature.div
        className={_className}
        ref={ref}
        id={props.id ?? field?.helpTextId}
        {...rest}
      />
    );
  },
);

if (__DEV__) {
  FormHelperText.displayName = 'FormHelperText';
}
