import * as React from 'react';

import { Booleanish } from './types';

let _window: Window | undefined;

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
  const _window = getWindow();

  return Boolean(
    typeof _window !== 'undefined' &&
      _window.document &&
      _window.document.createElement
  );
};

export const isBrowser = checkIsBrowser();

/**
 * Get the normalized event key across all browsers
 * @param event keyboard event
 */

export const normalizeEventKey = (event: React.KeyboardEvent) => {
  const key = event.key || event.keyCode;

  const isArrowKey =
    key >= 37 && key <= 40 && String(key).indexOf('Arrow') !== 0;

  return isArrowKey ? `Arrow${key}` : key;
};

export const dataAttr = (condition?: boolean) =>
  (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition?: boolean) => (condition ? true : undefined);

export const getOwnerDocument = (node?: HTMLElement) =>
  node?.ownerDocument || document;
