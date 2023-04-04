import { HTMLNatureProps, clsx, nature } from '@nature-ui/system';

export interface PopoverFooterProps extends HTMLNatureProps<'footer'> {}

export function PopoverFooter(props: PopoverFooterProps) {
  return (
    <nature.footer
      {...props}
      className={clsx(
        'nature-popover__footer px-3 py-2 border-t border-gray-200',
        props.className,
      )}
    />
  );
}

PopoverFooter.displayName = 'PopoverFooter';
