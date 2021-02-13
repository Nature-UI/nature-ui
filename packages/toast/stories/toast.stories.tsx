import * as React from 'react';
import { Button } from '@nature-ui/button';
import { Stack } from '@nature-ui/layout';

import { Toast, useToast } from '../src';

// import { nature } from "@nature-ui/system"

export default {
  title: 'Toast',
  decorators: [
    (Story: Function) => (
      <>
        <Story />
      </>
    ),
  ],
  component: Toast,
};

export const ToastExample = () => {
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
            status: 'error',
            duration: null,
            isCloseable: true,
            onCloseComplete: () => {
              console.log('hello');
            },
          });
        }}
        variant='solid'
      >
        Show Toast
      </Button>
      <button onClick={toast.closeAll}>Close all</button>
      <button
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
      </button>
      <button onClick={() => toast.close(id)}>Close One</button>
    </>
  );
};

export const CustomRender = () => {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          position: 'top-right',
          // eslint-disable-next-line react/display-name
          render: () => (
            <div className='p-3 m-2 bg-blue-700 text-white'>Hello World</div>
          ),
        })
      }
    >
      Show Toast
    </Button>
  );
};

export const SuccessToast = () => {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isCloseable: true,
        })
      }
    >
      Show Success Toast
    </Button>
  );
};

export const WarningToast = () => {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: 'Warning.',
          description: 'This is a warning.',
          status: 'warning',
          duration: 9000,
          isCloseable: true,
        })
      }
    >
      Show Warning Toast
    </Button>
  );
};

export const InfoToast = () => {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: 'Warning.',
          description: 'This is a warning.',
          status: 'info',
          duration: 9000,
          isCloseable: true,
        })
      }
    >
      Show Warning Toast
    </Button>
  );
};

export const ErrorToast = () => {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: 'An error occurred.',
          description: 'Unable to create user account.',
          status: 'error',
          duration: 9000,
          isCloseable: true,
        })
      }
    >
      Show Error Toast
    </Button>
  );
};

export const AllSides = () => {
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
      <button
        onClick={() => {
          positions.forEach((p) => {
            toast({
              position: p,
              title: p,
            });
          });
        }}
      >
        Trigger
      </button>
    </>
  );
};

export function Example() {
  const toast = useToast();
  const toastIdRef = React.useRef();

  function close() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  function closeAll() {
    // you may optionally pass an object of positions to exclusively close
    // keeping other positions opened
    // e.g. `{ positions: ['bottom'] }`
    toast.closeAll();
  }

  function addToast() {
    toastIdRef.current = toast({ description: 'some text' });
  }

  return (
    <Stack col spacing='1rem'>
      <Button onClick={addToast} type='button'>
        Toast
      </Button>

      <Button onClick={close} type='button' variant='outline'>
        Close last toast
      </Button>

      <Button onClick={closeAll} type='button' variant='outline'>
        Close all toasts
      </Button>
    </Stack>
  );
}
