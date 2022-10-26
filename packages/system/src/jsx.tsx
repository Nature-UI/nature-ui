import { Interpolation, jsx as emotion, Theme } from '@emotion/react';
import { Dict } from '@nature-ui/utils';
import React from 'react';

export const jsx = (
  props: Dict,
  type: React.ElementType = 'div',
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
