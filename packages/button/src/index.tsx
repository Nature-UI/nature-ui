import * as React from 'react';
import clx from 'clsx';

interface ButtonProps {
  /**
   * The label of the button
   */
  'aria-label'?: string;
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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'none';
  /**
   * Other tailwind utility classes or custom classnames you wish to include
   */
  className?: string;
  /**
   * The lightness or how dark you want the background color to be
   */
  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   * defaults to "button"
   */
  component?: React.ElementType;
  id?: string;
  /**
   *  when the href prop is set it changes the tag name to a
   */
  href?: string;
  onClick?: () => any;
}

const darken = (value: string): string => {
  const splitStr = value.split('-');
  const dept = Number(splitStr[1]);
  const color = splitStr[0];

  if (dept >= 800) {
    return `${color}-${dept - 200}`;
  }

  return `${color}-${dept + 200}`;
};

const lighten = (value: string): string => {
  const color = value.split('-')[0];

  return `${color}-${100}`;
};

const Button = React.forwardRef((props: ButtonProps, ref: React.Ref<any>) => {
  const {
    component: Component = 'button',
    variant = 'solid',
    color = 'teal-500',
    text = 'white',
    size = 'md',
    children,
    ...rest
  } = props;
  const DEFAULT_CLASS = 'block focus:shadow-outline focus:outline-none rounded font-semibold flex';
  const STYLES = {
    solid: `bg-${color} text-${text} hover:bg-${darken(color)}`,
    outline: `bg-transparent hover:bg-${lighten(
      text
    )} text-${text} border border-${text} focus:border-transparent`,
    ghost: `hover:bg-${lighten(text)} text-${text}`,
    link: `hover:underline text-${text}`,
    md: 'px-4 py-2',
  };

  let BTNClass: string;

  if (variant === 'none') {
    BTNClass = '';
  } else {
    BTNClass = clx(DEFAULT_CLASS, {
      [STYLES[size]]: size && variant !== 'link',
      [STYLES[variant]]: variant,
    });
  }

  return (
    <Component className={BTNClass} ref={ref} {...rest}>
      {children ? children : 'Button'}
    </Component>
  );
});

export default Button;
