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

      <Modal isOpen={isOpen} onClose={onClose}>
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
              <Button onClick={onClose} colorScheme='gray' mr='12px'>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
