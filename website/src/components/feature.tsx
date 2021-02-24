import { Box, Icon } from '@nature-ui/core';
import React from 'react';

export const Feature = ({ title, icon, children, ...props }) => {
  return (
    <Box className='shadow p-10 md:p-12 rounded-xl bg-white' {...props}>
      <Box
        className='rounded-full p-2 overflow-hidden bg-primary-500 w-12 h-12'
        centerContent
      >
        <Icon size={25} color='white' as={icon} />
      </Box>
      <h3 className='mt-4 mb-2 font-semibold text-2xl text-gray-1000'>
        {title}
      </h3>
      <p className='opacity-70 text-lg text-gray-75'>{children}</p>
    </Box>
  );
};
