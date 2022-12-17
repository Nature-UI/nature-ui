import { forwardRef } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
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
} from '.';

export interface AlertDialogProps extends Omit<ModalProps, 'initialFocusRef'> {
  leastDestructiveRef: NonNullable<ModalProps['initialFocusRef']>;
}

/**
 * `AlertDialog` component is used interrupt the user with a mandatory confirmation or action.
 *
 * @see Docs https://chakra-ui.com/docs/components/alert-dialog
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
 */
const AlertDialog = (props: AlertDialogProps) => {
  const { leastDestructiveRef, ...rest } = props;
  return <Modal {...rest} initialFocusRef={leastDestructiveRef} />;
};

export const AlertDialogContent = forwardRef<ModalContentProps, 'section'>(
  (props, ref) => <ModalContent ref={ref} role='alertdialog' {...props} />,
);

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
};
