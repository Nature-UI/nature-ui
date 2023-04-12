import React from 'react';
import { EventKeys } from '.';
import { Booleanish } from './types';

// eslint-disable-next-line import/no-mutable-exports
let _window: Window | undefined;

export function isElement(el: any): el is Element {
  return (
    el != null &&
    typeof el == 'object' &&
    'nodeType' in el &&
    el.nodeType === Node.ELEMENT_NODE
  );
}
/*
 * Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
 * hits a memory leak, whereas aliasing it and calling "typeof _window" does not.
 * Caching the window value at the file scope lets us minimize the impact.
 */

try {
  _window = window;
} catch {
  // ! Do nothing
}

export { _window };
/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11.
 */

export const getWindow = (node?: HTMLElement | null): Window | undefined =>
  node?.ownerDocument?.defaultView ?? _window;

/**
 * Check if we can use the DOM. Useful for SSR purposes
 */
const checkIsBrowser = (): boolean => {
  const __window = getWindow();

  return Boolean(
    typeof __window !== 'undefined' &&
      __window.document &&
      __window.document.createElement,
  );
};

export const isBrowser = checkIsBrowser();

export const getOwnerDocument = (node?: Element | null): Document => {
  return isElement(node) ? node.ownerDocument ?? document : document;
};

export const getActiveElement = (node?: HTMLElement) => {
  const doc = getOwnerDocument(node);
  return doc?.activeElement as HTMLElement;
};

/**
 * Get the normalized event key across all browsers
 * @param event keyboard event
 */
export const normalizeEventKey = (
  event: Pick<React.KeyboardEvent, 'key' | 'keyCode'>,
) => {
  const { key, keyCode } = event;

  const isArrowKey =
    keyCode >= 37 && keyCode <= 40 && String(key).indexOf('Arrow') !== 0;

  const eventKey = isArrowKey ? `Arrow${key}` : key;
  return eventKey as EventKeys;
};

export const dataAttr = (condition?: boolean) =>
  (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition?: boolean) => (condition ? true : undefined);

export const cx = (...classNames: any[]) =>
  classNames.filter(Boolean).join(' ');

export function getOwnerWindow(node?: Element | null): typeof globalThis {
  return getOwnerDocument(node)?.defaultView ?? window;
}
