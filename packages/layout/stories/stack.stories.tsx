import * as React from 'react';

import { Button } from '@nature-ui/button';
import { Stack, Box } from '../src';

export default {
  title: 'Stack',
};

export const Inline = () => (
  <Stack direction='row' spacing='1rem' className='flex-wrap'>
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
  </Stack>
);

export const Column = () => (
  <Stack direction='col'>
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-blue-200 p-4 border border-solid'>
      Hi
    </Box>
    <div className='bg-blue-200 p-4 border border-solid'>
      Hi, I&rsquo;m an ordinary div and a valid element
    </div>
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
  </Stack>
);

export const WithButtons = () => (
  <Stack direction='row' spacing='1rem'>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
  </Stack>
);
