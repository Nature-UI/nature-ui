import * as React from 'react';
import { nature, clsx, PropsOf, css, keyframes } from '@nature-ui/system';
import { __DEV__, lighten, darken } from '@nature-ui/utils';
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
  size?: 'xs' | 'sm' | 'md' | 'lg' | number;

  /**
   * Typeof String | JSX.Element
   */
  children?: React.ReactNode;
}

const NatureButton = nature('button');

export type ButtonType = PropsOf<typeof NatureButton> & ButtonProps;

const _SIZES = {
  xs: {
    size: '1.5rem',
    font: '0.75rem',
    padding: '0.5rem',
  },
  sm: {
    size: '2rem',
    font: '0.875rem',
    padding: '0.75rem',
  },
  md: {
    size: '2.5rem',
    font: '1rem',
    padding: '1rem',
  },
  lg: {
    size: '3rem',
    font: '1.125rem',
    padding: '1.5rem',
  },
};

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

    const _size = typeof size === 'string' ? _SIZES[size].size : `${size}px`;
    const _font = _SIZES[size].font ?? '1rem';
    const _padding = _SIZES[size].padding ?? '1rem';

    const _link = variant === 'link';

    const _sizes = css({
      height: _size,
      minWidth: _size,
      paddingLeft: _padding,
      paddingRight: _padding,
    });

    const _ripple = keyframes`
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(10);
      }
    `;

    const _css = css`
      font-size: ${_font};

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1em;
        height: 1em;
        background: currentColor;
        border-radius: 50%;
        opacity: 0;
      }

      &:focus:not(:active)::after {
        animation: 0.3s ${_ripple};
      }
    `;

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
      disabled: 'opacity-50 cursor-not-allowed',
    };

    let BTNClass: string;

    if (variant === 'none') {
      BTNClass = clsx(className, {
        [STYLES['disabled']]: isDisabled || isLoading,
      });
    } else {
      BTNClass = clsx(className, _css, DEFAULT_CLASS, {
        [_sizes]: !_link,
        [STYLES[variant]]: variant,
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
