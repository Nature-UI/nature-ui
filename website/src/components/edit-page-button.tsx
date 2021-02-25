import React from 'react';
import { Icon, Stack, nature } from '@nature-ui/core';
import { MdEdit } from 'react-icons/md';

export const EditPageLink: React.FC<{ href?: string }> = ({ href }) => {
  return (
    <nature.a href={href} className='hover:underline' target='_blank'>
      <Stack className='inline-flex items-center opacity-70' row spacing='1rem'>
        <Icon as={MdEdit} size='md' className='mr-1' />
        <nature.span>Edit this page</nature.span>
      </Stack>
    </nature.a>
  );
};
