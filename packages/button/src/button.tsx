import * as React from 'react';
import { nature, clsx } from '@nature-ui/system';
import { PropsOf } from '@nature-ui/system/src';
import { __DEV__, lighten, darken } from '@nature-ui/utils';
import { Spinner } from '@nature-ui/spinner';

import './button.css';

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

  /**
   * Typeof String | JSX.Element
   */
  children?: React.ReactNode;
}

const NatureButton = nature('button');

export type ButtonType = PropsOf<typeof NatureButton> & ButtonProps;

export const Button = React.forwardRef(
  (props: ButtonType, ref: React.Ref<any>) => {
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
      'focus:shadow-outline focus:outline-none rounded font-semibold relative overflow-hidden align-middle';
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
      BTNClass = clsx(className, {
        [STYLES['disabled']]: isDisabled || isLoading,
      });
    } else {
      BTNClass = clsx(DEFAULT_CLASS, {
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
        {isLoading ? <ButtonSpinner label={loadingText} /> : children}
      </NatureButton>
    );
  }
);

const ButtonSpinner = (
  props: ButtonType & {
    label?: string;
  }
) => {
  const {
    children = <Spinner size='xs' color='currentColor' />,
    className = '',
    label,
    ...rest
  } = props;

  return (
    <span className={className} {...rest}>
      {children}
      {label && <span className='ml-2'>{label}</span>}
    </span>
  );
};

if (__DEV__) {
  Button.displayName = 'Button';
  ButtonSpinner.displayName = 'ButtonSpinner';
}
