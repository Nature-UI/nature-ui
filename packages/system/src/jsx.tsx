import * as React from 'react';
import { Dict } from '@nature-ui/utils';

export const jsx = (
  type: React.ElementType = 'div',
  props: Dict,
  ...children: React.ReactNode[]
) => React.createElement(type, props, ...children);
