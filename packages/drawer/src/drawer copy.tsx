import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalOverlayProps,
  ModalProps,
} from '@nature-ui/modal';
import { clsx, css, forwardRef } from '@nature-ui/system';
import { Fade, Slide, SlideProps } from '@nature-ui/transition';
import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

interface TransitionStyles {
  content: React.CSSProperties;
  overlay: React.CSSProperties;
}

const TransitionContext = React.createContext<TransitionStyles>({
  content: {},
  overlay: {},
});

if (__DEV__) {
  TransitionContext.displayName = 'TransitionContext';
}

const useTransitionContext = () => React.useContext(TransitionContext);

interface DrawerTrasitionProps {
  in: boolean;
  children: (styles: TransitionStyles) => React.ReactNode;
  placement: SlideProps['direction'];
}

const DrawerTransition = (props: DrawerTrasitionProps) => {
  const { in: inProp, children, placement } = props;

  return (
    <Slide in={inProp} direction={placement}>
      {(contentStyle) => (
        <Fade in={inProp}>
          {(overlayStyle) =>
            children({
              content: contentStyle,
              overlay: overlayStyle,
            })
          }
        </Fade>
      )}
    </Slide>
  );
};

if (__DEV__) {
  DrawerTransition.displayName = 'DrawerTransition';
}

export interface DrawerProps extends ModalProps {
  placement?: SlideProps['direction'];
  isFullHeight?: boolean;
}

export const Drawer = (props: DrawerProps) => {
  const { isOpen, onClose, placement = 'left', children, ...rest } = props;

  return (
    <DrawerTransition in={isOpen} placement={placement}>
      {(styles) => (
        <TransitionContext.Provider value={styles}>
          <Modal isOpen onClose={onClose} {...rest}>
            {children}
          </Modal>
        </TransitionContext.Provider>
      )}
    </DrawerTransition>
  );
};

if (__DEV__) {
  Drawer.displayName = 'Drawer';
}

export const DrawerContent = forwardRef<ModalContentProps, 'div'>(
  (props, ref) => {
    const { content: styles } = useTransitionContext();
    const { className = '', ...rest } = props;

    const _css = css(styles as any);
    const _className = clsx(_css, 'fixed mt-0 mb-0 rounded-none', className);

    return <ModalContent ref={ref} className={_className} {...rest} />;
  },
);

if (__DEV__) {
  DrawerContent.displayName = 'DrawerContent';
}

export const DrawerOverlay = forwardRef<ModalOverlayProps, 'div'>(
  (props, ref) => {
    const { overlay: styles } = useTransitionContext();
    const { className = '', ...rest } = props;

    const _css = css(styles as any);
    const _className = clsx(_css, 'transition-all duration-200', className);

    return <ModalOverlay className={_className} ref={ref} {...rest} />;
  },
);

if (__DEV__) {
  DrawerOverlay.displayName = 'DrawerOverlay';
}

export {
  ModalBody as DrawerBody,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter,
  ModalCloseButton as DrawerCloseButton,
};
