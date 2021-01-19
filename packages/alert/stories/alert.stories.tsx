import * as React from 'react';

import { Stack } from '@nature-ui/layout';

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
  return (
    <Alert status='warning' alertTitle='Warning alert'>
      This is warning
    </Alert>
  );
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

export const WithVariants = () => {
  return (
    <>
      <Stack spacing='10px'>
        {['top-accent', 'left-accent', 'solid', 'subtle'].map((variant) => (
          <Alert
            key={variant}
            status='error'
            alertTitle='Error alert'
            variant={variant}
          >
            {variant}!
          </Alert>
        ))}
      </Stack>
    </>
  );
};

export const Composition = () => (
  <AlertWrapper
    status='success'
    variant='subtle'
    className='flex-col items-center justify-center text-center h-48'
  >
    <AlertIcon boxSize='40px' className='mr-0' />
    <AlertTitle className='mt-4 mb-1 text-lg'>
      Application submitted!
    </AlertTitle>
    <AlertDescription className='max-w-sm'>
      Thanks for submitting your application. Our team will get back to you
      soon.
    </AlertDescription>
  </AlertWrapper>
);
