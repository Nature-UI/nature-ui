import { isFocusable, isTabbable } from './tabbable';

const SELECTORS = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'area[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable=false])',
];

const selector = SELECTORS.join();

export const getAllFocusable = <T extends HTMLElement>(container: T) => {
  const allFocusable = Array.from(container.querySelectorAll<T>(selector));

  allFocusable.unshift(container);

  return allFocusable
    .filter(isFocusable)
    .filter((el) => window.getComputedStyle(el).display !== 'none');
};

export const getAllTabbable = <T extends HTMLElement>(
  container: T,
  fallbackToFocusable?: boolean,
) => {
  const allFocusable = Array.from(container.querySelectorAll<T>(selector));
  const allTabbable = allFocusable.filter(isTabbable);

  if (isTabbable(container)) {
    allTabbable.unshift(container);
  }

  if (!allTabbable.length && fallbackToFocusable) {
    return allFocusable;
  }

  return allTabbable;
};

export const getFirstTabbableIn = <T extends HTMLElement>(
  container: T,
  fallbackToFocusable?: boolean,
): T | null => {
  const [first] = getAllTabbable(container, fallbackToFocusable);

  return first || null;
};
