import * as React from 'react';

import { Stack, Divider } from '../src';

export default {
  title: 'Divider',
};

export const Vertical = () => {
  return (
    <Stack direction='row'>
      <span>Part 1</span>
      <Divider orientation='vertical' />
      <span>Part 2</span>
    </Stack>
  );
};

export const Horizontal = () => {
  return (
    <Stack direction='col'>
      <span>Part 1</span>
      <Divider color='red-500' />
      <span>Part 2</span>
    </Stack>
  );
};

export const Default = () => <Divider />;
