/** ** */
import {
  Modal,
  ModalBody as AlertDialogBody,
  ModalCloseButton as AlertDialogCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter as AlertDialogFooter,
  ModalHeader as AlertDialogHeader,
  ModalOverlay as AlertDialogOverlay,
  ModalProps,
} from '@nature-ui/modal';
import { forwardRef } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';

export interface AlertDialogProps extends Omit<ModalProps, 'initialFocusRef'> {
  leastDestructiveRef: ModalProps['initialFocusRef'];
}

export const AlertDialog = (props: AlertDialogProps) => {
  const { leastDestructiveRef, ...rest } = props;

  return <Modal initialFocusRef={leastDestructiveRef} {...rest} />;
};

export const AlertDialogContent = forwardRef<ModalContentProps, 'div'>(
  (props, ref) => <ModalContent ref={ref} role='alertdialog' {...props} />,
);

if (__DEV__) {
  AlertDialogContent.displayName = 'AlertDialogContent';
}

export {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
};
