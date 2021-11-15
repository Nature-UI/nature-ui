import { getOwnerDocument } from './dom';
import { warn } from './logger';
import { FocusableElement, isActiveElement, isInputElement } from './tabbable';
export interface ExtendedFocusOptions extends FocusOptions {
  /**
   * Function that determines if the element is the active element.
   */
  isActive?: typeof isActiveElement;
  /**
   * If true, the element will be focused in the next tick
   */
  nextTick?: boolean;
  /**
   * If true and element is an input element, the input's text will be selected
   */
  selectTextIfInput?: boolean;
}

let supportsPreventScrollCached: boolean | null = null;
const supportsPreventScroll = () => {
  if (supportsPreventScrollCached === null) {
    supportsPreventScrollCached = false;
    try {
      const div = document.createElement('div');
      div.focus({
        get preventScroll() {
          supportsPreventScrollCached = true;
          return true;
        },
      });
    } catch (e) {
      // Ignore
    }
  }
  return supportsPreventScrollCached;
};

interface ScrollableElement {
  element: HTMLElement;
  scrollTop: number;
  scrollLeft: number;
}

const getScrollableElements = (element: HTMLElement): ScrollableElement[] => {
  const doc = getOwnerDocument(element);
  const win = doc.defaultView ?? window;
  let parent = element.parentNode;

  const scrollableElements: ScrollableElement[] = [];
  const rootScrollingElement = doc.scrollingElement || doc.documentElement;

  while (parent instanceof win.HTMLElement && parent !== rootScrollingElement) {
    if (
      parent.offsetHeight < parent.scrollHeight ||
      parent.offsetWidth < parent.scrollWidth
    ) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft,
      });
    }
    parent = parent.parentNode;
  }

  if (rootScrollingElement instanceof win.HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft,
    });
  }

  return scrollableElements;
};

const restoreScrollPosition = (scrollableElements: ScrollableElement[]) => {
  for (const { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
};

export const focus = (
  element: FocusableElement | null,
  options: ExtendedFocusOptions = {},
): number => {
  const {
    isActive = isActiveElement,
    preventScroll = true,
    selectTextIfInput = true,
    nextTick,
  } = options;

  if (!element || isActive(element)) return -1;

  const triggerFocus = () => {
    if (!element) {
      warn({
        condition: true,
        message:
          "[nature-ui]: can't call focus() on `null` or `undefined` element",
      });
      return;
    }

    if (supportsPreventScroll()) {
      element.focus({ preventScroll });
    } else {
      element.focus();
      if (preventScroll) {
        const scrollableElements = getScrollableElements(
          element as HTMLElement,
        );
        restoreScrollPosition(scrollableElements);
      }
    }

    if (isInputElement(element) && selectTextIfInput) {
      element.select();
    }
  };

  if (nextTick) {
    return requestAnimationFrame(triggerFocus);
  }

  triggerFocus();
  return -1;
};
