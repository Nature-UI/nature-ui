import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Box } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Box',
};

export const XL = () => (
  <Box className='bg-blue-300' size='xl'>
    Hello world
  </Box>
);

export const LG = () => (
  <Box className='bg-blue-300' size='lg'>
    Hello world
  </Box>
);
export const MD = () => (
  <Box className='bg-blue-300' size='md'>
    Hello world
  </Box>
);

export const SM = () => (
  <Box className='bg-blue-300' size='sm'>
    Hello world
  </Box>
);

export const XS = () => (
  <Box className='bg-blue-300' size='xs'>
    Hello world
  </Box>
);
