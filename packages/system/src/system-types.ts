import * as React from 'react';
import { Dict, Omit, As } from '@nature-ui/utils';

export interface NatureProps {
  children?: React.ReactNode;
}

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

export type WithAs<P, T extends As> = P &
  Omit<PropsOf<T>, 'as' | keyof P> & {
    as?: T;
  };

/**
 * Integrating with `framer-motion` makes transition prop throw
 * an error, since `transition` is part of Nature's props.
 *
 * To support `framer-motion`, we'll omit transition prop from Nature props
 * if you do this `nature(motion.div)`
 */
export type WithNature<Props> = Props extends { transition?: any }
  ? Props & Omit<NatureProps, 'transition'>
  : Props & NatureProps;

/**
 * Regular component means:
 *
 * - Read the props of the component using the `PropsOf` utility
 * - Add Nature props to it using `withNature`
 * - Add the `as` prop. in this case, it doesn't do anything special.
 * - Return a JSX Element
 */

type RegularComponent<T extends As, P> = (
  props: WithNature<Omit<PropsOf<T>, 'size' | 'as' | keyof P>> &
    P & { as?: As },
) => JSX.Element;

/**
 * Extensible component means:
 *
 * - Read the props of the component using the `PropsOf` utility
 * - Use a typescript generic `TT` to store the component passed in the `as` prop
 * - Use the `WithAs` to merge the base component prop with `as` component prop
 * - Add Nature props to the resulting types.
 */
type ExtensibleComponent<T extends As, P> = <TT extends As = T>(
  props: WithNature<WithAs<PropsOf<T>, TT>> & P,
) => JSX.Element;

type Comp<T extends As, P> = RegularComponent<T, P> | ExtensibleComponent<T, P>;

export type NatureComponent<T extends As, P extends Dict = {}> = Comp<T, P> & {
  displayName?: string;
  propTypes?: React.WeakValidationMap<Omit<PropsOf<T>, 'size'> & P>;
  defaultProps?: Partial<Omit<PropsOf<T>, 'size'> & P & NatureProps>;
};

type Merge<T extends As, P> = P & Omit<PropsOf<T>, keyof P>;

type Exotic<P> =
  | (<T>(props: { as?: T } & (T extends As ? Merge<T, P> : P)) => JSX.Element)
  | ((props: P & { as?: As }) => JSX.Element);

export type ForwardRefComponent<P> = Exotic<P> & {
  displayName?: string;
  propTypes?: React.WeakValidationMap<P>;
  defaultProps?: Partial<P>;
};
