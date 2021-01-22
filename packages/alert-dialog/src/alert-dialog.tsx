/** @jsx jsx */
import { jsx } from '@nature-ui/system';
import {
  Modal,
  ModalContent,
  ModalContentProps,
  ModalProps,
  ModalBody as AlertDialogBody,
  ModalCloseButton as AlertDialogCloseButton,
  ModalFooter as AlertDialogFooter,
  ModalHeader as AlertDialogHeader,
  ModalOverlay as AlertDialogOverlay,
} from '@nature-ui/modal';
import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

export interface AlertDialogProps extends Omit<ModalProps, 'initialFocusRef'> {
  leastDestructiveRef: ModalProps['initialFocusRef'];
}

export const AlertDialog = (props: AlertDialogProps) => {
  const { leastDestructiveRef, ...rest } = props;

  return <Modal initialFocusRef={leastDestructiveRef} {...rest} />;
};

export const AlertDialogContent = React.forwardRef(
  (props: ModalContentProps, ref: React.Ref<any>) => (
    <ModalContent ref={ref} role='alertdialog' {...props} />
  ),
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
