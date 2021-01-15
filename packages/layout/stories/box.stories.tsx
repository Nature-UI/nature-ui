import * as React from 'react';

import { Box } from '../src';

export default {
  title: 'Box',
};

export const Size5rem = () => (
  <Box className='bg-blue-300' centered size='6rem'>
    Hello world!!
  </Box>
);
