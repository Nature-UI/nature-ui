import { EventKeys } from '@nature-ui/utils';
import React, { ElementType } from 'react';

export interface IdProps {
  id?: string;
}

export interface InputDOMEvents {
  onCopy?: React.ClipboardEventHandler<HTMLInputElement>;
  onCut?: React.ClipboardEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  onCompositionStart?: React.CompositionEventHandler<HTMLInputElement>;
  onCompositionEnd?: React.CompositionEventHandler<HTMLInputElement>;
  onCompositionUpdate?: React.CompositionEventHandler<HTMLInputElement>;
  onSelect?: React.ReactEventHandler<HTMLInputElement>;
  onBeforeInput?: React.FormEventHandler<HTMLInputElement>;
  onInput?: React.FormEventHandler<HTMLInputElement>;
}

export interface InputDOMProps extends IdProps, InputDOMEvents {
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  pattern?: string;
  placeholder?: string;
  type?:
    | 'text'
    | 'search'
    | 'url'
    | 'tel'
    | 'email'
    | 'password'
    | 'hidden'
    | (string & {});
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
}

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode);

type WithoutStyleAttr<T> = Omit<T, 'color' | 'width' | 'height'>;

export type HTMLProps<T = any> = WithoutStyleAttr<React.HTMLAttributes<T>> &
  React.RefAttributes<T>;

export interface DOMElement extends Element, HTMLOrSVGElement {}

type DataAttributes = {
  [dataAttr: string]: any;
};

export type DOMAttributes<T = DOMElement> = React.AriaAttributes &
  React.DOMAttributes<T> &
  DataAttributes & {
    id?: string;
    role?: React.AriaRole;
    tabIndex?: number;
    style?: React.CSSProperties;
  };

export type InputDOMAttributes = InputDOMProps &
  DOMAttributes<HTMLInputElement>;

type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

export type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (
  props?: Merge<DOMAttributes, P>,
  ref?: React.Ref<any> | React.RefObject<any>,
) => R & React.RefAttributes<any>;

export type PropGetterV2<T extends ElementType, P = {}> = (
  props?: React.ComponentPropsWithoutRef<T> & P,
  ref?: React.Ref<any> | React.RefObject<any>,
) => React.ComponentPropsWithRef<T>;

export type EventKeyMap = Partial<
  Record<EventKeys, React.KeyboardEventHandler>
>;
