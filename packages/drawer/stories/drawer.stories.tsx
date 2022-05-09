import { Button, ButtonProps } from '@nature-ui/button';
import React from 'react';
import { Drawer, DrawerContent, DrawerOverlay } from '../src';

export default {
  title: 'Drawer',
  component: Drawer,
};

const StyledButton = (args: ButtonProps) => (
  <Button
    {...args}
    className={`bg-gray-200 hover:bg-gray-300 text-gray-700 ${args.className}`}
  />
);
export const Basic = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <StyledButton onClick={() => setOpen(!open)}>Open</StyledButton>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <div>This is the drawer content</div>
          <StyledButton>This is a Button</StyledButton>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const LeftPlacement = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <StyledButton onClick={() => setOpen(!open)}>Open</StyledButton>
      <Drawer placement='left' isOpen={open} onClose={() => setOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <div>This is the drawer content</div>
          <StyledButton>This is a Button</StyledButton>
        </DrawerContent>
      </Drawer>
    </>
  );
};
