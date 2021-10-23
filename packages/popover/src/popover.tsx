/** ** */
import { CloseButton, CloseButtonProps } from '@nature-ui/close-button';
import { useSafeLayoutEffect } from '@nature-ui/hooks';
import { clsx, nature, PropsOf } from '@nature-ui/system';
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

export type PopoverProps = UsePopoverProps & {
  /**
   * The content of the popover. It's usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: ReactNodeOrRenderProp<{ isOpen: boolean; onClose(): void }>;
};

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
export const PopoverTrigger: React.FC = (props) => {
  // enforce a single child
  const child = React.Children.only(props.children) as React.ReactElement<any>;
  const { getTriggerProps } = usePopoverContext();

  return React.cloneElement(child, getTriggerProps(child.props));
};

if (__DEV__) {
  PopoverTrigger.displayName = 'PopoverTrigger';
}

/**
 * Theming
 *
 * To change the global styles of Popover Content,
 * go to `theme.components.Popover` under the `Content` key
 */
const SectionTag = nature('section');

export type PopoverContentProps = PropsOf<typeof SectionTag>;

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
          <SectionTag
            className={clsx(
              'relative flex flex-col max-w-xs bg-white border shadow-md border-solid rounded focus:shadow-outline outline-none z-50',
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

/**
 * Theming
 *
 * To change the global styles of Popover Header,
 * go to `theme.components.Popover` under the `Header` key
 */
const HeaderTag = nature('header');

export type PopoverHeaderProps = PropsOf<typeof HeaderTag>;

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
      <HeaderTag
        className={clsx(
          'nature-popover__header px-3 py-2 border-solid border border-t-0 border-r-0 border-l-0',
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

export type PopoverBodyProps = PropsOf<typeof DivTag>;

/**
 * Theming
 *
 * To change the global styles of Popover Body,
 * go to `theme.components.Popover` under the `Body` key
 */
const DivTag = nature('div');

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
      <HeaderTag
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

const FooterTag = nature('footer');

export const PopoverFooter = ({
  className,
  ...props
}: PropsOf<typeof FooterTag>) => {
  return (
    <FooterTag
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

export type PopoverCloseButtonProps = CloseButtonProps;

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

export type PopoverArrowProps = PropsOf<typeof DivTag>;

export const PopoverArrow = ({ className, ...props }: PopoverArrowProps) => {
  const { getArrowProps } = usePopoverContext();

  return (
    <DivTag className={clsx('bg-white', className)} {...getArrowProps(props)} />
  );
};

if (__DEV__) {
  PopoverArrow.displayName = 'PopoverArrow';
}
