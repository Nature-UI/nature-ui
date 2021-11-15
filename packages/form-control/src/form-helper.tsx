import { useSafeLayoutEffect } from '@nature-ui/hooks';
import { clsx, forwardRef, nature, PropsOf } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import React from 'react';
import { useFormControlContext } from './form-control';

/**
 * FormHelperText
 */
const StyledHelperText = (props: PropsOf<typeof nature.div>) => (
  <nature.div {...props} />
);

export type HelpTextProps = PropsOf<typeof StyledHelperText>;

/**
 * FormHelperText
 *
 * Assistive componenet that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const FormHelperText = forwardRef(
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

    const _className = clsx('mt-2 text-sm text-gray-400', className);

    return (
      <StyledHelperText
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
