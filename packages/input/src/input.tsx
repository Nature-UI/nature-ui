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

type Omitted = 'disabled' | 'required' | 'readOnly';

const _SIZES = {
  sm: {
    height: '2rem',
    fontSize: '0.875rem',
  },
  md: {
    height: '2.5rem',
    fontSize: '1rem',
  },
  lg: {
    height: '3rem',
    fontSize: '1.125rem',
  },
};

const _PADDING = {
  sm: {
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
  },
  md: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  lg: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
};

export type InputProps = Omit<PropsOf<typeof StyledInput>, Omitted>;

type StyledInputProps = PropsOf<typeof InputTag> &
  InputOptions &
  FormControlOptions & {
    size?: keyof typeof _SIZES | number;
    variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  };

/**
 * Input - Theming
 *
 * To style the input globally, change the styles in
 * `theme.components.Input`
 */
const StyledInput = (props: StyledInputProps) => {
  const {
    className = '',
    size = 'md',
    isInvalid,
    isReadOnly,
    isDisabled,
    variant = 'outline',
    ...rest
  } = props;

  const _padding = typeof size === 'string' && css(_PADDING[size]);
  const _css = typeof size === 'string' && css(_SIZES[size]);
  const _height =
    typeof size === 'number' &&
    css`
      height: ${size}px;
    `;

  const _border = css`
    &:focus {
      border-width: 2px;
    }
  `;

  const _invalid = `focus:border-red-500 border-red-500 border-2`;

  const _outline = variant === 'outline';
  const _filled = variant === 'filled';
  const _flushed = variant === 'flushed';
  const _unstyled = variant === 'unstyled';

  const _className = clsx(
    `w-full outline-none transition-all duration-150`,
    {
      [_invalid]: isInvalid,
      [`border`]: !isInvalid && _outline,
      [_border]: !isReadOnly && (_outline || _filled),
      'cursor-not-allowed opacity-50': isDisabled,
      'border-solid border-gray-400': _outline,
      'focus:border-blue-600': !isInvalid && (_outline || _filled),
      'hover:bg-gray-300 bg-gray-200 focus:bg-transparent': _filled,
      [`${String(_padding)} rounded`]: _filled || _outline,
      'border-b-2 border-gray-300 focus:border-blue-600': _flushed,
      [(String(_height), String(_css))]: !_unstyled,
    },
    className
  );

  return <InputTag className={_className} {...rest} />;
};

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
export const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const inputProps = useFormControl<HTMLInputElement>(props);

    return <StyledInput ref={ref} {...inputProps} />;
  }
);

if (__DEV__) {
  Input.displayName = 'Input';
}

// @ts-ignore
Input.__hidden = 'Input';
