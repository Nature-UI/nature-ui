import * as React from 'react';
import { clsx, nature, PropsOf } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import { Icon, SvgIconProps } from '@nature-ui/icon';

const ButtonTag = nature('button');

/**
 * CloseButton
 */
const StyledButton = React.forwardRef(
  (props: PropsOf<typeof ButtonTag>, ref: React.Ref<HTMLButtonElement>) => {
    const { className = '', ...rest } = props;

    const _className = clsx(
      `flex items-center justify-center flex-shrink-0 rounded focus:shadow-outline focus:outline-none transition duration-500 ease-in-out p-2`,
      {
        [className]: className,
      }
    );

    return (
      <ButtonTag
        ref={ref}
        css={{
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.06)',
          },
        }}
        aria-label='Close'
        className={_className}
        type='button'
        {...rest}
      />
    );
  }
);

/**
 * CloseIcon
 *
 * The icon for the close button.
 */
const CloseIcon = (props: SvgIconProps) => (
  <Icon focusable='false' aria-hidden {...props}>
    <path
      fill='currentColor'
      d='M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z'
    />
  </Icon>
);

export type CloseButtonProps = PropsOf<typeof StyledButton> &
  Pick<SvgIconProps, 'size'> & {
    /**
     * If `true`, the close button will be disabled.
     */
    isDisabled?: boolean;
  };

/**
 * CloseButton
 *
 * A button with a close icon
 *
 * It is used to handle the close functionality in feedback and overlay components like `Alerts`, `Toats`, `Snackbar`, `Drawers`, and `Modals`.
 */
export const CloseButton = React.forwardRef(
  (props: CloseButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const { children, isDisabled, size = 'sm', ...rest } = props;

    return (
      <StyledButton ref={ref} disabled={isDisabled} {...rest}>
        {children || <CloseIcon size={size} />}
      </StyledButton>
    );
  }
);

if (__DEV__) {
  CloseButton.displayName = 'CloseButton';
}
