import { PropsOf, nature } from '@nature-ui/system';
import * as React from 'react';
import { PortalManager } from '@nature-ui/portal';
import { __DEV__ } from '@nature-ui/utils';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '../src';

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

const ButtonTag = nature('button');

const Button = React.forwardRef(
  (props: PropsOf<typeof ButtonTag>, ref: React.Ref<HTMLButtonElement>) => {
    const { className, ...rest } = props;

    return (
      <ButtonTag
        {...rest}
        ref={ref}
        className={`px-4 py-2 font-semibold rounded border-none outline-none focus:shadow-outline ${className}`}
      />
    );
  },
);

if (__DEV__) {
  Button.displayName = 'Button';
}

export const BasicUsage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef<any>();

  return (
    <>
      <Button onClick={onOpen}>Delete something</Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Please Confirm!</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete something? This action is
              permanent, and we're totally not just flipping a field called
              "deleted" to "true" in our database, we're actually deleting
              something.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                className='bg-gray-200 hover:bg-gray-300'
              >
                Nevermind
              </Button>
              <Button className='ml-3 bg-red-500 text-white hover:bg-red-600'>
                Yes, delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
