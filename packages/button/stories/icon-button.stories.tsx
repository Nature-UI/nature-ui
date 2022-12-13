import { PhoneIcon, SearchIcon } from '@nature-ui/icons';
import { Stack } from '@nature-ui/layout';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { HiHeart } from 'react-icons/hi';
import { IconButton, IconButtonProps } from '../src';

export default {
  title: 'Button/IconButton',
  component: IconButton,
} as Meta;

export const iconButton: Story<IconButtonProps> = (args) => (
  <Stack row>
    <IconButton aria-label='Search database' icon={<SearchIcon />} {...args} />

    <IconButton
      className='bg-orange-600 text-white'
      aria-label='Search database'
      icon={<HiHeart />}
      {...args}
    />

    <IconButton
      className='bg-gray-200 text-gray-700'
      aria-label='Call Segun'
      size='lg'
      {...args}
    >
      <PhoneIcon />
    </IconButton>
  </Stack>
);
