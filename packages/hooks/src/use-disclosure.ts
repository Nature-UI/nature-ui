import { callAllHandler } from '@nature-ui/utils';
import React from 'react';

import { useControllableProp } from './use-controllable';
import { useId } from './use-id';

export interface UseDisclosureProps {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
  id?: string;
}

export const useDisclosure = (props: UseDisclosureProps = {}) => {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id: idProp,
  } = props;

  const [isOpenState, setIsOpen] = React.useState(props.defaultIsOpen || false);
  const [isControlled, isOpen] = useControllableProp(isOpenProp, isOpenState);

  const id = useId(idProp, 'disclosure');

  const onClose = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }

    onCloseProp?.();
  }, [isControlled, onCloseProp]);

  const onOpen = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }

    onOpenProp?.();
  }, [isControlled, onOpenProp]);

  const onToggle = React.useCallback(() => {
    const action = isOpen ? onClose : onOpen;

    action();
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen: Boolean(isOpen),
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps: (_props: any = {}) => ({
      ..._props,
      'aria-expanded': 'true',
      'aria-controls': id,
      onClick: callAllHandler(_props.onClick, onToggle),
    }),
    getDisclosureProps: (_props: any = {}) => ({
      ..._props,
      hidden: !isOpen,
      id,
    }),
  };
};

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
