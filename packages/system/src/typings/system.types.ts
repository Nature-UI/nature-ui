import * as React from 'react';
import { Dict } from '@nature-ui/utils';

import { ValidHTMLProps } from '../should-forward-prop';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type As = React.ElementType<any>;

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

export interface NatureProps extends ValidHTMLProps {
  children?: React.ReactNode;
}

export type WithNature<Props> = Props extends { transition?: any }
  ? Props & Omit<NatureProps, 'transition'>
  : Props & NatureProps;

export type WithAs<P, T extends As> = P &
  Omit<PropsOf<T>, 'as' | keyof P> & {
    as?: T;
  };

type ExtensibleComponent<T extends As, P> = <TT extends As = T>(
  props: WithNature<WithAs<PropsOf<T>, TT>> & P
) => JSX.Element;

type RegularComponent<T extends As, P> = (
  props: WithNature<Omit<PropsOf<T>, 'size' | 'as' | keyof P>> & P & { as?: As }
) => JSX.Element;

type Comp<T extends As, P> = RegularComponent<T, P> | ExtensibleComponent<T, P>;

export type NatureComponent<T extends As, P extends Dict = {}> = Comp<T, P> & {
  displayName?: string;
  propTypes?: React.WeakValidationMap<Omit<PropsOf<T>, 'size'> & P>;
  defaultProps?: Partial<Omit<PropsOf<T>, 'size'> & P & NatureProps>;
};
