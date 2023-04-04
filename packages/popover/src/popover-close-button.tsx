import { CloseButton, CloseButtonProps } from '@nature-ui/close-button';
import { clsx, forwardRef } from '@nature-ui/system';
import { usePopoverContext } from './popover-context';

export type PopoverCloseButtonProps = CloseButtonProps;

export const PopoverCloseButton = forwardRef<CloseButtonProps, 'button'>(
  function PopoverCloseButton(props, ref) {
    const { onClose } = usePopoverContext();
    return (
      <CloseButton
        size='xs'
        onClick={onClose}
        className={clsx(
          'nature-popover__close-btn absolute top-1 right-2',
          props.className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

PopoverCloseButton.displayName = 'PopoverCloseButton';
