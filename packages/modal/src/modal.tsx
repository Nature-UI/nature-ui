import { CloseButton } from '@nature-ui/close-button';
import { FocusLock, FocusLockProps } from '@nature-ui/focus-lock';
import { Portal, PortalProps } from '@nature-ui/portal';
import { createContext } from '@nature-ui/react-utils';
import {
  clsx,
  forwardRef,
  HTMLNatureProps,
  nature,
  NatureProps,
} from '@nature-ui/system';
import { fadeConfig } from '@nature-ui/transition';
import {
  callAllHandler,
  cx,
  FocusableElement,
  StringOrNumber,
  __DEV__,
} from '@nature-ui/utils';
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  usePresence,
} from 'framer-motion';
import React from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { ModalTransition } from './modal-transition';
import { useModal, UseModalProps, UseModalReturn } from './use-modal';

interface ModalOptions extends Pick<FocusLockProps, 'lockFocusAcrossFrames'> {
  /**
   * If `false`, focus lock will be disabled completely.
   *
   * This is useful in situations where you still need to interact with
   * other surrounding elements.
   *
   * 🚨Warning: We don't recommend doing this because it hurts the
   * accessibility of the modal, based on WAI-ARIA specifications.
   *
   * @default true
   */
  trapFocus?: boolean;
  /**
   * If `true`, the modal will autofocus the first enabled and interactive
   * element within the `ModalContent`
   *
   * @default true
   */
  autoFocus?: boolean;
  /**
   * The `ref` of element to receive focus when the modal opens.
   */
  initialFocusRef?: React.RefObject<FocusableElement>;
  /**
   * The `ref` of element to receive focus when the modal closes.
   */
  finalFocusRef?: React.RefObject<FocusableElement>;
  /**
   * If `true`, the modal will return focus to the element that triggered it when it closes.
   * @default true
   */
  returnFocusOnClose?: boolean;
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
  /**
   * If `true`, a `padding-right` will be applied to the body element
   * that's equal to the width of the scrollbar.
   *
   * This can help prevent some unpleasant flickering effect
   * and content adjustment when the modal opens
   */
  preserveScrollBarGap?: boolean;
  /**
   * The size(width) of the modal
   */
  size?: StringOrNumber;
  /**
   * variant of the modal
   * @default "blur"
   */
  variant?: 'blur' | 'normal';
}

type ScrollBehavior = 'inside' | 'outside';
type MotionPreset = 'slideInBottom' | 'slideInRight' | 'scale' | 'none';

export interface ModalProps extends UseModalProps, ModalOptions, NatureProps {
  /**
   *  If `true`, the modal will be centered on screen.
   * @default false
   */
  isCentered?: boolean;
  /**
   * Where scroll behavior should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   *
   * @default "outside"
   */
  scrollBehavior?: ScrollBehavior;
  /**
   * Props to be forwarded to the portal component
   */
  portalProps?: Pick<PortalProps, 'appendToParentPortal' | 'containerRef'>;
  /**
   * The transition that should be used for the modal
   */
  motionPreset?: MotionPreset;
}

interface ModalContext extends ModalOptions, UseModalReturn {
  /**
   * The transition that should be used for the modal
   */
  motionPreset?: MotionPreset;
}

const [ModalContextProvider, useModalContext] = createContext<ModalContext>({
  strict: true,
  name: 'ModalContext',
  errorMessage:
    'The `ModalContext` is not available outside the `Modal` component.',
});

export { ModalContextProvider, useModalContext };

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    portalProps,
    children,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    motionPreset,
    lockFocusAcrossFrames,
    size,
    variant,
    scrollBehavior,
  } = props;

  const modal = useModal(props);

  const context = {
    ...modal,
    scrollBehavior,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    motionPreset,
    lockFocusAcrossFrames,
    variant,
    size,
  };

  return (
    <ModalContextProvider value={context}>
      <AnimatePresence>
        {context.isOpen && <Portal {...portalProps}>{children}</Portal>}
      </AnimatePresence>
    </ModalContextProvider>
  );
};

Modal.defaultProps = {
  lockFocusAcrossFrames: true,
  returnFocusOnClose: true,
  scrollBehavior: 'inside',
  trapFocus: true,
  autoFocus: true,
  blockScrollOnMount: true,
  allowPinchZoom: false,
  motionPreset: 'scale',
};

if (__DEV__) {
  Modal.displayName = 'Modal';
}

interface ModalFocusScopeProps {
  /**
   * @type React.ReactElement
   */
  children: React.ReactElement;
}

export const ModalFocusScope = (props: ModalFocusScopeProps) => {
  const {
    autoFocus,
    trapFocus,
    dialogRef,
    initialFocusRef,
    blockScrollOnMount,
    allowPinchZoom,
    finalFocusRef,
    returnFocusOnClose,
    preserveScrollBarGap,
    lockFocusAcrossFrames,
  } = useModalContext();

  const [isPresent, safeToRemove] = usePresence();

  React.useEffect(() => {
    if (!isPresent) {
      setTimeout(() => safeToRemove(), 0);
    }
  }, [isPresent, safeToRemove]);

  return (
    <FocusLock
      autoFocus={autoFocus}
      isDisabled={!trapFocus}
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
      restoreFocus={returnFocusOnClose}
      contentRef={dialogRef}
      lockFocusAcrossFrames={lockFocusAcrossFrames}
    >
      <RemoveScroll
        removeScrollBar={!preserveScrollBarGap}
        allowPinchZoom={allowPinchZoom}
        enabled={blockScrollOnMount}
        forwardProps
      >
        {props.children}
      </RemoveScroll>
    </FocusLock>
  );
};

if (__DEV__) {
  ModalFocusScope.displayName = 'ModalFocusScope';
}

const _SIZES = {
  xs: '20rem !important',
  sm: '24rem !important',
  md: '28rem !important',
  lg: '32rem !important',
  xl: '36rem !important',
  full: '100% !important',
};

export interface ModalContentProps extends HTMLNatureProps<'section'> {
  /**
   * The props to forward to the modal's content wrapper
   */
  containerProps?: HTMLNatureProps<'div'>;
}

export const ModalContent = forwardRef<ModalContentProps, 'section'>(
  (props, ref) => {
    const { children, containerProps: rootProps, className, ...rest } = props;

    const {
      getDialogProps,
      getDialogContainerProps,
      scrollBehavior,
      size = 'md',
    } = useModalContext();

    console.log({ scrollBehavior });

    const dialogProps = getDialogProps(rest, ref) as any;
    const containerProps = getDialogContainerProps(rootProps);

    const { motionPreset } = useModalContext();
    const dialogContainerClassnames = clsx(
      'nature-modal__content-container',
      'min-h-screen w-screen h-screen flex fixed left-0 top-0 z-50 justify-center items-start',
      // `${scrollBehavior === 'inside' ? 'overflow-hidden' : 'overflow-auto'}`,
      {
        ['overflow-auto']: scrollBehavior === 'outside',
        ['overflow-hidden']: scrollBehavior === 'inside',
      },
    );
    let _size;

    if (size in _SIZES) {
      _size = _SIZES[size];
    } else {
      _size = size;
    }
    const dialogClassnames = cx(
      'nature-modal__content',
      'flex flex-col relative w-full outline-none bg-white rounded my-14',
      className,
    );

    const css = {
      maxWidth: _size,
      maxHeight:
        scrollBehavior === 'inside' ? 'calc(100vh - 7.5rem)' : undefined,
    };

    return (
      <ModalFocusScope>
        <nature.div
          {...containerProps}
          className={dialogContainerClassnames}
          tabIndex={1}
        >
          <ModalTransition
            preset={motionPreset}
            className={dialogClassnames}
            css={{ ...css, ...(props.css as any) }}
            {...dialogProps}
          >
            {children}
          </ModalTransition>
        </nature.div>
      </ModalFocusScope>
    );
  },
);

if (__DEV__) {
  ModalContent.displayName = 'ModalContent';
}

export interface ModalOverlayProps
  extends Omit<HTMLMotionProps<'div'>, 'color' | 'transition'>,
    NatureProps {}

const MotionDiv = nature(motion.div);
/**
 * ModalOverlay renders a backdrop behind the modal. It is
 * also used as a wrapper for the modal content for better positioning.
 *
 * @see Docs https://nature-ui.com/modal
 */
export const ModalOverlay = forwardRef<ModalOverlayProps, 'div'>(
  (props, ref) => {
    const { className, ...rest } = props;

    const { motionPreset, variant = 'blur' } = useModalContext();
    const motionProps: any = motionPreset === 'none' ? {} : fadeConfig;
    const _variant = variant === 'blur' ? '5px' : '0px';
    const css = {
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: `blur(${_variant})`,
    };
    const _className = cx(
      'nature-modal__overlay',
      'fixed left-0 top-0 w-screen h-screen z-50',
      className,
    );
    return (
      <MotionDiv
        {...motionProps}
        ref={ref}
        className={_className}
        css={{ ...css, ...(props.css as any) }}
        {...rest}
      />
    );
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
 * @see Docs https://nature-ui.com/modal
 */
export const ModalHeader = forwardRef<ModalHeaderProps, 'header'>(
  (props, ref) => {
    const { className, ...rest } = props;
    const { headerId, setHeaderMounted } = useModalContext();

    /**
     * Notify us if this component was rendered or used
     * so we can append `aria-labelledby` automatically
     */
    React.useEffect(() => {
      setHeaderMounted(true);
      return () => setHeaderMounted(false);
    }, [setHeaderMounted]);

    const _className = cx(
      'nature-modal__header',
      'nature-modal__header p-4 font-bold text-xl',
      className,
    );
    const opts = {
      ref,
      className: _className,
      id: headerId,
      ...rest,
    };

    return <nature.header {...opts} />;
  },
);

if (__DEV__) {
  ModalHeader.displayName = 'ModalHeader';
}

export interface ModalBodyProps extends HTMLNatureProps<'div'> {}

/**
 * ModalBody
 *
 * React component that houses the main content of the modal.
 *
 * @see Docs https://nature-ui.com/modal
 */
export const ModalBody = forwardRef<ModalBodyProps, 'div'>((props, ref) => {
  const { className, ...rest } = props;
  const { bodyId, setBodyMounted } = useModalContext();

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */
  React.useEffect(() => {
    setBodyMounted(true);
    return () => setBodyMounted(false);
  }, [setBodyMounted]);

  const _className = cx(
    'nature-modal__body',
    'flex-1 py-2 px-4 overflow-auto',
    className,
  );
  return <nature.div ref={ref} className={_className} id={bodyId} {...rest} />;
});

if (__DEV__) {
  ModalBody.displayName = 'ModalBody';
}

export interface ModalFooterProps extends HTMLNatureProps<'footer'> {}

/**
 * ModalFooter houses the action buttons of the modal.
 * @see Docs https://nature-ui.com/modal
 */
export const ModalFooter = forwardRef<ModalFooterProps, 'footer'>(
  (props, ref) => {
    const { className, ...rest } = props;

    const _className = cx(
      'nature-modal__footer',
      'flex items-center justify-end p-4',
      className,
    );
    return (
      <nature.footer
        ref={ref}
        className={_className}
        {...rest}
        css={{ flex: 0, ...(props.css as any) }}
      />
    );
  },
);

if (__DEV__) {
  ModalFooter.displayName = 'ModalFooter';
}

/**
 * ModalCloseButton is used closes the modal.
 *
 * You don't need to pass the `onClick` to it, it reads the
 * `onClose` action from the modal context.
 */
export const ModalCloseButton = forwardRef<
  Partial<HTMLButtonElement>,
  'button'
>((props, ref) => {
  const { onClick, className, ...rest } = props;
  const { onClose } = useModalContext();
  const _className = cx(
    'nature-modal__close-button',
    'absolute top-0 right-0 mt-3 mr-3',
    className,
  );

  return (
    <CloseButton
      {...rest}
      ref={ref}
      className={_className}
      onClick={callAllHandler(onClick, (event: React.MouseEvent) => {
        event.stopPropagation();
        onClose();
      })}
    />
  );
});

if (__DEV__) {
  ModalCloseButton.displayName = 'ModalCloseButton';
}
