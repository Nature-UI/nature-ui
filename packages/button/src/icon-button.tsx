import { clsx, forwardRef } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';
import { Button, ButtonType } from './button';

type Omitted = 'leftIcon' | 'rightIcon' | 'loadingText' | 'iconSpacing';

type BaseButtonProps = Omit<ButtonType, Omitted>;

export interface IconButtonProps extends BaseButtonProps {
  /**
   * The icon to be used in the button.
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
  /**
   * If `true`, the button will be perfectly round. Else, it'll be slightly round
   */
  isRound?: boolean;
  /**
   * A11y: A label that describes the button
   */
  'aria-label': string;
}

export const IconButton = forwardRef<IconButtonProps>((props, ref) => {
  const {
    icon,
    children,
    isRound,
    'aria-label': ariaLabel,
    className = '',
    color = 'gray-200',
    ...rest
  } = props;

  /**
   * Passing the icon as prop or children should work
   */
  const element = icon || children;
  const _children = React.isValidElement(element)
    ? React.cloneElement(element as any, {
        'aria-hidden': true,
        focusable: false,
      })
    : null;
  const _className = clsx(className, 'p-0', {
    'rounded-full': isRound,
    'rounded-md': !isRound,
  });

  return (
    <Button
      ref={ref}
      color={color}
      aria-label={ariaLabel}
      className={_className}
      {...rest}
    >
      {_children}
    </Button>
  );
});

if (__DEV__) {
  IconButton.displayName = 'IconButton';
}
