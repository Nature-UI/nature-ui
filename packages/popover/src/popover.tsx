/** ** */
import { CloseButton, CloseButtonProps } from '@nature-ui/close-button';
import { useSafeLayoutEffect } from '@nature-ui/hooks';
import { clsx, HTMLNatureProps, nature } from '@nature-ui/system';
import {
  createContext,
  isFunction,
  ReactNodeOrRenderProp,
  __DEV__,
} from '@nature-ui/utils';
import * as React from 'react';
import { usePopover, UsePopoverProps, UsePopoverReturn } from './use-popover';

const [PopoverContextProvider, usePopoverContext] =
  createContext<UsePopoverReturn>({
    name: 'PopoverContext',
  });

export interface PopoverProps extends UsePopoverProps {
  /**
   * The content of the popover. It's usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: ReactNodeOrRenderProp<{ isOpen: boolean; onClose(): void }>;
}

/**
 * Popover
 *
 * React component used to Popovers are used to bring attention
 * to specific user interface elements, typically to suggest an
 * action or to guide users through a new experience.
 */
export const Popover = (props: PopoverProps) => {
  const { children, ...hookProps } = props;
  const context = usePopover(hookProps);

  const { isOpen, onClose } = context;

  return (
    <PopoverContextProvider value={context}>
      {isFunction(children)
        ? children({
            isOpen,
            onClose,
          })
        : children}
    </PopoverContextProvider>
  );
};

if (__DEV__) {
  Popover.displayName = 'Popover';
}

/**
 * PopoverTrigger
 *
 * The trigger for the popover. It must be an interactive element
 * such as `button` or `a`.
 */
export const PopoverTrigger: React.FC<{ children?: React.ReactNode }> = (
  props,
) => {
  // enforce a single child
  const child = React.Children.only(props.children) as React.ReactElement<any>;
  const { getTriggerProps } = usePopoverContext();

  return React.cloneElement(child, getTriggerProps(child.props));
};

if (__DEV__) {
  PopoverTrigger.displayName = 'PopoverTrigger';
}

export interface PopoverContentProps extends HTMLNatureProps<'section'> {}

/**
 * PopoverContent
 *
 * The popover's content wrapper that includes all
 * accessibility requirements for a popover
 */
export const PopoverContent = React.forwardRef(
  ({ className, ...props }: PopoverContentProps, ref: React.Ref<any>) => {
    const { getPopoverProps } = usePopoverContext();

    const {
      hidden,
      'aria-hidden': ariaHidden,
      ...rest
    } = getPopoverProps({
      ...props,
      ref,
    });

    const _hidden = hidden || ariaHidden;

    return (
      <>
        {!_hidden && (
          <nature.section
            className={clsx(
              'relative flex flex-col max-w-xs border shadow-md border-solid rounded focus:shadow-outline outline-none z-50',
              className,
            )}
            css={{
              borderColor: 'inherit',
            }}
            {...rest}
            {...{ hidden, 'aria-hidden': ariaHidden }}
          />
        )}
      </>
    );
  },
);

if (__DEV__) {
  PopoverContent.displayName = 'PopoverContent';
}

export interface PopoverHeaderProps extends HTMLNatureProps<'header'> {}

/**
 * Popover Header
 *
 * This servers as the accessible header or label
 * for the popover's content and it's first announced by
 * screenreaders.
 */
export const PopoverHeader = React.forwardRef(
  ({ className, ...props }: PopoverHeaderProps, ref: React.Ref<any>) => {
    const { headerId, setHasHeader } = usePopoverContext();

    useSafeLayoutEffect(() => {
      setHasHeader.on();

      return () => setHasHeader.off();
    }, []);

    return (
      <nature.header
        className={clsx(
          'nature-popover__header px-3 py-2 border-solid border-b border-gray-200',
          className,
        )}
        {...props}
        id={headerId}
        ref={ref}
      />
    );
  },
);

if (__DEV__) {
  PopoverHeader.displayName = 'PopoverHeader';
}

export interface PopoverBodyProps extends HTMLNatureProps<'div'> {}

/**
 * PopoverBody
 *
 * Serves as the main content area for the popover. Should contain
 * at least one interactive element.
 */
export const PopoverBody = React.forwardRef(
  ({ className, ...props }: PopoverBodyProps, ref: React.Ref<any>) => {
    const { bodyId, setHasBody } = usePopoverContext();

    useSafeLayoutEffect(() => {
      setHasBody.on();

      return () => setHasBody.off();
    }, []);

    return (
      <nature.div
        className={clsx('nature-popover__body px-3 py-2', className)}
        {...props}
        id={bodyId}
        ref={ref}
      />
    );
  },
);

if (__DEV__) {
  PopoverBody.displayName = 'PopoverBody';
}

export const PopoverFooter = ({
  className,
  ...props
}: HTMLNatureProps<'footer'>) => {
  return (
    <nature.footer
      className={clsx(
        'px-3 py-2 border-solid border border-b-0 border-r-0 border-l-0',
        className,
      )}
      {...props}
    />
  );
};

if (__DEV__) {
  PopoverFooter.displayName = 'PopoverFooter';
}

export interface PopoverCloseButtonProps extends CloseButtonProps {}

/**
 * PopoverCloseButton
 *
 * The button to close the popover
 */
export const PopoverCloseButton = ({
  className,
  ...props
}: CloseButtonProps) => {
  const { onClose } = usePopoverContext();

  return (
    <CloseButton
      size='xs'
      onClick={onClose}
      className={clsx(
        'absolute rounded-md top-0 right-0 p-2 mt-1 mr-2',
        className,
      )}
      {...props}
    />
  );
};

if (__DEV__) {
  PopoverCloseButton.displayName = 'PopoverCloseButton';
}

export interface PopoverArrowProps extends HTMLNatureProps<'div'> {}

export const PopoverArrow = ({ className, ...props }: PopoverArrowProps) => {
  const { getArrowProps } = usePopoverContext();

  return (
    <nature.div
      className={clsx('bg-white', className)}
      {...getArrowProps(props)}
    />
  );
};

if (__DEV__) {
  PopoverArrow.displayName = 'PopoverArrow';
}
