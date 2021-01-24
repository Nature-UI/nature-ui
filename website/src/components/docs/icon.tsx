import React from 'react';
import { Icon, IconProps } from '@nature-ui/core';

/** This component is used in the `icon.mdx` page. */
export const CircleIcon = (props: IconProps) => (
  <Icon viewBox='0 0 200 200' {...props}>
    <path
      fill='currentColor'
      d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
    />
  </Icon>
);
