import * as React from 'react';
import useToast from '../src';
import { Button } from '@nature-ui/button';
// import { chakra } from "@chakra-ui/system"

export default {
  title: 'Toast',
  decorators: [
    (Story: Function) => (
      <React.Fragment>
        <Story />
      </React.Fragment>
    ),
  ],
};

export function ToastExample() {
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
}
