import {
  Modal as AlertDialog,
  ModalBody as AlertDialogBody,
  ModalCloseButton as AlertDialogCloseButton,
  ModalContent as AlertDialogContent,
  ModalContentProps as AlertDialogContentProps,
  ModalFooter as AlertDialogFooter,
  ModalHeader as AlertDialogHeader,
  ModalOverlay as AlertDialogOverlay,
  ModalProps as AlertDialogProps,
} from '@nature-ui/modal';
import { __DEV__ } from '@nature-ui/utils';

if (__DEV__) {
  AlertDialogContent.displayName = 'AlertDialogContent';
  AlertDialog.displayName = 'AlertDialog';
  AlertDialogBody.displayName = 'AlertDialogBody';
  AlertDialogCloseButton.displayName = 'AlertDialogCloseButton';
  AlertDialogFooter.displayName = 'AlertDialogFooter';
  AlertDialogHeader.displayName = 'AlertDialogHeader';
  AlertDialogOverlay.displayName = 'AlertDialogOverlay';
}

export {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogContent,
  AlertDialogContentProps,
  AlertDialogProps,
};
