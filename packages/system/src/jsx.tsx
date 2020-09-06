import * as React from 'react';
import { Dict } from '@nature-ui/utils';

export const jsx = (
  type: React.ElementType = 'div',
  props: Dict,
  ...children: React.ReactNode[]
) => React.createElement(type, props, ...children);

declare module 'react' {
  interface Attributes {}
}

declare global {
  // eslint-disable-next-line
  namespace JSX {
    interface IntrinsicAttributes {}
  }
}

export default jsx;
