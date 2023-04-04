import { HTMLNatureProps, clsx, nature } from '@nature-ui/system';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config.js';
import { usePopoverContext } from './popover-context';

const fullConfig = resolveConfig(tailwindConfig);

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
          '--popper-arrow-shadow-color': fullConfig.theme.colors.gray[200],
        }}
      />
    </nature.div>
  );
}

PopoverArrow.displayName = 'PopoverArrow';
