import { useDisclosure } from '@nature-ui/hooks';
import { PortalManager } from '@nature-ui/portal';
import { nature, PropsOf } from '@nature-ui/system';
import * as React from 'react';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from '../src';

export default {
  title: 'Modal',

  decorators: [
    (StoryFn: Function) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
};

const Button = (props: PropsOf<typeof nature.button>) => {
  const { className, ...rest } = props;

  return (
    <button
      {...rest}
      className={`px-4 py-2 font-semibold rounded border-none outline-none focus:shadow-outline ${className}`}
    />
  );
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
              <Button
                onClick={onClose}
                className='bg-gray-200 hover:bg-gray-300 transition duration-200'
                mr='12px'
              >
                Cancel
              </Button>
              <Button className='bg-blue-600 text-white hover:bg-blue-500 ml-3'>
                Save
              </Button>
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
              <Button mr={3} onClick={onClose}>
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
