import * as React from 'react';
import { Dict } from '@nature-ui/utils';
import { jsx as emotion } from '@emotion/core';
/*
 * export const jsx = (
 *   type: React.ElementType = 'div',
 *   props: Dict,
 *   ...children: React.ReactNode[]
 * ) => React.createElement(type, props, ...children);
 */

export const jsx = (
  type: React.ElementType = 'div',
  props: Dict,
  ...children: React.ReactNode[]
) => {
  const { as, ...rest } = props;
  if (as) {
    type = as;
  }
  return emotion.apply(undefined, [type, rest, ...children]);
};

export default jsx;
