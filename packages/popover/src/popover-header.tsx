import { HTMLNatureProps, clsx, forwardRef, nature } from '@nature-ui/system';
import { usePopoverContext } from './popover-context';

export interface PopoverHeaderProps extends HTMLNatureProps<'header'> {}
/**
 * PopoverHeader is the accessible header or label
 * for the popover's content, and it is first announced by screenreaders.
 */

export const PopoverHeader = forwardRef<PopoverHeaderProps, 'header'>(
  function PopoverHeader(props, ref) {
    const { getHeaderProps } = usePopoverContext();

    return (
      <nature.header
        {...getHeaderProps(props, ref)}
        className={clsx(
          'nature-popover__header py-2 px-3 border-b border-gray-200',
          props.className,
        )}
      />
    );
  },
);

PopoverHeader.displayName = 'PopoverHeader';
