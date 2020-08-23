import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Box } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Box',
};

export const Default = () => (
  <Box className='bg-blue-300' size='lg'>
    Hello world
  </Box>
);
