import { getOwnerDocument, _window } from './dom';

export const hasDisplayNone = (element: Element): boolean =>
  _window?.getComputedStyle(element).display === 'none';

export const hasTabIndex = (element: Element): boolean =>
  element.hasAttribute('tabindex');

export const hasNegativeTabIndex = (element: HTMLElement): boolean =>
  hasTabIndex(element) && element.tabIndex === -1;

export const isDisabled = (element: HTMLElement): boolean => {
  return (
    Boolean(element.getAttribute('disabled')) === true ||
    Boolean(element.getAttribute('aria-disabled')) === true
  );
};

export interface FocusableElement {
  focus(options?: FocusOptions): void;
}

export const hasFocusWithin = (element: Element): boolean => {
  if (!document.activeElement) return false;

  return element.contains(document.activeElement);
};

export const isHTMLElement = (
  element: FocusableElement,
): element is HTMLElement => {
  return element instanceof HTMLElement;
};

export const isHidden = (element: HTMLElement): boolean => {
  if (element.parentElement && isHidden(element.parentElement)) return true;

  return element.hidden;
};

export const isContentEditable = (
  element: HTMLElement,
): boolean | '' | null => {
  const value = element.getAttribute('contenteditable');

  return value && value !== undefined;
};

export const isFocusable = (element: FocusableElement): boolean => {
  if (!isHTMLElement(element) || isHidden(element) || isDisabled(element)) {
    return false;
  }

  const { localName } = element;
  const focusableTags = ['input', 'select', 'textarea', 'button'];

  if (focusableTags.includes(localName)) return true;

  const others = {
    a: () => element.hasAttribute('href'),
    audio: () => element.hasAttribute('controls'),
    video: () => element.hasAttribute('controls'),
  };

  if (localName in others) {
    return others[localName as keyof typeof others]();
  }

  if (isContentEditable(element)) return true;

  return hasTabIndex(element);
};

export const isTabbable = (element: FocusableElement): boolean => {
  return (
    isHTMLElement(element) &&
    isFocusable(element) &&
    !hasNegativeTabIndex(element)
  );
};

export const isActiveElement = (element: FocusableElement): boolean => {
  const doc = isHTMLElement(element) ? getOwnerDocument(element) : document;
  return doc.activeElement === (element as HTMLElement);
};

export const isInputElement = (
  element: FocusableElement,
): element is HTMLInputElement => {
  return (
    isHTMLElement(element) &&
    element.tagName.toLowerCase() === 'input' &&
    'select' in element
  );
};
