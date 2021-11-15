import { isFocusable, isHTMLElement, isTabbable } from './tabbable';

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

export const getFirstFocusable = <T extends HTMLElement>(container: T) => {
  const allFocusable = getAllFocusable(container);

  return allFocusable.length ? allFocusable[0] : null;
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

export const getLastTabbableIn = <T extends HTMLElement>(
  container: T,
  fallbackToFocusable?: boolean,
): T | null => {
  const allTabbable = getAllTabbable(container, fallbackToFocusable);

  return allTabbable[allTabbable.length - 1] || null;
};

export const getNextTabbable = <T extends HTMLElement>(
  container: T,
  fallbackToFocusable?: boolean,
): T | null => {
  const allFocusable = getAllFocusable(container);
  const index = allFocusable.indexOf(document.activeElement as T);
  const slice = allFocusable.slice(index + 1);

  return (
    slice.find(isTabbable) ||
    allFocusable.find(isTabbable) ||
    (fallbackToFocusable ? slice[0] : null)
  );
};

export const getPreviousTabbable = <T extends HTMLElement>(
  container: T,
  fallbackToFocusable?: boolean,
): T | null => {
  const allFocusable = getAllFocusable(container).reverse();
  const index = allFocusable.indexOf(document.activeElement as T);
  const slice = allFocusable.slice(index + 1);

  return (
    slice.find(isTabbable) ||
    allFocusable.find(isTabbable) ||
    (fallbackToFocusable ? slice[0] : null)
  );
};

export const focusNextTabbable = <T extends HTMLElement>(
  container: T,
  fallbackToFocusable?: boolean,
) => {
  const nextTabbable = getNextTabbable(container, fallbackToFocusable);

  if (nextTabbable && isHTMLElement(nextTabbable)) {
    nextTabbable.focus();
  }
};

export const focusPreviousTabbable = <T extends HTMLElement>(
  container: T,
  fallbackToFocusable?: boolean,
) => {
  const previousTabbable = getPreviousTabbable(container, fallbackToFocusable);

  if (previousTabbable && isHTMLElement(previousTabbable)) {
    previousTabbable.focus();
  }
};

const matches = (element: Element, selectors: string): boolean => {
  if ('matches' in element) return element.matches(selectors);

  if ('msMatchesSelector' in element)
    return (element as any).msMatchesSelector(selectors);

  return (element as any).webkitMatchesSelector(selectors);
};

export const closest = <T extends Element>(element: T, selectors: string) => {
  if ('closest' in element) return element.closest(selectors);

  do {
    if (matches(element, selectors)) return element;
    element = (element.parentElement || element.parentNode) as any;
  } while (element !== null && element.nodeType === 1);

  return null;
};
