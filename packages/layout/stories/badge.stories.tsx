import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Badge, Stack } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Badge',
};

export const Default = () => <Badge>default</Badge>;

export const WithColor = () => {
  return (
    <Stack spacing={4} direction='row'>
      <Badge variant='solid' color='teal-500'>
        default
      </Badge>
      <Badge variant='subtle' color='teal-200'>
        default
      </Badge>
      <Badge variant='outline' color='teal-400'>
        default
      </Badge>
    </Stack>
  );
};
