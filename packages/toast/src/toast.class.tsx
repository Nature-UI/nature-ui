import { isBrowser } from '@nature-ui/utils';
import { render } from 'react-dom';
import { Methods, ToastManager } from './toast-manager';
import {
  CloseAllToastsOptions,
  ToastId,
  ToastMessage,
  ToastOptions,
} from './toast.types';

const portalId = 'nature-toast-portal';

class Toaster {
  private createToast?: Methods['notify'];

  private removeAll?: Methods['closeAll'];

  private closeToast?: Methods['close'];

  private updateToast?: Methods['update'];

  private isToastActive?: Methods['isActive'];

  /**
   * Initialize the manager and mount it in the DOM
   * inside the portal node
   */
  constructor() {
    if (!isBrowser) return;

    let portal: HTMLElement;
    const existingPortal = document.getElementById(portalId);

    if (existingPortal) {
      portal = existingPortal;
    } else {
      const div = document.createElement('div');
      div.id = portalId;
      document.body?.appendChild(div);
      portal = div;
    }

    render(<ToastManager notify={this.bindFunctions} />, portal);
  }

  private bindFunctions = (methods: Methods) => {
    this.createToast = methods.notify;
    this.removeAll = methods.closeAll;
    this.closeToast = methods.close;
    this.updateToast = methods.update;
    this.isToastActive = methods.isActive;
  };

  notify = (message: ToastMessage, options: Partial<ToastOptions> = {}) => {
    return this.createToast?.(message, options);
  };

  close = (id: ToastId) => {
    this.closeToast?.(id);
  };

  closeAll = (options?: CloseAllToastsOptions) => {
    this.removeAll?.(options);
  };

  update = (id: ToastId, options: Partial<ToastOptions> = {}) => {
    this.updateToast?.(id, options);
  };

  isActive = (id: ToastId) => {
    return this.isToastActive?.(id);
  };
}

export const toast = new Toaster();
