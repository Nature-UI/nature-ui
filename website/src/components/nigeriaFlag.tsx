import React from 'react';
import { nature } from '@nature-ui/core';

const Svg = nature('svg');
export const NigeriaFlag = (props) => (
  <Svg
    className='inline-block mx-3 h-5 w-auto align-middle'
    viewBox='0 0 48 48'
    {...props}
  >
    <g>
      <rect x='16' y='6' fill='#E6E6E6' width='16' height='36' />{' '}
      <path
        fill='#078754'
        d='M48,40c0,1.105-0.895,2-2,2H32V6h14c1.105,0,2,0.895,2,2V40z'
      />
      <path
        fill='#078754'
        d='M16,42H2c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h14V42z'
      />
    </g>
  </Svg>
);
