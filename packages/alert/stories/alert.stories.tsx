import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Alert from '../src';

export default {
  decorators: [withKnobs],
  title: 'Alert',
};

export const Success = () => {
  return (
    <Alert className='' status='success'>
      This is a success alert — check it out!
    </Alert>
  );
};

export const Error = () => {
  return <Alert status='error'>This is an Error Alert 😖</Alert>;
};

export const Info = () => {
  return <Alert status='info' />;
};

export const Warning = () => {
  return <Alert status='warning' />;
};

export const Solid = () => {
  return (
    <Alert status='success' variant='solid'>
      This is a solid variant!
    </Alert>
  );
};

export const NoIcon = () => {
  return <Alert>This is an alert without an Icon!</Alert>;
};
