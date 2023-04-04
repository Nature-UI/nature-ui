import { isFunction } from '@nature-ui/utils';
import { useEffect } from 'react';
import { useCallbackRef } from './use-callback-ref';

type DocumentOrElement = Document | HTMLElement | null;
export type EventListenerEnv = (() => DocumentOrElement) | DocumentOrElement;

type Target = EventTarget | null | (() => EventTarget | null);
type Options = boolean | AddEventListenerOptions;

export function useEventListener<K extends keyof DocumentEventMap>(
  target: Target,
  event: K,
  handler?: (event: DocumentEventMap[K]) => void,
  options?: Options,
): VoidFunction;
export function useEventListener<K extends keyof WindowEventMap>(
  target: Target,
  event: K,
  handler?: (event: WindowEventMap[K]) => void,
  options?: Options,
): VoidFunction;
export function useEventListener<K extends keyof GlobalEventHandlersEventMap>(
  target: Target,
  event: K,
  handler?: (event: GlobalEventHandlersEventMap[K]) => void,
  options?: Options,
): VoidFunction;

export function useEventListener(
  target: Target,
  event: string,
  handler: ((event: Event) => void) | undefined,
  options?: Options,
) {
  const listener = useCallbackRef(handler);

  useEffect(() => {
    // @ts-ignore
    const node = isFunction(target) ? target() : target ?? document;

    if (!handler || !node) return;

    node.addEventListener(event, listener, options);
    return () => {
      node.removeEventListener(event, listener, options);
    };
  }, [event, target, options, listener, handler]);

  return () => {
    // @ts-ignore
    const node = isFunction(target) ? target() : target ?? document;
    node?.removeEventListener(event, listener, options);
  };
}
