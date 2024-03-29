import { As, Omit } from '@nature-ui/utils';
import React from 'react';

export interface NatureProps {
  children?: React.ReactNode;
}

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

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

type Merge<T extends As, P> = P & Omit<PropsOf<T>, keyof P>;

type Exotic<P> =
  | (<T>(props: { as?: T } & (T extends As ? Merge<T, P> : P)) => JSX.Element)
  | ((props: P & { as?: As }) => JSX.Element);

export type ForwardRefComponent<P> = Exotic<P> & {
  displayName?: string;
  propTypes?: React.WeakValidationMap<P>;
  defaultProps?: Partial<P>;
};

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never,
> = Omit<Target, OmitAdditionalProps>;

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {},
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentPros extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As,
> = RightJoinProps<ComponentPros, AdditionalProps> &
  RightJoinProps<AsProps, AdditionalProps> & {
    as?: AsComponent;
  };

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >,
  ): JSX.Element;

  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};

export interface NatureComponent<T extends As, P = {}>
  extends ComponentWithAs<
    T,
    {
      displayName?: string;
      propTypes?: React.WeakValidationMap<Omit<PropsOf<T>, 'size'> & P>;
      defaultProps?: Partial<Omit<PropsOf<T>, 'size'> & P & NatureProps>;
    } & P
  > {}
