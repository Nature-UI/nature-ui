import { Interpolation, Theme } from '@emotion/react';
import { nature } from '@nature-ui/system';
import { objectKeys } from '@nature-ui/utils';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { Toast } from './toast';
import {
  CloseAllToastsOptions,
  ToastId,
  ToastMessage,
  ToastOptions,
  ToastPosition,
  ToastState,
} from './toast.types';
import { findToast, getToastPosition } from './toast.utils';

export interface Methods {
  notify: (message: ToastMessage, options: CreateToastOptions) => ToastId;
  closeAll: (options?: CloseAllToastsOptions) => void;
  close: (id: ToastId) => void;
  update: (id: ToastId, options: CreateToastOptions) => void;
  isActive: (id: ToastId) => boolean;
}

interface Props {
  notify: (methods: Methods) => void;
}

type State = { [K in ToastPosition]: ToastOptions[] };

type CreateToastOptions = Partial<
  Pick<
    ToastOptions,
    | 'status'
    | 'duration'
    | 'position'
    | 'id'
    | 'onCloseComplete'
    | 'containerStyle'
  >
>;

/**
 * Manages the creation and removal of toasts
 * across all corners ("top", "bottom", etc)
 */
export class ToastManager extends React.Component<Props, State> {
  /**
   * Static id counter to create unique ids
   * for each toast
   */
  static counter = 0;

  state: ToastState = {
    top: [],
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    bottom: [],
    'bottom-right': [],
  };

  constructor(props: Props) {
    super(props);

    /**
     * State to track all the toast across all positions
     */
    const methods = {
      notify: this.notify,
      closeAll: this.closeAll,
      close: this.closeToast,
      update: this.updateToast,
      isActive: this.isVisible,
    };

    props.notify(methods);
  }

  /**
   * Function to actually create a toast and add it
   * to state at the specified position
   */
  notify = (message: ToastMessage, options: CreateToastOptions) => {
    const toast = this.createToast(message, options);
    const { position, id } = toast;

    this.setState((prevToasts) => {
      /**
       * - If the toast is positioned at the top edges, the
       * recent toast stacks on top of the other toasts.
       *
       * - If the toast is positioned at the bottom edges, the recent
       * toast stacks below the other toasts.
       */
      const isTop = position.includes('top');

      return {
        ...prevToasts,
        [position]: isTop
          ? [toast, ...prevToasts[position]]
          : [...prevToasts[position], toast],
      };
    });

    return id;
  };

  /**
   * Update a specific toast with new options based on the
   * passed `id`
   */
  updateToast = (id: ToastId, options: CreateToastOptions) => {
    this.setState((prevState) => {
      const nextState = { ...prevState };
      const { position, index } = findToast(nextState, id);

      if (position && index !== -1) {
        nextState[position][index] = {
          ...nextState[position][index],
          ...options,
        };
      }

      return nextState;
    });
  };

  /**
   * Close all toasts at once
   */
  closeAll = ({ positions }: CloseAllToastsOptions = {}) => {
    this.setState((prevState) => {
      const allPositions: ToastPosition[] = [
        'top',
        'bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ];

      const positionsToClose = positions ?? allPositions;

      return positionsToClose.reduce((acc, position) => {
        acc[position] = prevState[position].map((toast) => ({
          ...toast,
          requestClose: true,
        }));

        return acc;
      }, {});
    });
  };

  /**
   * Create properties for a new toast
   */
  createToast = (message: ToastMessage, options: CreateToastOptions) => {
    const id = options.id ?? ++ToastManager.counter;

    const position = options.position ?? 'top';

    return {
      id,
      message,
      position,
      duration: options.duration,
      onCloseComplete: options.onCloseComplete,
      onRequestRemove: () => this.removeToast(String(id), position),
      status: options.status,
      requestClose: false,
      containerStyle: options.containerStyle,
    };
  };

  /**
   * Requests to close a toast based on it's id and position
   */
  closeToast = (id: ToastId) => {
    this.setState((prevState) => {
      const position = getToastPosition(prevState, id);

      if (!position) return prevState;

      return {
        ...prevState,
        [position]: prevState[position].map((toast) => {
          if (toast.id === id) {
            return {
              ...toast,
              requestClose: true,
            };
          }
          return toast;
        }),
      };
    });
  };

  /**
   * Delete a toast record at it's position
   */
  removeToast = (id: ToastId, position: ToastPosition) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [position]: prevState[position].filter(
          (toast) => String(toast.id) !== String(id),
        ),
      };
    });
  };

  isVisible = (id: ToastId) => {
    const { position } = findToast(this.state, id);
    return Boolean(position);
  };

  /**
   * Compute the style of a toast based on it's position
   */
  getStyle = (position: ToastPosition): Interpolation<Theme> => {
    const isTopOrBottom = position === 'top' || position === 'bottom';
    const margin = isTopOrBottom ? '0 auto' : undefined;

    const top = position.includes('top')
      ? 'env(safe-area-inset-top, 0px)'
      : undefined;
    const bottom = position.includes('bottom')
      ? 'env(safe-area-inset-bottom, 0px)'
      : undefined;
    const right = !position.includes('left')
      ? 'env(safe-area-inset-right, 0px)'
      : undefined;
    const left = !position.includes('right')
      ? 'env(safe-area-inset-left, 0px)'
      : undefined;

    return {
      position: 'fixed',
      zIndex: 5500,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      margin,
      top,
      bottom,
      right,
      left,
    };
  };

  render() {
    return objectKeys(this.state).map((position: ToastPosition) => {
      const { state } = this;
      const toasts = state[position];
      return (
        <nature.ul
          key={position}
          id={`nature-toast-manager-${position}`}
          css={this.getStyle(position)}
        >
          <AnimatePresence initial={false}>
            {toasts.map((toast) => (
              <Toast key={toast.id} {...toast} />
            ))}
          </AnimatePresence>
        </nature.ul>
      );
    });
  }
}
