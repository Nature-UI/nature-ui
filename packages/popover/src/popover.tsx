import { MaybeRenderProp } from '@nature-ui/react-types';
import { runIfFn } from '@nature-ui/utils';
import { PopoverProvider } from './popover-context';
import { UsePopoverProps, usePopover } from './use-popover';

export interface PopoverProps extends UsePopoverProps {
  /**
   * The content of the popover. It is usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: MaybeRenderProp<{
    isOpen: boolean;
    onClose: () => void;
    forceUpdate: (() => void) | undefined;
  }>;
}

/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 *
 * @see Docs https://nature-ui.com/docs/components/popover
 */
export function Popover(props: PopoverProps) {
  const { children, ...rest } = props;
  const context = usePopover({ ...rest, direction: 'ltr' });

  return (
    <PopoverProvider value={context}>
      {runIfFn(children, {
        isOpen: context.isOpen,
        onClose: context.onClose,
        forceUpdate: context.forceUpdate,
      })}
    </PopoverProvider>
  );
}

Popover.displayName = 'Popover';
