import { clsx, forwardRef } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';
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
   * If `true`, the button will be perfectly round. Else, it'll be slightly round
   */
  isRound?: boolean;
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
      isRound,
      'aria-label': ariaLabel,
      className = '',
      color = 'gray-200',
      as, // FIXME: if this is included it breaks the code
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
    const _className = clsx(className, {
      'rounded-full': isRound,
      'rounded-md': !isRound,
    });

    return (
      <Button
        ref={ref}
        color={color}
        aria-label={ariaLabel}
        className={_className}
        isIconButton
        {...rest}
      >
        {_children}
      </Button>
    );
  },
);

if (__DEV__) {
  IconButton.displayName = 'IconButton';
}
