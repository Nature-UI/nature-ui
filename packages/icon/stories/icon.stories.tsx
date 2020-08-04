import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Icon } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Alert',
};

export const secondary: React.FC = () => {
  return <Icon>Hello world</Icon>;
};
