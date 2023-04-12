import { HTMLNatureProps, clsx, nature } from '@nature-ui/system';
import { usePopoverContext } from './popover-context';

export interface PopoverArrowProps extends HTMLNatureProps<'div'> {}

export function PopoverArrow(props: PopoverArrowProps) {
  const { getArrowProps, getArrowInnerProps } = usePopoverContext();
  return (
    <nature.div
      {...getArrowProps()}
      className={clsx(`nature-popover__arrow-positioner`)}
    >
      <nature.div
        className={clsx('nature-popover__arrow bg-white', props.className)}
        {...getArrowInnerProps(props)}
        css={{
          '--popper-arrow-shadow-color': '#e5e7eb',
        }}
      />
    </nature.div>
  );
}

PopoverArrow.displayName = 'PopoverArrow';
