import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Button from '../src';

export default {
  decorators: [withKnobs],
  title: 'Button',
};

export const Default = () => {
  return <Button>Button</Button>;
};

export const Green = () => {
  return (
    <Button color='green-500' variant='solid'>
      Button
    </Button>
  );
};

export const Orange = () => {
  return (
    <Button color='orange-500' variant='solid'>
      Button
    </Button>
  );
};

export const Red = () => {
  return (
    <Button color='red-500' variant='solid'>
      Button
    </Button>
  );
};

export const Outlined = () => {
  return (
    <Button text='blue-500' variant='outline'>
      Button
    </Button>
  );
};
