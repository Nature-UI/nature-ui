import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Spinner } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Spinner',
};

export const Add = () => <Spinner color='blue' size='md' />;
