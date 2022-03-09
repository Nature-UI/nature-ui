import { Button } from '@nature-ui/button';
import * as React from 'react';
import { Drawer, DrawerContent, DrawerOverlay } from '../src';

export default {
  title: 'Drawer',
  component: Drawer,
};

export const Basic = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open</Button>
      <Drawer isOpen={true} onClose={() => setOpen(false)}>
        <DrawerOverlay>
          <DrawerContent>
            <div>This is the drawer content</div>
            <Button>This is a Button</Button>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export const RightPlacement = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open</Button>
      <Drawer
        size='lg'
        placement='right'
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <DrawerOverlay>
          <DrawerContent>
            <div>This is the drawer content</div>
            <Button>This is a Button</Button>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
