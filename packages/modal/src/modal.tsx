import { CloseButton, CloseButtonProps } from '@nature-ui/close-button';
import { FocusLock } from '@nature-ui/focus-lock';
import { useSafeLayoutEffect } from '@nature-ui/hooks';
import { Portal, PortalProps } from '@nature-ui/portal';
import { clsx, forwardRef, HTMLNatureProps, nature } from '@nature-ui/system';
import {
  callAllHandler,
  createContext,
  StringOrNumber,
  __DEV__,
} from '@nature-ui/utils';
import * as React from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { useModal, UseModalProps, UseModalReturn } from './use-modal';

type ModalContext = UseModalReturn &
  Pick<ModalProps, 'isCentered' | 'scrollBehavior'> & {
    variant?: StringOrNumber;
    size?: StringOrNumber;
  };

const [ModalContextProvider, useModalContext] = createContext<ModalContext>({
  strict: true,
  name: 'ModalContext',
});

export interface ModalProps extends UseModalProps {
  children?: React.ReactNode;
  /**
   * The `ref` of element to receive focus when the modal opens.
   */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /**
   * The `ref` of element to receive focus when the modal closes.
   */
  finalFocusRef?: React.RefObject<HTMLElement>;
  /**
   * If `true`, the modal will return focus to the element that triggered it when it closes.
   * @default true
   */
  returnFocusOnClose?: boolean;
  /**
   *  If `true`, the modal will be centered on screen.
   * @default false
   */
  isCentered?: boolean;
  /**
   * Where scroll behaviour should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   *
   * @default "outside"
   */
  scrollBehavior?: 'inside' | 'outside';
  /**
   * If `false`, focus lock will be disabled completely.
   *
   * This is useful in situations where you still need to interact with
   * other surrounding elements.
   *
   * 🚨Warning: We don't recommend doing this because it hurts the
   * accessbility of the modal, based on WAI-ARIA specifications.
   *
   * @default true
   */
  trapFocus?: boolean;
  /**
   * If `true`, the modal will autofocus the first enabled and interative
   * element within the `ModalContent`
   *
   * @default true
   */
  autoFocus?: boolean;
  /**
   * Function that will be called to get the parent element
   * that the modal will be attached to.
   */
  getContainer?: PortalProps['getContainer'];
  /**
   * If `true`, scrolling will be disabled on the `body` when the modal opens.
   *  @default true
   */
  blockScrollOnMount?: boolean;
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   * Defaults to `false`.
   */
  allowPinchZoom?: boolean;
  size?: StringOrNumber;
  variant?: 'blur' | 'normal';
}

/**
 * Modal
 *
 * React component that provides context, theming, and accessbility properties
 * to all other modal components.
 *
 * It doesn't render any DOM node.
 */
export const Modal = (props: ModalProps) => {
  const {
    children,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose = true,
    isOpen,
    scrollBehavior = 'outside',
    size = 'xs',
    variant = 'blur',
    trapFocus = true,
    autoFocus = true,
    blockScrollOnMount = true,
    isCentered,
    allowPinchZoom = false,
    getContainer,
  } = props;

  const context = {
    ...useModal(props),
    scrollBehavior,
    isCentered,
    size,
    variant,
  };

  if (!isOpen) return null;

  const { dialogRef } = context;
  return (
    <ModalContextProvider value={context}>
      <Portal getContainer={getContainer}>
        <FocusLock
          autoFocus={autoFocus}
          isDisabled={!trapFocus}
          initialFocusRef={initialFocusRef}
          finalFocusRef={finalFocusRef}
          restoreFocus={returnFocusOnClose}
          contentRef={dialogRef}
        >
          <RemoveScroll
            allowPinchZoom={allowPinchZoom}
            enabled={blockScrollOnMount}
          >
            {children}
          </RemoveScroll>
        </FocusLock>
      </Portal>
    </ModalContextProvider>
  );
};

if (__DEV__) {
  Modal.displayName = 'Modal';
}

const _SIZES = {
  xs: '20rem !important',
  sm: '24rem !important',
  md: '28rem !important',
  lg: '32rem !important',
  xl: '36rem !important',
  full: '100% !important',
};

export interface ModalContentProps
  extends HTMLNatureProps<'section'>,
    Pick<ModalProps, 'scrollBehavior'> {}

/**
 * ModalContent
 *
 * React component used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it's a modal modal
 */
export const ModalContent = forwardRef<ModalContentProps, 'section'>(
  (props, ref) => {
    const { className, ...rest } = props;
    const { getContentProps, size = 'xs', scrollBehavior } = useModalContext();

    const contentProps = getContentProps({
      ...rest,
      ref,
    });

    const _className = clsx(
      'bg-white shadow-lg my-12 rounded flex flex-col relative focus:outline-none z-50',
      {
        'overflow-auto': scrollBehavior === 'inside',
      },
      className,
    );
    let _size;

    if (size in _SIZES) {
      _size = _SIZES[size];
    } else {
      _size = size;
    }

    const css = {
      width: _size,
      maxHeight: scrollBehavior === 'inside' ? 'calc(100vh - 7.5rem)' : 'none',
    };

    return (
      <nature.section className={_className} {...contentProps} css={css} />
    );
  },
);

if (__DEV__) {
  ModalContent.displayName = 'ModalContent';
}

export interface ModalOverlayProps
  extends Pick<ModalProps, 'isCentered' | 'scrollBehavior'>,
    HTMLNatureProps<'div'> {}

/**
 * ModalOverlay
 *
 * React component that renders a backdrop behind the modal. It's
 * also used as a wrapper for the modal content for better positioning.
 *
 */
export const ModalOverlay = forwardRef<ModalOverlayProps, 'div'>(
  (props, ref) => {
    const { className, ...rest } = props;
    const { getOverlayProps, scrollBehavior, isCentered, variant, size } =
      useModalContext();

    const overlayProps = getOverlayProps({
      ...rest,
      ref,
    });

    const _variant = variant === 'blur' ? '5px' : '0px';

    const css = {
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: `blur(${_variant})`,
    };
    const theming = {
      variant,
      size,
      css,
    };

    const _className = clsx(
      'flex justify-center fixed left-0 top-0 right-0 bottom-0 w-screen h-screen items-start z-40',
      {
        'overflow-auto': scrollBehavior === 'outside',
        'overflow-hidden': scrollBehavior === 'inside',
        'items-center': isCentered,
      },
      className,
    );

    return <nature.div className={_className} {...theming} {...overlayProps} />;
  },
);

if (__DEV__) {
  ModalOverlay.displayName = 'ModalOverlay';
}

export interface ModalHeaderProps extends HTMLNatureProps<'header'> {}
/**
 * ModalHeader
 *
 * React component that houses the title of the modal.
 *
 * @see Docs https://nature-ui.com/components/modal
 */
export const ModalHeader = React.forwardRef(
  (props: ModalHeaderProps, ref: React.Ref<any>) => {
    const { className, ...rest } = props;

    const { headerId, setHeaderMounted } = useModalContext();

    /**
     * Notify us if this component was rendered or used
     * so we can append `aria-labelledby` automatically
     */
    useSafeLayoutEffect(() => {
      setHeaderMounted(true);

      return () => setHeaderMounted(false);
    }, []);

    const _className = clsx(
      'nature-modal__header p-4 font-bold text-xl',
      className,
    );

    return (
      <nature.header
        {...rest}
        ref={ref}
        className={_className}
        id={headerId}
        css={{ flex: 0 }}
      />
    );
  },
);

if (__DEV__) {
  ModalHeader.displayName = 'ModalHeader';
}

export interface ModalBodyProps
  extends HTMLNatureProps<'div'>,
    Pick<ModalProps, 'scrollBehavior'> {}

/**
 * ModalBody
 *
 * React component that houses the main content of the modal.
 *
 * @see Docs https://nature-ui.com/components/modal
 */
export const ModalBody = forwardRef<ModalBodyProps, 'div'>((props, ref) => {
  const { className, ...rest } = props;
  const { bodyId, setBodyMounted, scrollBehavior } = useModalContext();

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */
  useSafeLayoutEffect(() => {
    setBodyMounted(true);

    return () => setBodyMounted(false);
  }, []);

  const _className = clsx(
    'nature-modal__body flex-1 py-2 px-4',
    {
      'overflow-auto': scrollBehavior === 'inside',
    },
    className,
  );

  return (
    <nature.div
      ref={ref}
      scrollBehavior={scrollBehavior}
      className={_className}
      id={bodyId}
      {...rest}
    />
  );
});

if (__DEV__) {
  ModalBody.displayName = 'ModalBody';
}

/**
 * ModalFooter
 *
 * React component that houses the action buttons of the modal.
 *
 * @see Docs https://nature-ui.com/components/modal
 */
export const ModalFooter = (props: HTMLNatureProps<'footer'>) => {
  const { className = '', ...rest } = props;

  const _className = clsx('flex items-center justify-end p-4', className);

  return <nature.footer className={_className} css={{ flex: 0 }} {...rest} />;
};

if (__DEV__) {
  ModalFooter.displayName = 'ModalFooter';
}

/**
 * ModalCloseButton
 *
 * React component used closes the modal. You don't need
 * to pass the `onClick` to it, it's reads the `onClose` action from the
 * modal context.
 */
export const ModalCloseButton = React.forwardRef(
  (props: CloseButtonProps, ref: React.Ref<any>) => {
    const { onClick, className, ...rest } = props;
    const { onClose } = useModalContext();

    const _className = clsx(
      'nature-modal__close-btn',
      'absolute top-0 right-0 mt-3 mr-3',
      className,
    );

    return (
      <CloseButton
        ref={ref}
        className={_className}
        onClick={callAllHandler(onClick, onClose)}
        {...rest}
      />
    );
  },
);

if (__DEV__) {
  ModalCloseButton.displayName = 'ModalCloseButton';
}
