import { FocusLockProps } from '@nature-ui/focus-lock';
import { Portal, PortalProps } from '@nature-ui/portal';
import { createContext } from '@nature-ui/react-utils';
import { HTMLNatureProps, NatureProps, forwardRef } from '@nature-ui/system';
import { FocusableElement, __DEV__ } from '@nature-ui/utils';
import { AnimatePresence } from 'framer-motion';
import React,  from 'react';
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
  } = props;

  const modal = useModal(props);

  const context = {
    ...modal,
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
  scrollBehavior: "outside",
  trapFocus: true,
  autoFocus: true,
  blockScrollOnMount: true,
  allowPinchZoom: false,
  motionPreset: "scale",
}

if (__DEV__) {
  Modal.displayName = "Modal"
}

export interface ModalContentProps extends HTMLNatureProps<"section"> {
    /**
   * The props to forward to the modal's content wrapper
   */
  containerProps?: HTMLNatureProps<"div">
}

export const ModalContent = forwardRef<ModalContentProps, "section">(
  (props, ref) => {
        const {  children, containerProps: rootProps, ...rest } = props

    const { getDialogProps, getDialogContainerProps } = useModalContext()

    const dialogProps = getDialogProps(rest, ref) as any
    const containerProps = getDialogContainerProps(rootProps)
    
    
  }
)