import * as React from 'react';
import clx from 'clsx';
import { nature } from '@nature-ui/system';
import { PropsOf } from '@nature-ui/system/src';
import { __DEV__ } from '@nature-ui/utils';
import './button.css';
import { Spinner } from '@nature-ui/spinner';

interface ButtonProps {
  /**
   * The text color of the button. Use a color key passed in theme.colors.
   */
  text?: string;
  /**
   * The background color of the button. Use a color key passed in theme.colors.
   */
  color?: string;
  /**
   * The variant of the button style to use.
   */
  variant?: 'outline' | 'ghost' | 'link' | 'solid' | 'none';
  /**
   * If true, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * If true, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * The label to show in the button when isLoading is true. If no text is passed, it only shows the spinner
   */
  loadingText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const NatureButton = nature('button');

export type ButtonType = PropsOf<typeof NatureButton>;

const darken = (value: string): string => {
  const splitStr = value.split('-');
  const dept = Number(splitStr[1]);
  const color = splitStr[0];

  if (dept >= 800) {
    return `${color}-${dept - 200}`;
  }

  return `${color}-${dept + 200}`;
};

const lighten = (value: string, amount = 100): string => {
  const color = value.split('-')[0];

  return `${color}-${amount}`;
};

export const Button = React.forwardRef(
  (props: ButtonProps & ButtonType, ref: React.Ref<any>) => {
    const {
      as,
      variant = 'solid',
      color = 'teal-500',
      text = 'white',
      size = 'md',
      children,
      className = '',
      isDisabled = false,
      isLoading = false,
      loadingText,
      ...rest
    } = props;

    const DEFAULT_CLASS =
      'focus:shadow-outline focus:outline-none rounded font-semibold relative overflow-hidden';
    const STYLES = {
      solid: `bg-${color} text-${text} hover:bg-${darken(
        color
      )} button--ripple`,
      outline: `bg-transparent button--ripple hover:bg-${lighten(
        text
      )} text-${text} border border-${text} focus:border-transparent`,
      ghost: `hover:bg-${lighten(text)} text-${text} button--ripple`,
      link: `hover:underline text-${text}`,
      xs: 'px-1 py-1 text-xs',
      sm: 'px-2 py-2 text-sm',
      md: 'px-4 py-2 text-md',
      lg: 'px-6 py-3 text-lg',
      disabled: 'opacity-50 cursor-not-allowed',
    };

    let BTNClass: string;

    if (variant === 'none') {
      BTNClass = clx(className, {
        [STYLES['disabled']]: isDisabled || isLoading,
      });
    } else {
      BTNClass = clx(DEFAULT_CLASS, {
        [STYLES[size]]: size && variant !== 'link',
        [STYLES[variant]]: variant,
        [className]: className,
        [STYLES['disabled']]: isDisabled || isLoading,
      });
    }

    const defaults = {
      className: BTNClass,
      ref,
      as,
      size,
      disabled: isDisabled || isLoading,
    };

    return (
      <NatureButton {...defaults} {...rest}>
        {isLoading && <Spinner className='mr-3' color='white' />}
        {isLoading ? loadingText || <span>{children}</span> : children}
      </NatureButton>
    );
  }
);

if (__DEV__) {
  Button.displayName = 'Button';
}
