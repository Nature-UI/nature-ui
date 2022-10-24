import React from 'react';
import { Spinner } from '../src';

export default {
  title: 'Spinner',
};

export const Default = () => <Spinner />;

export const WithColor = () => <Spinner color='purple-500' />;

export const WithSizes = () => (
  <div className=''>
    <Spinner />
    <Spinner color='blue-500' size='2rem' />
    <Spinner size='3rem' color='blue-500' />
    <Spinner size='4rem' color='purple-500' />
  </div>
);
