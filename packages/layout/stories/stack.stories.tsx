import * as React from 'react';

import { Stack, Box } from '../src';

export default {
  title: 'Stack',
};

export const Inline = () => (
  <Stack direction='row' className='flex-wrap'>
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
  </Stack>
);

export const Column = () => (
  <Stack direction='col'>
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-blue-200 p-4 border border-solid'>
      Hi
    </Box>
    <div className='bg-blue-200 p-4 border border-solid'>
      Hi, I&rsquo;m an ordinary div and a valid element
    </div>
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
    <Box size={50} className='bg-gray-200 p-4 border border-solid' />
  </Stack>
);
