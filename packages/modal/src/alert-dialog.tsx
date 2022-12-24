import React from 'react';
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
} from './index';

export interface AlertDialogProps extends Omit<ModalProps, 'initialFocusRef'> {
  leastDestructiveRef: NonNullable<ModalProps['initialFocusRef']>;
}

/**
 * `AlertDialog` component is used interrupt the user with a mandatory confirmation or action.
 *
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
 */
const AlertDialog = (props: AlertDialogProps) => {
  const { leastDestructiveRef, ...rest } = props;
  return <Modal {...rest} initialFocusRef={leastDestructiveRef} />;
};

export const AlertDialogContent = React.forwardRef(
  (props: ModalContentProps, ref: React.Ref<any>) => (
    <ModalContent {...props} ref={ref} role='alertdialog' />
  ),
);

export {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialog,
};
