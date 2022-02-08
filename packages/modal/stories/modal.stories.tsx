import { Button } from '@nature-ui/button';
import { useDisclosure } from '@nature-ui/hooks';
import { PortalManager } from '@nature-ui/portal';
import * as React from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '../src';

export default {
  title: 'Modal',
  component: Modal,
  decorators: [
    (StoryFn: Function) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
};

export const BasicUsage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open</Button>

      <Modal
        variant='blur'
        scrollBehavior='outside'
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />

            <ModalHeader>Welcome Home</ModalHeader>

            <ModalBody>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis. Sit nulla est ex deserunt exercitation
              anim occaecat. Nostrud ullamco deserunt aute id consequat veniam
              incididunt duis in sint irure nisi. Mollit officia cillum Lorem
              ullamco minim nostrud elit officia tempor esse quis. Sit nulla est
              ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
              aute id consequat veniam incididunt duis in sint irure nisi.
              Mollit officia cillum Lorem ullamco minim nostrud elit officia
              tempor esse quis. Sit nulla est ex deserunt exercitation anim
              occaecat. Nostrud ullamco deserunt aute id consequat veniam
              incididunt duis in sint irure nisi. Mollit officia cillum Lorem
              ullamco minim nostrud elit officia tempor esse quis. Sit nulla est
              ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
              aute id consequat veniam incididunt duis in sint irure nisi.
              Mollit officia cillum Lorem ullamco minim nostrud elit officia
              tempor esse quis. Mollit officia cillum Lorem ullamco minim
              nostrud elit officia tempor esse quis. Sit nulla est ex deserunt
              exercitation anim occaecat. Nostrud ullamco deserunt aute id
              consequat veniam incididunt duis in sint irure nisi. Mollit
              officia cillum Lorem ullamco minim nostrud elit officia tempor
              esse quis. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis. Sit nulla est ex deserunt exercitation
              anim occaecat. Nostrud ullamco deserunt aute id consequat veniam
              incididunt duis in sint irure nisi. Mollit officia cillum Lorem
              ullamco minim nostrud elit officia tempor esse quis.
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} className='mr-3'>
                Cancel
              </Button>
              <Button color='red-500'>Save</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export const WithSize = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open</Button>

      <Modal
        variant='blur'
        scrollBehavior='outside'
        isOpen={isOpen}
        size='600px'
        onClose={onClose}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />

            <ModalHeader>Welcome Home</ModalHeader>

            <ModalBody>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis. Sit nulla est ex deserunt exercitation
              anim occaecat. Nostrud ullamco deserunt aute id consequat veniam
              incididunt duis in sint irure nisi. Mollit officia cillum Lorem
              ullamco minim nostrud elit officia tempor esse quis. Sit nulla est
              ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
              aute id consequat veniam incididunt duis in sint irure nisi.
              Mollit officia cillum Lorem ullamco minim nostrud elit officia
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} className='mr-3'>
                Cancel
              </Button>
              <Button color='red-500'>Save</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export const ReturnFocus = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef<any>();

  return (
    <>
      <div ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
        Some other content that&apos;ll receive focus on close.
      </div>

      <Button mt={4} onClick={onOpen}>
        Open Modal
      </Button>

      <Modal
        variant='normal'
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        // size='500px'
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis.
            </ModalBody>

            <ModalFooter>
              <Button color='red-600' onClick={onClose} className='mr-3'>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
