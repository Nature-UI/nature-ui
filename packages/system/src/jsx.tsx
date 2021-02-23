import * as React from 'react';
import { Dict } from '@nature-ui/utils';
import { jsx as emotion, Interpolation, Theme } from '@emotion/react';

export const jsx = (
  type: React.ElementType = 'div',
  props: Dict,
  ...children: React.ReactNode[]
) => {
  if (props.as) {
    type = props.as;
  }
  return emotion.apply(type, [type, props, ...children]);
};

declare module 'react' {
  interface Attributes {
    css?: Interpolation<Theme>;
  }
}

export default jsx;
