import { EventKeys, Merge } from '@nature-ui/utils';
import React, { ElementType } from 'react';

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode);

export type HTMLProps<T = any> = React.HTMLAttributes<T> &
  React.RefAttributes<T>;

export type PropGetter<T extends HTMLElement = any, P = {}> = (
  props?: Merge<HTMLProps<T>, P>,
  ref?: React.Ref<any> | React.RefObject<any>,
) => Merge<HTMLProps<T>, P>;

export type PropGetterV2<T extends ElementType, P = {}> = (
  props?: React.ComponentPropsWithoutRef<T> & P,
  ref?: React.Ref<any> | React.RefObject<any>,
) => React.ComponentPropsWithRef<T>;

export type EventKeyMap = Partial<
  Record<EventKeys, React.KeyboardEventHandler>
>;
