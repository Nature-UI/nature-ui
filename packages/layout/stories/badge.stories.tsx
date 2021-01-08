import * as React from 'react';

import { Badge, Stack } from '../src';

export default {
  title: 'Badge',
};

export const Default = () => <Badge>default</Badge>;

export const WithColor = () => {
  return (
    <Stack spacing={4} direction='row'>
      <Badge variant='solid' color='blue-500'>
        default
      </Badge>
      <Badge variant='subtle' color='blue-200'>
        default
      </Badge>
      <Badge variant='outline' color='blue-400'>
        default
      </Badge>
    </Stack>
  );
};
