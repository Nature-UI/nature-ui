import {
  ModalBody,
  ModalCloseButton,
  ModalContentProps,
  ModalFocusScope,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NatureModal,
  NatureModalProps,
  useModalContext,
} from '@nature-ui/modal';
import { createContext } from '@nature-ui/react-utils';
import { css, forwardRef, HTMLNatureProps, nature } from '@nature-ui/system';
import { Slide, SlideOptions } from '@nature-ui/transition';
import { cx, __DEV__ } from '@nature-ui/utils';

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
  extends Omit<
      NatureModalProps,
      'scrollBehavior' | 'motionPreset' | 'isCentered'
    >,
    DrawerOptions,
    HTMLNatureProps<'span'> {}

export const Drawer = (props: DrawerProps) => {
  const { placement = 'right', children, className, ...rest } = props;

  return (
    <DrawerContextProvider value={{ placement }}>
      <NatureModal {...rest}>{children}</NatureModal>
    </DrawerContextProvider>
  );
};

const sizes = {
  full: { maxW: 'max-w-screen' },
  lg: { maxW: 'max-w-2xl' },
  md: { maxW: 'max-w-lg' },
  sm: { maxW: 'max-w-md' },
  xl: { maxW: 'max-w-4xl' },
  xs: { maxW: 'max-w-xs' },
};

const StyledSlide = nature(Slide);
export interface DrawerContentProps extends ModalContentProps {}

export const DrawerContent = forwardRef<DrawerContentProps, 'section'>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    const {
      getDialogProps,
      getDialogContainerProps,
      size = 'xs',
      isOpen,
    } = useModalContext();

    const dialogProps = getDialogProps(rest, ref) as any;
    const containerProps = getDialogContainerProps();

    const dialogStyles = css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      outline: 0,
    });

    const dialogContainerStyles = css({
      display: 'flex',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
    });

    const { placement } = useDrawerContext();

    return (
      <nature.div
        {...containerProps}
        className={cx(
          'nature-modal__content-container z-50',
          dialogContainerStyles,
        )}
      >
        <ModalFocusScope>
          <StyledSlide
            direction={placement}
            in={isOpen}
            {...dialogProps}
            className={cx(
              'nature-modal__content',
              'z-50 bg-white',
              sizes[size].maxW,
              dialogStyles,
              className,
            )}
          >
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
