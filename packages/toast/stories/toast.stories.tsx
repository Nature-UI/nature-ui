import { Button } from '@nature-ui/button';
import { nature } from '@nature-ui/system';
import { Meta } from '@storybook/react';
import React from 'react';
import { Toast, ToastProvider, useToast } from '../src';

export default {
  title: 'Toast',
  component: Toast,
  decorators: [(storyFn: any) => <ToastProvider>{storyFn()}</ToastProvider>],
} as Meta;

const ToastExample = () => {
  const toast = useToast();
  const id = 'login-error-toast';

  return (
    <>
      <Button
        onClick={() => {
          if (toast.isActive(id)) return;
          toast({
            id,
            title: 'Error Connecting...',
            description: 'You do not have permissions to perform this action.',
            status: 'info',
            duration: null,
            isClosable: true,
            onCloseComplete: () => {
              console.log('hello');
            },
          });
        }}
        variant='solid'
      >
        Show Toast
      </Button>
      <Button onClick={() => toast.closeAll()} className='ml-2'>
        Close all
      </Button>
      <Button
        className='ml-2'
        onClick={() =>
          toast.update(id, {
            title: 'Hooray 🥳🥳🥳!!!',
            description: 'You now have permissions to perform this action.',
            status: 'success',
            duration: 3000,
          })
        }
      >
        Update
      </Button>
      <Button className='ml-2' onClick={() => toast.close(id)}>
        Close One
      </Button>
    </>
  );
};

export const TExample = () => <ToastExample />;

function CR() {
  const toast = useToast();
  return (
    <>
      <Button
        onClick={() =>
          toast({
            duration: null,
            position: 'top-right',
            render: () => (
              <nature.div className='rounded-md text-white p-3 bg-blue-500'>
                Hello World
              </nature.div>
            ),
          })
        }
      >
        Show Toast
      </Button>
      <Button
        color='teal-500'
        className='ml-3'
        onClick={() =>
          toast({
            position: 'bottom-right',
            title: 'Testing',
            description: 'This toast is working well',
          })
        }
      >
        Show Toastify
      </Button>
    </>
  );
}
export const CustomRender = () => <CR />;

function ST() {
  const toast = useToast();
  return (
    <Button
      className='mt-24'
      onClick={() => {
        toast({
          position: 'bottom',
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          onCloseComplete: () => {
            console.log('close');
          },
        });
      }}
    >
      Show Success Toast
    </Button>
  );
}

export const SuccessToast = () => <ST />;

function IT() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Info.',
          description: 'This is a info.',
          status: 'info',
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Warning Toast
    </Button>
  );
}

export const InfoToast = () => <IT />;

function WT() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Warning.',
          description: 'This is a warning.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Warning Toast
    </Button>
  );
}

export const WarningToast = () => <WT />;

function ET() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: 'An error occurred.',
          description: 'Unable to create user account.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          // position: 'bottom',
        })
      }
    >
      Show Error Toast
    </Button>
  );
}

export const ErrorToast = () => <ET />;

const AS = () => {
  const toast = useToast();

  const positions = [
    'top-left',
    'top',
    'top-right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ] as const;

  return (
    <>
      <Button
        onClick={() => {
          positions.forEach((p) => {
            toast({ position: p, title: p });
          });
        }}
      >
        Trigger
      </Button>

      <Button className='ml-60' onClick={() => toast.closeAll()}>
        Close all
      </Button>
    </>
  );
};

export const Positions = () => <AS />;

const DATT = () => {
  const toast = useToast();

  const positions = [
    'top-left',
    'top',
    'top-right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ] as const;

  return (
    <>
      <Button
        onClick={() => {
          positions.forEach((position) => {
            toast({ position, title: position });
          });
        }}
        className='mt-20 mb-10'
      >
        Trigger
      </Button>

      <br />
      <Button onClick={() => toast.closeAll({ positions: ['top-left'] })}>
        close all top-left
      </Button>
    </>
  );
};

export const DeleteAllTopToasts = () => <DATT />;

const UTWD = () => {
  const toast = useToast({
    position: 'top-right',
    title: 'asdf',
  });

  return <Button onClick={() => toast()}>toast</Button>;
};
export const UseToastWithDefaults = () => <UTWD />;

const UTWCCS = () => {
  const toast = useToast({
    position: 'top',
    title: 'Container style is updated',
    containerStyle: {
      width: '800px',
      maxWidth: '100%',
      border: '20px solid red',
    },
  });

  return <Button onClick={() => toast()}>toast</Button>;
};
export const UseToastWithCustomContainerStyle = () => <UTWCCS />;
