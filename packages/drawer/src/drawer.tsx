import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFocusScope,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useModalContext,
} from '@nature-ui/modal';
import { createContext } from '@nature-ui/react-utils';
import { forwardRef, HTMLNatureProps, nature } from '@nature-ui/system';
import { Slide, SlideOptions } from '@nature-ui/transition';
import { __DEV__ } from '@nature-ui/utils';

const [DrawerContextProvider, useDrawerContext] =
  createContext<DrawerOptions>();

interface DrawerOptions {
  /**
   * The placement of the drawer
   */
  placement?: SlideOptions['direction'];
  /**
   * If `true` and drawer's placement is `top` or `bottom`,
   * the drawer will occupy the viewport height (100vh)
   */
  isFullHeight?: boolean;
}

export interface DrawerProps
  extends Omit<ModalProps, 'scrollBehavior' | 'motionPreset' | 'isCentered'>,
    DrawerOptions,
    HTMLNatureProps<'span'> {}

export const Drawer = (props: DrawerProps) => {
  const { placement = 'right', children, ...rest } = props;

  return (
    <DrawerContextProvider value={{ placement }}>
      <Modal {...rest}>{children}</Modal>
    </DrawerContextProvider>
  );
};

const StyledSlide = nature(Slide);
export interface DrawerContentProps extends HTMLNatureProps<'div'> {}

export const DrawerContent = forwardRef<DrawerContentProps, 'section'>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    const { getDialogProps, getDialogContainerProps, isOpen } =
      useModalContext();

    const dialogProps = getDialogProps(rest, ref) as any;
    const containerProps = getDialogContainerProps();

    // const dialogStyles = css({
    //   display: 'flex',
    //   flexDirection: 'column',
    //   position: 'relative',
    //   width: '100%',
    //   outline: 0,
    // });

    // const dialogContainerStyles = css({
    //   display: 'flex',
    // });

    const { placement } = useDrawerContext();

    return (
      <nature.div {...containerProps}>
        <ModalFocusScope>
          <StyledSlide direction={placement} in={isOpen} {...dialogProps}>
            {children}
          </StyledSlide>
        </ModalFocusScope>
      </nature.div>
    );
  },
);

if (__DEV__) {
  Drawer.displayName = 'Drawer';
  DrawerContent.displayName = 'DrawerContent';
}

export {
  ModalBody as DrawerBody,
  ModalCloseButton as DrawerCloseButton,
  ModalFooter as DrawerFooter,
  ModalHeader as DrawerHeader,
  ModalOverlay as DrawerOverlay,
};
