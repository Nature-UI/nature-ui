import { HTMLNatureProps, clsx, forwardRef, nature } from '@nature-ui/system';
import { callAllHandler } from '@nature-ui/utils';
import { HTMLMotionProps } from 'framer-motion';
import { usePopoverContext } from './popover-context';
import {
  PopoverTransition,
  PopoverTransitionProps,
} from './popover-transition';

export interface PopoverContentProps extends PopoverTransitionProps {
  rootProps?: HTMLNatureProps<'div'>;
  motionProps?: HTMLMotionProps<'section'>;
}

export const PopoverContent = forwardRef<PopoverContentProps, 'section'>(
  function PopoverContent(props, ref) {
    const { rootProps, motionProps, ...contentProps } = props;

    const { getPopoverProps, getPopoverPositionerProps, onAnimationComplete } =
      usePopoverContext();

    const popoverProps = getPopoverProps(contentProps, ref);
    console.log({ props: getPopoverPositionerProps(rootProps) });

    return (
      <nature.div
        {...getPopoverPositionerProps(rootProps)}
        className='nature-popover__popper border-none z-10'
      >
        <PopoverTransition
          {...motionProps}
          {...popoverProps}
          onAnimationComplete={callAllHandler(
            onAnimationComplete,
            contentProps.onAnimationComplete,
          )}
          className={clsx(
            'nature-popover__content border-gray-200 relative bg-white border shadow-sm rounded-md max-w-xs break-words',
            props.className,
          )}
          style={{
            ...popoverProps.style,
          }}
        />
      </nature.div>
    );
  },
);

PopoverContent.displayName = 'PopoverContent';
