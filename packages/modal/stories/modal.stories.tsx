import { Button } from '@nature-ui/button';
import { useDisclosure } from '@nature-ui/hooks';
import { nature } from '@nature-ui/system';
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
};

export const BasicUsage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open</Button>

      <Modal
        variant='blur'
        // scrollBehavior='outside'
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Welcome Home</ModalHeader>

          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            suscipit, ligula sit amet pharetra accumsan, nulla augue fermentum
            dui, eget finibus diam sapien eget nisi. Fusce posuere tempus
            cursus. Nulla cursus dapibus ligula, sit amet facilisis libero
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} className='mr-3'>
              Cancel
            </Button>
            <Button color='red-500'>Save</Button>
          </ModalFooter>
        </ModalContent>
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

export function NestedModal() {
  const first = useDisclosure();
  const second = useDisclosure();
  const third = useDisclosure();
  return (
    <>
      <button onClick={first.onOpen}>Open</button>
      <Modal isOpen={first.isOpen} onClose={first.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
            officia tempor esse quis.
          </ModalBody>
          <ModalFooter>
            <nature.div css={{ flex: 1 }} />
            <Button>Button 2</Button>
            <Button onClick={second.onOpen}>Open Nested</Button>
          </ModalFooter>

          <Modal isOpen={second.isOpen} onClose={second.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal 2 Title</ModalHeader>
              <ModalFooter>
                <nature.div css={{ flex: 1 }} />
                <Button onClick={third.onOpen}>Open Nested 2</Button>
              </ModalFooter>

              <Modal isOpen={third.isOpen} onClose={third.onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader tabIndex={0}>Modal 3 Title</ModalHeader>
                </ModalContent>
              </Modal>
            </ModalContent>
          </Modal>
        </ModalContent>
      </Modal>
    </>
  );
}
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
