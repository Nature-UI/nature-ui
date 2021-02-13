import React from 'react';
import { Icon, Stack } from '@nature-ui/core';
import { MdEdit } from 'react-icons/md';
import { El } from './nature-jsx-elements';

export const EditPageLink: React.FC<{ href?: string }> = ({ href }) => {
  return (
    <El.a href={href} className='hover:underline' target='_blank'>
      <Stack className='inline-flex items-center opacity-70' row spacing='1rem'>
        <Icon as={MdEdit} size='md' className='mr-1' />
        <El.span>Edit this page</El.span>
      </Stack>
    </El.a>
  );
};
