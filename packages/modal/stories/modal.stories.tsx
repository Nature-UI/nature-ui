import { Button } from '@nature-ui/button';
import { useDisclosure } from '@nature-ui/hooks';
import { nature } from '@nature-ui/system';
import React from 'react';

import Lorem from 'react-lorem-component';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NatureModal,
} from '../src';

export default {
  title: 'Modal',
  component: NatureModal,
};

export const BasicUsage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} className='bg-purple-500 text-white'>
        Open
      </Button>

      <Modal
        variant='blur'
        isOpen={isOpen}
        onClose={onClose}
        title={'Welcome Home'}
        footer={
          <>
            <Button onClick={onClose} className='mr-3 bg-purple-500 text-white'>
              Cancel
            </Button>
            <Button className='text-purple-500 hover:bg-purple-100'>
              Save
            </Button>
          </>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit,
        ligula sit amet pharetra accumsan, nulla augue fermentum dui, eget
        finibus diam sapien eget nisi. Fusce posuere tempus cursus. Nulla cursus
        dapibus ligula, sit amet facilisis libero
      </Modal>
    </>
  );
};

export const WithSize = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} className='bg-purple-500 text-white'>
        Open
      </Button>

      <NatureModal
        variant='blur'
        scrollBehavior='outside'
        isOpen={isOpen}
        size={'full'}
        onClose={onClose}
      >
        <ModalOverlay />
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
            aute id consequat veniam incididunt duis in sint irure nisi. Mollit
            officia cillum Lorem ullamco minim nostrud elit officia
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} className='mr-3 bg-purple-500 text-white'>
              Cancel
            </Button>
            <Button color='red-500'>Save</Button>
          </ModalFooter>
        </ModalContent>
      </NatureModal>
    </>
  );
};

export function NestedModal() {
  const first = useDisclosure();
  const second = useDisclosure();
  const third = useDisclosure();
  return (
    <>
      <Button onClick={first.onOpen} className='bg-purple-500 text-white'>
        Open
      </Button>
      <NatureModal isOpen={first.isOpen} onClose={first.onClose}>
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
            <Button
              onClick={second.onOpen}
              className='bg-purple-500 text-white'
            >
              Open Nested
            </Button>
          </ModalFooter>

          <NatureModal isOpen={second.isOpen} onClose={second.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal 2 Title</ModalHeader>
              <ModalFooter>
                <nature.div css={{ flex: 1 }} />
                <Button onClick={third.onOpen}>Open Nested 2</Button>
              </ModalFooter>

              <NatureModal isOpen={third.isOpen} onClose={third.onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader tabIndex={0}>Modal 3 Title</ModalHeader>
                </ModalContent>
              </NatureModal>
            </ModalContent>
          </NatureModal>
        </ModalContent>
      </NatureModal>
    </>
  );
}

export const ReturnFocus = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef<any>();
  console.log({ finalRef });

  return (
    <>
      <div ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
        Some other content that&apos;ll receive focus on close.
      </div>

      <Button onClick={onOpen} className='bg-purple-500 text-white mt-4'>
        Open Modal
      </Button>

      <NatureModal
        variant='normal'
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem size={5} />
          </ModalBody>

          <ModalFooter>
            <Button color='red-600' onClick={onClose} className='mr-3'>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </NatureModal>
    </>
  );
};

export const InsideScroll = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} className='bg-purple-500 text-white'>
        Open
      </Button>
      <NatureModal onClose={onClose} isOpen={isOpen} scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem size={5} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} className='bg-purple-500 text-white'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </NatureModal>
    </>
  );
};

export const FullScreen = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} className='bg-purple-500 text-white'>
        Open
      </Button>
      <NatureModal onClose={onClose} isOpen={isOpen} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem size={5} />
            <Lorem size={5} />
            <Lorem size={5} />
            <Lorem size={5} />
            <Lorem size={5} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} className='bg-purple-500 text-white'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </NatureModal>
    </>
  );
};

export const IsCentered = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} className='bg-purple-500 text-white'>
        Open
      </Button>

      <Modal
        variant='blur'
        isOpen={isOpen}
        onClose={onClose}
        title='Welcome Home'
        motionPreset='slideInBottom'
        isCentered
        footer={
          <>
            <Button onClick={onClose} className='mr-3 bg-purple-500 text-white'>
              Cancel
            </Button>
            <Button className='text-purple-500 hover:bg-purple-100'>
              Save
            </Button>
          </>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit,
        ligula sit amet pharetra accumsan, nulla augue fermentum dui, eget
        finibus diam sapien eget nisi. Fusce posuere tempus cursus. Nulla cursus
        dapibus ligula, sit amet facilisis libero
      </Modal>
    </>
  );
};

export const WithTransitionDirections = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} className='bg-purple-500 text-white'>
        Open
      </Button>

      <Modal
        variant='blur'
        isOpen={isOpen}
        onClose={onClose}
        title='Welcome Home'
        motionPreset='slideInBottom'
        isCentered
        footer={
          <>
            <Button onClick={onClose} className='mr-3 bg-purple-500 text-white'>
              Cancel
            </Button>
            <Button className='text-purple-500 hover:bg-purple-100'>
              Save
            </Button>
          </>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit,
        ligula sit amet pharetra accumsan, nulla augue fermentum dui, eget
        finibus diam sapien eget nisi. Fusce posuere tempus cursus. Nulla cursus
        dapibus ligula, sit amet facilisis libero
      </Modal>
    </>
  );
};
