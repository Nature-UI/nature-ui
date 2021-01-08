# Modal

A modal is a window overlaid on either the primary window or another dialog
window. Contents behind a modal dialog are **inert** meaning that users cannot
interact with content behind the dialog.

## Installation

```sh
yarn add @nature-ui/modal

# or

npm i @nature-ui/modal
```

## Import components

```jsx
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from '@nature-ui/core';
```

## Usage

When the modal opens, focus is sent into the modal and set to the first tabbable
element. If there are no tabbled element, focus is set on the `ModalContent`.

```jsx
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

            <ModalBody>Sit nulla est ex deserunt ...</ModalBody>

            <ModalFooter>
              <Button
                onClick={onClose}
                className='bg-gray-200 hover:bg-gray-300 transition duration-200 mr-3'
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
```

### Control Focus when Modal closes

When the dialog closes, it returns focus to the element that triggered. Set
`finalFocusRef` to element that should receive focus when the modal opens.

```jsx

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
              Sit nulla est ex ...
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

```
