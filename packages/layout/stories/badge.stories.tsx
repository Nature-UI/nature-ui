import * as React from 'react';

import { Badge, Stack } from '../src';

export default {
  title: 'Badge',
};

export const Default = () => <Badge>default</Badge>;

export const WithColor = () => {
  return (
    <Stack spacing={4} row>
      <Badge variant='solid' color='green-600'>
        default
      </Badge>
      <Badge variant='subtle' color='green-200'>
        default
      </Badge>
      <Badge variant='outline' color='green-500'>
        default
      </Badge>
    </Stack>
  );
};
