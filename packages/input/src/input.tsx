/** ** */
import { FormControlOptions } from '@nature-ui/form-control';
import {
  clsx,
  css,
  forwardRef,
  HTMLNatureProps,
  nature,
} from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';
import { InputLeftAddon, InputRightAddon } from './input-addon';

interface InputOptions {
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue-600"
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
  /**
   * Left addon: It can be an icon or any form of JSX element
   * and would be positioned the left.
   */
  addonLeft?: React.ReactNode;
  /**
   * Right addon: It can be an icon or any form of JSX element
   * and would be positioned the right.
   */
  addonRight?: React.ReactNode;
}

type Omitted = 'disabled' | 'required' | 'readOnly' | 'size';

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

export interface InputProps
  extends Omit<HTMLNatureProps<'input'>, Omitted>,
    InputOptions,
    FormControlOptions {
  size?: keyof typeof _SIZES | number;
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
}

/**
 * Input - Theming
 *
 * To style the input globally, change the styles in
 * `theme.components.Input`
 */
export const Input = forwardRef<InputProps, 'input'>((props, ref) => {
  const {
    className = '',
    size = 'md',
    isInvalid,
    isReadOnly,
    isDisabled,
    variant = 'outline',
    addonLeft,
    addonRight,
    focusBorderColor,
    errorBorderColor,
    ...rest
  } = props;

  const _addon = addonLeft || addonRight;

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

  const _focusBorderColor = focusBorderColor || 'blue-600';
  const _errorBorderColor = errorBorderColor || 'red-500';
  const _invalid = `focus:border-${_errorBorderColor} border-${_errorBorderColor} border-2`;

  const _outline = variant === 'outline';
  const _filled = variant === 'filled';
  const _flushed = variant === 'flushed';
  const _unstyled = variant === 'unstyled';

  const _className = clsx(
    'w-full outline-none transition-all duration-150',
    {
      [_invalid]: isInvalid,
      border: !isInvalid && _outline,
      [_border]: !isReadOnly && (_outline || _filled),
      'cursor-not-allowed opacity-50': isDisabled,
      'border-solid border-gray-200': _outline,
      [`focus:border-${_focusBorderColor}`]:
        !isInvalid && (_outline || _filled),
      'hover:bg-gray-300 bg-gray-200 focus:bg-transparent': _filled,
      [`${String(_padding)} rounded`]: _filled || _outline,
      [`border-b-2 border-gray-200 focus:border-${_focusBorderColor}`]:
        _flushed,
      [(String(_height), String(_css))]: !_unstyled,
    },
    className,
  );

  const _withAddon = clsx(
    {
      'rounded-l-none': addonLeft,
      'rounded-r-none': addonRight,
    },
    _className,
  );

  if (_addon) {
    return (
      <nature.span className='flex'>
        {addonLeft && (
          <InputLeftAddon className={String(_css)}>{addonLeft}</InputLeftAddon>
        )}
        <nature.input ref={ref} className={_withAddon} {...rest} />
        {addonRight && (
          <InputRightAddon className={String(_css)}>
            {addonRight}
          </InputRightAddon>
        )}
      </nature.span>
    );
  }

  return <nature.input ref={ref} className={_className} {...rest} />;
});

if (__DEV__) {
  Input.displayName = 'Input';
}

// @ts-ignore
Input.__hidden = 'Input';
