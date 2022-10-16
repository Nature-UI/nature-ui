/** ** */
import { Spinner } from '@nature-ui/spinner';
import {
  clsx,
  css,
  forwardRef,
  HTMLNatureProps,
  nature,
} from '@nature-ui/system';
import { dataAttr, StringOrNumber, __DEV__ } from '@nature-ui/utils';
import * as React from 'react';
import { rippleEffect } from './button-effects';

interface ButtonOptions {
  /**
   * If true, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the button will be styled in it's active state.
   */
  isActive?: boolean;
  /**
   * If true, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * The label to show in the button when isLoading is true. If no text is passed, it only shows the spinner
   */
  loadingText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | [string, string];
  /**
   * If added, the button will show an icon before the button's label.
   * @type React.ReactElement
   */
  leftIcon?: React.ReactElement;
  /**
   * If added, the button will show an icon after the button's label.
   * @type React.ReactElement
   */
  rightIcon?: React.ReactElement;
  /**
   * The space between the button icon and label.
   * @type SystemProps["marginRight"]
   */
  iconSpacing?: StringOrNumber;
  /**
   * Typeof String | JSX.Element
   */
  children?: React.ReactNode;
  /**
   * to specify if a button is an icon button.
   * If this is set to true, the default padding-x will be removed
   */
  isIconButton?: boolean;
}

export interface ButtonProps extends HTMLNatureProps<'button'>, ButtonOptions {}

const _SIZES = {
  xs: {
    size: '1.5rem',
    font: '0.75rem',
    padding: 'px-2',
  },
  sm: {
    size: '2rem',
    font: '0.875rem',
    padding: 'px-3',
  },
  md: {
    size: '2.5rem',
    font: '1rem',
    padding: 'px-4',
  },
  lg: {
    size: '3rem',
    font: '1.125rem',
    padding: 'px-5',
  },
};

const ButtonIcon = forwardRef<HTMLNatureProps<'span'>, 'span'>((props, ref) => {
  const { children, ...rest } = props;

  const _children = React.isValidElement(children)
    ? React.cloneElement(children, {
        'aria-hidden': true,
        focusable: false,
      })
    : children;

  return (
    <nature.span ref={ref} {...rest}>
      {_children}
    </nature.span>
  );
});

if (__DEV__) {
  ButtonIcon.displayName = 'ButtonIcon';
}

export const ButtonSpinner = (
  props: ButtonProps & {
    spinner?: React.ReactNode;
    label?: string;
  },
) => {
  const { className = '', label, spinner, ...rest } = props;

  const _className = clsx(
    'align-middle',
    {
      absolute: !label,
      relative: label,
    },
    className,
  );

  return (
    <span className={_className} {...rest}>
      {spinner || <Spinner size='1rem' color='currentColor' />}
      {label && <span className='ml-2'>{label}</span>}
    </span>
  );
};

export const Button = forwardRef<ButtonProps, 'button'>((props, ref) => {
  const {
    size = 'md',
    children,
    className,
    isDisabled = false,
    disabled = false,
    isLoading = false,
    loadingText,
    isActive,
    leftIcon,
    rightIcon,
    isIconButton,
    iconSpacing = '10px',
    ...rest
  } = props;

  const isSizeString = typeof size === 'string';
  const _size = isSizeString ? _SIZES[size].size : size[0];
  const _font = isSizeString ? _SIZES[size].font : '1rem';
  const _padding = isSizeString ? _SIZES[size].padding : '';
  const _disabled = isDisabled || disabled || isLoading;

  const _sizes = css({
    height: _size,
    minWidth: _size,
  });

  const arrayPadding =
    Array.isArray(size) &&
    css({
      paddingLeft: size[1],
      paddingRight: size[1],
    });

  const DEFAULT_CLASS =
    'focus:ring rounded ease-in-out duration-150 transition-colors font-semibold relative overflow-hidden align-middle inline-flex justify-center items-center leading-normal';

  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const BTNClass = clsx(
    rippleEffect,
    DEFAULT_CLASS,
    _sizes,
    arrayPadding,
    {
      [_padding]: !isIconButton,
      [disabledStyles]: _disabled,
    },
    className,
  );

  const defaults = {
    className: BTNClass,
    ref,
    size,
    disabled: _disabled,
    'data-active': dataAttr(isActive),
    'data-loading': dataAttr(isLoading),
  };

  return (
    <nature.button
      css={{
        fontSize: _font,
      }}
      {...defaults}
      {...rest}
    >
      {leftIcon && !isLoading && (
        <ButtonIcon
          css={{
            marginRight: iconSpacing,
          }}
        >
          {leftIcon}
        </ButtonIcon>
      )}
      {isLoading ? (
        <>
          <ButtonSpinner label={loadingText}>{children}</ButtonSpinner>
          {children && !loadingText && (
            <nature.span className='opacity-0'>{children}</nature.span>
          )}
        </>
      ) : (
        children
      )}
      {rightIcon && !isLoading && (
        <ButtonIcon
          css={{
            marginLeft: iconSpacing,
          }}
        >
          {rightIcon}
        </ButtonIcon>
      )}
    </nature.button>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
  ButtonSpinner.displayName = 'ButtonSpinner';
}
