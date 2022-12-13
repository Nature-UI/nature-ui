import { Button, ButtonProps } from '@nature-ui/button';
import { useDisclosure } from '@nature-ui/hooks';
import React from 'react';

import { AlertDialog } from '../src';

export default {
  title: 'AlertDialog',
  component: AlertDialog,
};

const StyledButton = (args: ButtonProps) => (
  <Button
    {...args}
    className={`bg-blue-500 hover:bg-blue-700 text-white ${args.className}`}
  />
);

export const BasicUsage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <StyledButton onClick={onOpen}>Delete something</StyledButton>

      <AlertDialog
        variant='blur'
        isOpen={isOpen}
        onClose={onClose}
        title='Please confirm'
        isCentered
        footer={
          <>
            <StyledButton
              onClick={onClose}
              className='mr-3 bg-gray-200 text-gray-700 hover:bg-gray-300'
            >
              Nevermind
            </StyledButton>
            <StyledButton className='hover:bg-red-600 bg-red-500'>
              Yes, delete
            </StyledButton>
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
      <StyledButton onClick={onOpen}>Discard</StyledButton>

      <AlertDialog
        variant='blur'
        isOpen={isOpen}
        onClose={onClose}
        title='Discard Changes'
        isCentered
        footer={
          <>
            <StyledButton
              onClick={onClose}
              className='mr-3 bg-gray-200 text-gray-700 hover:bg-gray-300'
            >
              Cancel
            </StyledButton>
            <StyledButton className='hover:bg-red-600 bg-red-500'>
              Save
            </StyledButton>
          </>
        }
      >
        Are you sure you want to discard all of your notes? 44 words will be
        deleted.
      </AlertDialog>
    </>
  );
}
