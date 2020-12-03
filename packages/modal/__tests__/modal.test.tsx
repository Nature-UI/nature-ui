import * as React from 'react';
import { render, axe, fireEvent, press } from '@nature-ui/test-utils';
import { PortalManager } from '@nature-ui/portal';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '../src';

const renderWithPortal = (ui: React.ReactElement) =>
  render(<PortalManager>{ui}</PortalManager>);

describe('@nature-ui/modal', () => {
  test('should render correctly', () => {
    const tools = renderWithPortal(
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal header</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Modal body</ModalBody>
            <ModalFooter>Modal footer</ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );

    expect(tools.asFragment()).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const tools = renderWithPortal(
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal header</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Modal body</ModalBody>
            <ModalFooter>Modal footer</ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );

    const result = await axe(tools.container);

    expect(result).toHaveNoViolations();
  });

  test("should have the proper 'aria' attributes", () => {
    const tools = renderWithPortal(
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay>
          <ModalContent data-testid='modal'>
            <ModalHeader>Modal header</ModalHeader>
            <ModalBody>Modal body</ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
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
      dialog.getAttribute('aria-describedby')
    );

    /**
     * The id of `DialogHeader` should equal the `aria-labelledby` of the dialog
     */
    expect(tools.getByText('Modal header').id).toStrictEqual(
      dialog.getAttribute('aria-labelledby')
    );
  });

  test("should fire 'onClose' callback when close button is clicked", () => {
    const onClose = jest.fn();

    const tools = renderWithPortal(
      <Modal isOpen onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal header</ModalHeader>
            <ModalCloseButton data-testid='close' />
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );

    /**
     * click the close button
     */
    fireEvent.click(tools.getByTestId('close'));

    expect(onClose).toHaveBeenCalledWith(expect.anything());
  });

  test('clicking overlay or pressing "esc" calls the onClose callback', () => {
    const onClose = jest.fn();
    const tools = renderWithPortal(
      <Modal isOpen onClose={onClose}>
        <ModalOverlay data-testid='overlay'>
          <ModalContent>
            <ModalHeader>Modal header</ModalHeader>
            <ModalBody>Modal body</ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );

    const overlay = tools.getByTestId('overlay');

    // FIXME: Get rid of the linting error when internet comes up.
    press.Escape(overlay);
    expect(onClose).toHaveBeenCalledWith();
  });
});
