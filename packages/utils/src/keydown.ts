import * as React from 'react';

import { runIfFn } from './functions';
import { normalizeEventKey } from './dom';

type EventKeys =
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Space'
  | 'Tab'
  | 'Backspace'
  | 'Control'
  | 'Meta'
  | 'Home'
  | 'End'
  | 'PageDown'
  | 'PageUp'
  | 'Delete'
  | 'Escape'
  | ' '
  | 'Shift';

type KeyMapReturn = (event: React.KeyboardEvent) => any;
type KeyMap = Partial<Record<EventKeys, KeyMapReturn>>;

export interface CreateOnKeyDownOptions {
  keyMap?: KeyMap;
  onKey?: (event: React.KeyboardEvent) => any;
  preventDefault?: boolean | ((event: React.KeyboardEvent) => boolean);
  stopPropagation?: boolean | ((event: React.KeyboardEvent) => boolean);
  onKeyDown?: (event: React.KeyboardEvent) => void;
  shouldKeyDown?: (event: React.KeyboardEvent) => boolean;
}

export const createOnKeyDown = (opts: CreateOnKeyDownOptions) => {
  const {
    keyMap,
    onKey,
    stopPropagation,
    onKeyDown,
    shouldKeyDown = () => true,
    preventDefault = true,
  } = opts;

  return (event: React.KeyboardEvent) => {
    if (!keyMap) return;

    const finalKeyMap = runIfFn(keyMap, event);
    const shouldPreventDefault = runIfFn(preventDefault, event);
    const shouldStopPropagation = runIfFn(stopPropagation, event);

    const eventKey = normalizeEventKey(event);

    if (eventKey in finalKeyMap) {
      const action = finalKeyMap[eventKey as EventKeys];

      if (typeof action === 'function' && shouldKeyDown(event)) {
        if (shouldPreventDefault) event.preventDefault();

        if (shouldStopPropagation) event.stopPropagation();
        onKey?.(event);
        action(event);

        return;
      }
    }

    onKeyDown?.(event);
  };
};
