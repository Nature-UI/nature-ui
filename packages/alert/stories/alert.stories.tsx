import * as React from 'react';

import {
  Alert,
  AlertWrapper,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from '../src';

export default {
  title: 'Alert',
  component: Alert,
  decorators: [
    (story: Function) => <div className='max-w-2xl mx-auto'>{story()}</div>,
  ],
};

export const Basic = () => {
  return (
    <AlertWrapper variant='solid' status='error' className='rounded-md'>
      <AlertIcon />
      <AlertTitle className='mr-3'>Outdated</AlertTitle>
      <AlertDescription>Your experience may be degraded!</AlertDescription>
    </AlertWrapper>
  );
};

export const Success = () => {
  return (
    <Alert className='' status='success'>
      This is a success alert — check it out!
    </Alert>
  );
};

export const Error = () => {
  return (
    <Alert status='error' alertTitle='Error alert'>
      This is an Error Alert
      <span aria-label='emoji' role='img'>
        😖
      </span>
    </Alert>
  );
};

export const Info = () => {
  return <Alert status='info' alertTitle='Info alert' />;
};

export const Warning = () => {
  return <Alert status='warning' alertTitle='Warning alert' />;
};

export const Solid = () => {
  return (
    <Alert
      status='success'
      alertTitle={<div>Success alert</div>}
      variant='solid'
    >
      This is a solid variant!
    </Alert>
  );
};
