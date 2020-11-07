import { useIds } from '@nature-ui/hooks';
import { callAllHandler, Dict, mergeRefs } from '@nature-ui/utils';
import { Undo, hideOthers } from 'aria-hidden';
import * as React from 'react';

import { manager, useModalManager } from './modal-manager';

export interface UseModalProps {
  /**
   * If `true`, the modal when be opened.
   */
  isOpen: boolean;
  /**
   * The `id` of the modal
   */
  id?: string;
  /**
   * Callback invoked to close the modal.
   */
  onClose(): void;
  /**
   * If `true`, the modal will close when the overlay is clicked
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * If `true`, the modal will close when the `Esc` key is pressed
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Callback fired when the overlay is clicked.
   */
  onOverlayClick?(): void;
  /**
   * Callback fired when the escape key is pressed and focus is within modal
   */
  onEsc?(): void;
  /**
   * A11y: If `true`, the siblings of the `modal` will have `aria-hidden`
   * set to `true` so that screen readers can only see the `modal`.
   *
   * This is commonly known as making the other elements **inert**
   *
   *  @default true
   */
  useInert?: boolean;
}

/**
 * Modal hook that manages all the logic for the modal dialog widget
 * and returns prop getters, state and actions.
 *
 * @param props
 */
export const useModal = (props: UseModalProps) => {
  const {
    isOpen,
    onClose,
    id,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    useInert = true,
    onOverlayClick: onOverlayClickProp,
    onEsc,
  } = props;

  const dialogRef = React.useRef<any>(null);
  const overlayRef = React.useRef<any>(null);

  const [dialogId, headerId, bodyId] = useIds(
    id,
    `nature-modal`,
    `nature-modal--header`,
    `nature-modal--body`
  );

  /**
   * Hook used to polyfill `aria-modal` for older browsers.
   * It adds `aria-hidden` to all other nodes
   *
   * @see https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/
   */
  useAriaHidden(dialogRef, isOpen && useInert);

  /**
   * Hoot used to manage multiple or nested modals
   */
  useModalManager(dialogRef, isOpen);

  const mouseDownTarget = React.useRef<EventTarget | null>(null);

  const onMouseDown = React.useCallback((event: React.MouseEvent) => {
    mouseDownTarget.current = event.target;
  }, []);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();

        if (closeOnEsc) {
          onClose?.();
        }

        onEsc?.();
      }
    },
    [closeOnEsc, onClose, onEsc]
  );

  const onOverlayClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      /**
       * Make sure the event starts and ends on the DOM element.
       *
       * This is used to prevvent the modal from closing when you start
       * debugging from the content, and release drag outside the content.
       *
       * We prevent this because it's technically not considered "click outside"
       */
      if (mouseDownTarget.current !== event.target) return;

      /**
       * When you click on the overlay, we want to remove only the topmost modal
       */
      if (manager.isTopModal(dialogRef)) {
        if (closeOnOverlayClick) {
          onClose?.();
        }

        onOverlayClickProp?.();
      }
    },
    [onClose, closeOnOverlayClick, onOverlayClickProp]
  );

  const [headerMounted, setHeaderMounted] = React.useState(false);
  const [bodyMounted, setBodyMounted] = React.useState(false);

  return {
    isOpen,
    onClose,
    headerId,
    bodyId,
    setBodyMounted,
    setHeaderMounted,
    dialogRef,
    getContentProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, dialogRef),
      id: dialogId,
      role: props.role || 'dialog',
      tabIndex: -1,
      'aria-modal': true,
      'aria-labelledby': headerMounted ? headerId : undefined,
      'aria-describedby': bodyMounted ? bodyId : undefined,
      onClick: callAllHandler(props.onClick, (event: React.MouseEvent) =>
        event.stopPropagation()
      ),
    }),
    getOverlayProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, overlayRef),
      onClick: callAllHandler(props.onClick, onOverlayClick),
      onKeyDown: callAllHandler(props.onKeyDown, onKeyDown),
      onMouseDown: callAllHandler(props.onMouseDown, onMouseDown),
    }),
  };
};

export type UseModalReturn = ReturnType<typeof useModal>;

/**
 * Modal hook to polyfill `aria-modal`.
 *
 * It applies `aria-hidden` to elements behind the modal
 * to indicate that they're `inert`.
 *
 * @param ref React ref of the node
 * @param shouldHide whether `aria-hidden` should be applied
 */
export const useAriaHidden = (
  ref: React.RefObject<HTMLElement>,
  shouldHide: boolean
) => {
  React.useEffect(() => {
    if (!ref.current) return;
    let undo: Undo | null = null;

    if (shouldHide && ref.current) {
      undo = hideOthers(ref.current);
    }

    return () => {
      if (shouldHide) {
        undo?.();
      }
    };
  }, [shouldHide, ref]);
};
