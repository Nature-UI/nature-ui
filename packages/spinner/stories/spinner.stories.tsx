import * as React from 'react';

import { Spinner } from '../src';

export default {
  title: 'Spinner',
};

export const Default = () => <Spinner />;

export const WithColor = () => <Spinner size='lg' color='purple-500' />;

export const WithSizes = () => (
  <div className=''>
    <Spinner />
    <Spinner color='blue-500' size='sm' />
    <Spinner size='md' color='blue-500' />
    <Spinner size='lg' color='purple-500' />
  </div>
);
