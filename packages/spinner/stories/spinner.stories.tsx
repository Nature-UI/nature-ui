import * as React from 'react';

import { Spinner } from '../src';

export default {
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
