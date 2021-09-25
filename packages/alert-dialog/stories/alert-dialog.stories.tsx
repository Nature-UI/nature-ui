import { Button } from '@nature-ui/button';
import { useDisclosure } from '@nature-ui/hooks';
import { PortalManager } from '@nature-ui/portal';
import { Fade, SlideFade } from '@nature-ui/transition';
import * as React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
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
              <Button className='ml-3text-white' color='red-600'>
                Yes, delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export function TransitionExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <Button onClick={onOpen}>Discard</Button>
      <Fade timeout={300} in={isOpen}>
        {(styles) => (
          <AlertDialog
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen
            isCentered
          >
            <AlertDialogOverlay style={styles}>
              <SlideFade timeout={150} in={isOpen} unmountOnExit={false}>
                {(_styles) => (
                  <AlertDialogContent style={_styles}>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                      Are you sure you want to discard all of your notes? 44
                      words will be deleted.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        No
                      </Button>
                      <Button color='red-500' className='ml-3'>
                        Yes
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
              </SlideFade>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </Fade>
    </>
  );
}
