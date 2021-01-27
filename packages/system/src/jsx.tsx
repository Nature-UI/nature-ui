import * as React from 'react';
import { Dict } from '@nature-ui/utils';
import { jsx as emotion } from '@emotion/react';

export const jsx = (
  type: React.ElementType = 'div',
  props: Dict,
  ...children: React.ReactNode[]
) => {
  return emotion.apply(type, [type, props, ...children]);
};

export default jsx;
