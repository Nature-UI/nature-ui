import { useBoolean, useDisclosure, useIds } from '@nature-ui/hooks';
import { Placement, usePopper, UsePopperProps } from '@nature-ui/popper';
import { callAllHandler, Dict, mergeRefs } from '@nature-ui/utils';
import * as React from 'react';

import {
  useBlurOutside,
  useFocusOnHide,
  useFocusOnShow,
} from './popover.utils';

export interface UsePopoverProps {
  /**
   * The html `id` attribute of the popover.
   * If not provided, we generate a unique id.
   *
   * This `id` is also used to auto-generate the `aria-labelledby`
   * and `aria-decribedby` attributes that points to the `PopoverHeader` and `PopoverBody`
   */
  id?: string;
  /**
   * If `true`, the popover will be opened in controlled mode.
   */
  isOpen?: boolean;
  /**
   * If `true`, the popover will be initially opened.
   */
  defaultIsOpen?: boolean;
  /**
   * The `ref` of the element that should receive focus when the popover opens.
   */
  initialFocusRef?: React.RefObject<any>;
  /**
   * If `true`, focus will be returned to the element that triggers the popover
   * when it closes
   */
  returnFocus?: boolean;
  /**
   * If `true`, focus will be transferred to the first interactive element
   * when the popover opens
   */
  autoFocus?: boolean;
  /**
   * The gap (in pixels) to apply between the popover and the target.
   * Used by `popper.js`
   */
  gutter?: number;
  /**
   * The placment of the popover
   */
  placement?: Placement;
  /**
   * If `true`, the popover will close when you blur out it by
   * clicking outside or tabbing out
   */
  closeOnBlur?: boolean;
  /**
   * If `true`, the popover will close when you hit the `Esc` key
   */
  closeOnEsc?: boolean;
  /**
   * Callback fired when the popover opens
   */
  onOpen?: () => void;
  /**
   * Callback fired when the popover closes
   */
  onClose?: () => void;
  /**
   * The size of the popover arrow
   */
  arrowSize?: number;
  /**
   * The `box-shadow` of the popover arrow
   */
  arrowShadowColor?: string;
  /**
   * The Popper.js modifiers to use.
   */
  modifiers?: UsePopperProps['modifiers'];
}

export const usePopover = (props: UsePopoverProps = {}) => {
  const {
    closeOnBlur = true,
    closeOnEsc = true,
    initialFocusRef,
    placement,
    gutter,
    id,
    arrowSize,
    returnFocus = true,
    autoFocus = true,
    arrowShadowColor = '#E2E8F0',
    modifiers,
  } = props;

  const { isOpen, onClose, onToggle } = useDisclosure(props);

  const triggerRef = React.useRef<any>(null);
  const popoverRef = React.useRef<any>(null);

  const [hasHeader, setHasHeader] = useBoolean();
  const [hasBody, setHasBody] = useBoolean();

  const [triggerId, popoverId, headerId, bodyId] = useIds(
    id,
    'popover-trigger',
    'popover-content',
    'popover-header',
    'popover-body'
  );

  const { popper, reference, arrow } = usePopper({
    placement,
    gutter,
    forceUpdate: isOpen,
    arrowSize,
    arrowShadowColor,
    modifiers,
  });

  useFocusOnHide(popoverRef, {
    autoFocus: returnFocus,
    visible: isOpen,
    focusRef: triggerRef,
  });

  useFocusOnShow(popoverRef, {
    autoFocus,
    visible: isOpen,
    focusRef: initialFocusRef,
  });

  const onBlur = useBlurOutside(triggerRef, popoverRef, {
    visible: Boolean(closeOnBlur && isOpen),
    action: onClose,
  });

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  return {
    isOpen,
    onClose,
    headerId,
    hasHeader,
    setHasHeader,
    bodyId,
    hasBody,
    setHasBody,
    getArrowProps: (_props: Dict = {}) => ({
      ..._props,
      ref: mergeRefs(arrow.ref, _props.ref),
      css: {
        ...arrow.style,
        ..._props.style,
      },
    }),
    getTriggerProps: (_props: Dict = {}) => ({
      ..._props,
      id: triggerId,
      ref: mergeRefs(triggerRef, reference.ref, _props.ref),
      'aria-haspopup': 'dialog' as React.AriaAttributes['aria-haspopup'],
      'aria-expanded': isOpen,
      'aria-controls': popoverId,
      onClick: callAllHandler(_props.onClick, onToggle),
    }),
    getPopoverProps: (_props: Dict = {}) => ({
      ..._props,
      id: popoverId,
      tabIndex: -1,
      hidden: !isOpen,
      ref: mergeRefs(popoverRef, popper.ref, _props.ref),
      style: {
        ..._props.style,
        ...popper.style,
      },
      'aria-hidden': isOpen ? undefined : true,
      role: 'dialog',
      onBlur: callAllHandler(_props.onBlur, onBlur),
      onKeyDown: callAllHandler(_props.onKeyDown, onKeyDown),
      'aria-labelledby': hasHeader ? headerId : undefined,
      'aria-describedby': hasBody ? bodyId : undefined,
    }),
  };
};

export type UsePopoverReturn = ReturnType<typeof usePopover>;
