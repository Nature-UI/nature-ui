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

export const Outlined = () => {
  return (
    <Button text='teal-500' variant='outline'>
      Button
    </Button>
  );
};

export const Ghost = () => {
  return (
    <Button text='teal-500' variant='ghost'>
      Button
    </Button>
  );
};

export const Link = () => {
  return (
    <Button text='teal-500' variant='link'>
      A Link
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
