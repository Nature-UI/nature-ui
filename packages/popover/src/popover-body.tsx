import { HTMLNatureProps, clsx, forwardRef, nature } from '@nature-ui/system';
import { usePopoverContext } from './popover-context';

export interface PopoverBodyProps extends HTMLNatureProps<'div'> {}
/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */

export const PopoverBody = forwardRef<PopoverBodyProps, 'div'>(
  function PopoverBody(props, ref) {
    const { getBodyProps } = usePopoverContext();

    return (
      <nature.div
        {...getBodyProps(props, ref)}
        className={clsx('nature-popover__body py-2 px-3', props.className)}
      />
    );
  },
);

PopoverBody.displayName = 'PopoverBody';
