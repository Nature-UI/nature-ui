import { Button } from '@nature-ui/button';
import { useDisclosure } from '@nature-ui/hooks';
import { PortalManager } from '@nature-ui/portal';
import * as React from 'react';
import { AlertDialog } from '../src';

export default {
  title: 'AlertDialog',
  component: AlertDialog,
  decorators: [
    (StoryFn: Function) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
};

export const BasicUsage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={onOpen}>Delete something</Button>

      <AlertDialog
        variant='blur'
        isOpen={isOpen}
        onClose={onClose}
        title='Please confirm'
        isCentered
        footer={
          <>
            <Button onClick={onClose} className='mr-3'>
              Nevermind
            </Button>
            <Button color='red-500'>Yes, delete</Button>
          </>
        }
      >
        Are you sure you want to delete something? This action is permanent, and
        we're totally not just flipping a field called "deleted" to "true" in
        our database, we're actually deleting something.
      </AlertDialog>
    </>
  );
};

export function TransitionExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Discard</Button>

      <AlertDialog
        variant='blur'
        isOpen={isOpen}
        onClose={onClose}
        title='Discard Changes'
        isCentered
        footer={
          <>
            <Button onClick={onClose} className='mr-3'>
              Cancel
            </Button>
            <Button color='red-500'>Save</Button>
          </>
        }
      >
        Are you sure you want to discard all of your notes? 44 words will be
        deleted.
      </AlertDialog>
    </>
  );
}
