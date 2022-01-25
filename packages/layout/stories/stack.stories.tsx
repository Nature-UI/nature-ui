import { Button } from '@nature-ui/button';
import * as React from 'react';
import { Box, Stack } from '../src';

export default {
  title: 'Stack',
};

export const Inline = () => (
  <Stack row>
    <Stack col>
      <Box size='100px' className='bg-gray-200 p-4 border border-solid' />
      <Box size='100px' className='bg-gray-200 p-4 border border-solid' />
      <Box size='100px' className='bg-gray-200 p-4 border border-solid' />
    </Stack>
    <Stack col>
      <Box size='100px' className='bg-gray-200 p-4 border border-solid' />
      <Box size='100px' className='bg-gray-200 p-4 border border-solid' />
      <Box size='100px' className='bg-gray-200 p-4 border border-solid' />
    </Stack>
  </Stack>
);

export const Column = () => (
  <Stack col>
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
  <Stack row spacing='1.5rem'>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
  </Stack>
);
