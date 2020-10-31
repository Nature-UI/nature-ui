import * as React from 'react';

/**
 * Proper state management for nested modals.
 * Simplified, but inspired by material-ui's ModalManager class.
 */
export const manager = {
  modals: [] as any,
  add(modal: any) {
    this.modals.push(modal);
  },
  remove(modal: any) {
    this.modals = this.modals.filter((_modal: any) => _modal !== modal);
  },
  isTopModal(modal: any) {
    const topmostModal = this.modals[this.modals.length - 1];

    return topmostModal === modal;
  },
};

export function useModalManager(ref: React.Ref<any>, isOpen?: boolean) {
  React.useEffect(() => {
    isOpen && manager.add(ref);

    return () => {
      manager.remove(ref);
    };
  }, [isOpen, ref]);
}
