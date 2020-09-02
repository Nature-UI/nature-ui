import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Stack } from '@nature-ui/layout';

import { Avatar } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Avatar',
};

export const Basic = () => (
  <Stack direction='row'>
    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
    <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
    <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
  </Stack>
);
