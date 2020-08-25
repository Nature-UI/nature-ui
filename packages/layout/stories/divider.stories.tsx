import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Stack, Box, Divider } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Divider',
};

export const Vertical = () => {
  return (
    <Stack direction='row'>
      <span>Part 1</span>
      <Divider orientation='vertical' />
      <span>Part 1</span>
    </Stack>
  );
};

export const Horizontal = () => {
  return (
    <Stack direction='col'>
      <span>Part 1</span>
      <Divider color='red-500' />
      <span>Part 1</span>
    </Stack>
  );
};

export const Default = () => <Divider />;
