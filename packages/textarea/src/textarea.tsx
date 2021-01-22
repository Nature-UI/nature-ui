/** @jsx jsx */
import { jsx, nature, PropsOf, clsx } from '@nature-ui/system';
import * as React from 'react';
import { FormControlOptions, useFormControl } from '@nature-ui/form-control';
import { __DEV__ } from '@nature-ui/utils';

const TextareaTag = nature('textarea');

type OmittedTypes = 'disabled' | 'required' | 'readOnly' | 'size';
interface TextareaOptions {
  /**
   * The border color when the textarea is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue-500"
   */
  focusBorderColor?: string;
  /**
   * The border color when the textarea is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red-500"
   */
  errorBorderColor?: string;
  /**
   * If `true`, the textarea element will span the full width of its parent
   *
   * @deprecated
   * This component defaults to 100% width,
   * please use the props `maxWidth` or `width` to configure
   */
  isFullWidth?: boolean;
  size?: string;
}

const _sizes = {
  xs: 'p-2 text-xs rounded-sm',
  sm: 'text-sm p-3 rounded',
  md: 'text-md rounded-md p-4',
  lg: 'text-lg rounded-lg p-5',
};

type TextAreaProps = Omit<PropsOf<'textarea'>, OmittedTypes> &
  FormControlOptions &
  TextareaOptions;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const inputProps = useFormControl<HTMLTextAreaElement>(props);
    const {
      className = '',
      focusBorderColor,
      errorBorderColor,
      size = 'sm',
      ...rest
    } = props;

    const { 'aria-invalid': isInvalid } = inputProps;

    let SIZE;
    Object.keys(_sizes).forEach((i) => {
      if (!i.includes(size)) {
        SIZE = size;
      }
    });

    console.log(_sizes[size]);

    const _className = clsx(className, 'w-full border-solid border-2', {
      [`focus:border-${focusBorderColor}`]: focusBorderColor,
      [`border-${errorBorderColor || 'red-600'}`]:
        errorBorderColor || isInvalid,
      'focus:border-blue-500': !focusBorderColor,
      [_sizes[size]]: _sizes[size],
    });

    return (
      <TextareaTag
        ref={ref}
        className={_className}
        css={{
          minHeight: '80px',
          lineHeight: 'short',
          fontSize: SIZE,
        }}
        {...inputProps}
        {...rest}
      />
    );
  },
);

if (__DEV__) {
  Textarea.displayName = 'Textarea';
}
