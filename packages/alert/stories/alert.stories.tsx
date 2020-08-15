import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Alert from '../src';

export default {
  decorators: [withKnobs],
  title: 'Alert'
};

export const Success: React.FC = () => {
  return (
    <Alert status='success' className=''>
      I love Nature
    </Alert>
  );
};

export const Error: React.FC = () => {
  return <Alert status='error' />;
};

export const Info: React.FC = () => {
  return <Alert status='info' />;
};

export const Warning: React.FC = () => {
  return <Alert status='warning' />;
};

export const Solid: React.FC = () => {
  return (
    <Alert status='success' variant='solid'>
      This is a solid variant!
    </Alert>
  );
};
