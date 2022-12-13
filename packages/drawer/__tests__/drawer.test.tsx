import { render, screen, testA11y } from '@nature-ui/test-utils';
import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '../src';

const SimpleDrawer = (props: {
  placement?: DrawerProps['placement'];
  isOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen || false);
  const onClose = () => setIsOpen(false);

  return (
    <Drawer placement={props.placement} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Basic Drawer</DrawerHeader>
        <DrawerBody>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

it('does not render when isOpen is false', () => {
  render(<SimpleDrawer placement='left' isOpen={false} />);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('does renders when isOpen is true', () => {
  render(<SimpleDrawer placement='left' isOpen />);

  expect(screen.queryByRole('dialog')).toBeInTheDocument();
});

it('passes a11y test', async () => {
  await testA11y(<SimpleDrawer placement='left' isOpen />);
});

it("renders on the correct side under 'ltr' direction", () => {
  render(<SimpleDrawer placement='left' isOpen />);

  expect(screen.queryByRole('dialog')).toHaveStyle('left: 0');
});
