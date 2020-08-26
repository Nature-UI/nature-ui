import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Badge } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Badge',
};

export const Default = () => <Badge>default</Badge>;
