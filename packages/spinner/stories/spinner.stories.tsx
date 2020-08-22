import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Spinner } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Spinner',
};

export const Default = () => (
  <div className='overflow-hidden'>
    <Spinner />
    <Spinner size='sm' />
    <Spinner size='md' />
    <Spinner size='lg' />
  </div>
);
