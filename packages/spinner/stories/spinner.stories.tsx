import React from 'react';
import { Spinner } from '../src';

export default {
  title: 'Spinner',
};

export const Default = () => <Spinner />;

export const WithColor = () => <Spinner className='text-orange-500' />;

export const WithSizes = () => (
  <div className=''>
    <Spinner />
    <Spinner className='text-blue-500' size='2rem' />
    <Spinner size='3rem' className='text-orange-500' />
    <Spinner size='4rem' className='text-purple-500' />
  </div>
);
