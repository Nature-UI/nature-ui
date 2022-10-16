import { fireEvent, render, screen, testA11y } from '@nature-ui/test-utils';

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

describe('@nature-ui/modal', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <NatureModal isOpen onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </NatureModal>,
    );

    await testA11y(container);
    await testA11y(
      <Modal isOpen onClose={jest.fn()} footer={'Modal Footer'}>
        Modal Body
      </Modal>,
    );
  });

  test("should have the proper 'aria' attributes", () => {
    const tools = render(
      <NatureModal isOpen onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent data-testid='modal'>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
        </ModalContent>
      </NatureModal>,
    );

    const dialog = tools.getByTestId('modal');

    /**
     * should have `aria-modal` set to `true`
     */
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('role', 'dialog');

    /**
     * The id of `DialogBody` should equal the `aria-describedby` of the dialog
     */
    expect(tools.getByText('Modal body').id).toStrictEqual(
      dialog.getAttribute('aria-describedby'),
    );

    /**
     * The id of `DialogHeader` should equal the `aria-labelledby` of the dialog
     */
    expect(tools.getByText('Modal header').id).toStrictEqual(
      dialog.getAttribute('aria-labelledby'),
    );
  });

  test("should fire 'onClose' callback when close button is clicked", () => {
    const onClose = jest.fn();

    const tools = render(
      <Modal isOpen onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalCloseButton data-testid='close' />
        </ModalContent>
      </Modal>,
    );

    /**
     * click the close button
     */
    fireEvent.click(tools.getByTestId('close'));

    expect(onClose).toHaveBeenCalled();
  });
});

describe('closing the modal', () => {
  test('clicking overlay calls the onClose callback', async () => {
    const onClose = jest.fn();
    render(
      <NatureModal isOpen onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
        </ModalContent>
      </NatureModal>,
    );

    const dialog = await screen.findByRole('dialog');
    const overlay = dialog.parentElement;

    if (overlay) {
      // an extra mousedown is required to get onOverlayClick function in `useModal` to work
      fireEvent.mouseDown(overlay);
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalled();
    }
  });

  test('pressing escape key calls the onClose callback', async () => {
    const onClose = jest.fn();
    const { user } = render(
      <Modal isOpen onClose={onClose} footer={'Modal Footer'}>
        Modal Body
      </Modal>,
    );

    user.press.Escape(document.activeElement!);
    expect(onClose).toHaveBeenCalled();
  });
});
