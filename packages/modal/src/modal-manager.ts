import React from 'react';

/**
 * Proper state management for nested modals.
 * Simplified, but inspired by material-ui's ModalManager class.
 */
class ModalManager {
  modals: any[];

  constructor() {
    this.modals = [];
  }

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(modal: any) {
    this.modals = this.modals.filter((_modal) => _modal !== modal);
  }

  isTopModal(modal: any) {
    const topmostModal = this.modals[this.modals.length - 1];
    return topmostModal === modal;
  }
}

export const manager = new ModalManager();

export const useModalManager = (ref: React.Ref<any>, isOpen?: boolean) => {
  React.useEffect(() => {
    if (isOpen) {
      manager.add(ref);
    }

    return () => {
      manager.remove(ref);
    };
  }, [isOpen, ref]);
};
