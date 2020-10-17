/** @jsx jsx */
import { clsx, jsx, nature, PropsOf, css } from '@nature-ui/system';
import { FormControlOptions, useFormControl } from '@nature-ui/form-control';
import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

const InputTag = nature('input');

interface InputOptions {
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue-500"
   */
  focusBorderColor?: string;
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red-500"
   */
  errorBorderColor?: string;
  /**
   * If `true`, the input element will span the full width of it's parent
   */
  isFullWidth?: boolean;
}

type Omitted = 'disabled' | 'required' | 'readOnly' | 'size';

const _SIZES = {
  sm: {
    height: '2rem',
    fontSize: '0.875rem',
    paddingLeft: '0.75rem',    paddingRight: '0.75rem',
  },
  md: {
    height: '2.5rem',
    fontSize: '1rem',
    paddingLeft: '1rem',    paddingRight: '1rem',
  },
  lg: {
    height: '3rem',
    fontSize: '1.25rem',
    paddingLeft: '1rem',    paddingRight: '1rem',
  },
};

export interface InputProps
  extends Omit<PropsOf<typeof StyledInput>, Omitted>,
    FormControlOptions {
  size?: keyof typeof _SIZES | number;
  variant?: "outlined" | "filled" | "flushed" | "unstyled";
}

/**
 * Input - Theming
 *
 * To style the input globally, change the styles in
 * `theme.components.Input`
 */
const StyledInput = (props: PropsOf<typeof InputTag> & InputOptions) => {
  return <InputTag {...props} />;
};

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
export const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const inputProps = useFormControl<HTMLInputElement>(props);

    const { className = '', size = 'md', ...rest } = props;


    const _css = typeof size === 'string' && css(_SIZES[size])
    const _height = typeof size === 'number' && css({
      height: size + 'px',
    })

    const _className = clsx(_css,`w-full rounded px-4 outline-none border border-solid border-gray-300 focus:shadow-outline transition-all duration-150`,  _height, className);

    return (
      <StyledInput
        ref={ref}
        {...inputProps}
        {...rest}
        className={_className}
      />
    );
  }
);

if (__DEV__) {
  Input.displayName = 'Input';
}

// @ts-ignore
Input.__hidden = 'Input';
