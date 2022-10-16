import { PhoneIcon, SearchIcon } from '@nature-ui/icons';
import { Stack } from '@nature-ui/layout';
import { Meta, Story } from '@storybook/react';

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
      color='orange-500'
      aria-label='Search database'
      icon={<HiHeart />}
      {...args}
    />

    <IconButton color='gray-400' aria-label='Call Segun' size='lg' {...args}>
      <PhoneIcon />
    </IconButton>
  </Stack>
);
