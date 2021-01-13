import * as React from 'react';
import { isString, UnionStringArray, __DEV__ } from '@nature-ui/utils';

import { ForwardRefComponent } from './system-types';
import { pseudoSelectors } from './pseudo';

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

export const pseudoProps = (props: any) => {
  let result = {};

  Object.keys(props).forEach((prop) => {
    if (prop in pseudoSelectors) {
      const style = { [prop]: props[prop] };

      result = {
        ...result,
        ...style,
      };
    }
  });

  return result;
};

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

export const forwardRef = <P>(
  comp: (props: P, ref: React.Ref<any>) => React.ReactElement | null,
) => {
  return (React.forwardRef(comp as any) as unknown) as ForwardRefComponent<P>;
};
