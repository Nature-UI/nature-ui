import { isString, UnionStringArray, __DEV__ } from '@nature-ui/utils';
import { As } from '@nature-ui/utils/src/types';
import React from 'react';
import { ComponentWithAs, PropsOf, RightJoinProps } from './system.types';

/**
 * Carefully selected html elements for nature components.
 * This is mostly for `nature.<element>` syntax.
 */
export const domElements = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'b',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'button',
  'caption',
  'cite',
  'circle',
  'code',
  'col',
  'dd',
  'del',
  'details',
  'dfn',
  'div',
  'dl',
  'dt',
  'em',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'i',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'mark',
  'nav',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'path',
  'picture',
  'pre',
  'q',
  'rect',
  's',
  'svg',
  'section',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'tr',
  'u',
  'ul',
  'video',
] as const;

export type DOMElements = UnionStringArray<typeof domElements>;

export const isTag = (target: any) => {
  return isString(target) && __DEV__
    ? target.charAt(0) === target.charAt(0).toLowerCase()
    : true;
};

export const getComponentName = (primitive: React.ComponentType | string) => {
  return (
    (__DEV__ ? isString(primitive) && primitive : false) ||
    (!isString(primitive) && primitive.displayName) ||
    (!isString(primitive) && primitive.name) ||
    'NatureComponent'
  );
};

export const getDisplayName = (primitive: any) => {
  return isTag(primitive) ? `nature.${primitive}` : getComponentName(primitive);
};

export const forwardRef = <Props extends object, Component extends As>(
  comp: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >,
) => {
  return React.forwardRef(comp) as unknown as ComponentWithAs<Component, Props>;
};
