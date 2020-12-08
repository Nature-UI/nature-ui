import * as React from 'react';

import { Box } from '../src';

export default {
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

export const Multiple = () => (
  <span>
    <Box className='bg-blue-300 inline-block m-4' size={'xs'}>
      Hello world
    </Box>
    <Box className='bg-blue-300 inline-block m-4' size={'xs'}>
      Hello world
    </Box>
    <Box className='bg-blue-300 inline-block m-4' size={'xs'}>
      Hello world
    </Box>
  </span>
);
