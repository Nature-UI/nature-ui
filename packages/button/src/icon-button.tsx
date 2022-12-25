import { clsx, forwardRef } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import React from 'react';
import { Button, ButtonProps } from './button';

type Omitted =
  | 'leftIcon'
  | 'rightIcon'
  | 'loadingText'
  | 'iconSpacing'
  | 'isIconButton';

interface BaseButtonProps extends Omit<ButtonProps, Omitted> {}

export interface IconButtonProps extends BaseButtonProps {
  /**
   * The icon to be used in the button.
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
  /**
   * A11y: A label that describes the button
   */
  'aria-label'?: string;
}

export const IconButton = forwardRef<IconButtonProps, 'button'>(
  (props, ref) => {
    const {
      icon,
      children,
      'aria-label': ariaLabel,
      className = '',
      as,
      ...rest
    } = props;

    /**
     * Passing the icon as prop or children should work
     */
    const element = icon || children;
    const _children = React.isValidElement(element)
      ? React.cloneElement(element, {
          // @ts-ignore
          'aria-hidden': true,
          focusable: false,
        })
      : null;
    const _className = clsx('rounded-md', className);

    return (
      <Button
        {...rest}
        ref={ref}
        aria-label={ariaLabel}
        className={_className}
        isIconButton
      >
        {_children}
      </Button>
    );
  },
);

if (__DEV__) {
  IconButton.displayName = 'IconButton';
}
