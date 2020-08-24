import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Stack, Box, Divider } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Divider',
};

export const WithStack = () => <Divider />;
