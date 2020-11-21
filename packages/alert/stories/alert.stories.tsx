import * as React from 'react';

import Alert, {
  AlertWrapper,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from '../src';

export default {
  title: 'Alert',
};

export const Basic = () => {
  return (
    <AlertWrapper variant='solid' status='error' className='rounded-md'>
      <AlertIcon />
      <AlertTitle>Outdated</AlertTitle>
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
    <Alert status='error'>
      This is an Error Alert{' '}
      <span aria-label='emoji' role='img'>
        😖
      </span>
    </Alert>
  );
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
