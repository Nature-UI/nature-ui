import * as React from 'react';

import { isFunction } from './assertions';

export interface CreateContextOptions {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean;
  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string;
  /**
   * The display name of the context
   */
  name?: string;
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */

export const createContext = <ContextType>(
  options: CreateContextOptions = {},
): CreateContextReturn<ContextType> => {
  const {
    strict = true,
    errorMessage = 'useContext must be inside a Provider with a value',
    name,
  } = options;

  const Context = React.createContext<ContextType | undefined>(undefined);

  Context.displayName = name;

  const useContext = (): ContextType | undefined => {
    const context = React.useContext(Context);

    if (!context && strict) throw new Error(errorMessage);

    return context;
  };

  return [Context.Provider, useContext, Context] as CreateContextReturn<
    ContextType
  >;
};

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */

export const getValidChildren = (children: React.ReactNode) =>
  React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[];

type ReactRef<T> =
  | React.Ref<T>
  | React.RefObject<T>
  | React.MutableRefObject<T>;

const assignRef = <T = any>(ref: ReactRef<T> | undefined, value: T) => {
  if (ref === null || ref === undefined || !ref) return;

  if (isFunction(ref)) {
    ref(value);

    return;
  }

  try {
    // @ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
};
/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */

export const mergeRefs = <T>(...refs: (ReactRef<T> | undefined)[]) => (
  value: T,
) => {
  refs.forEach((ref) => assignRef(ref, value));
};
