import * as React from 'react';
import { PortalManager } from '@nature-ui/portal';

import { Drawer, DrawerContent, DrawerOverlay } from '../src';

export default {
  title: 'Drawer',
  component: Drawer,
  decorators: [
    (StoryFn: Function) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
};

export const Basic = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open</button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerOverlay>
          <DrawerContent>
            <div>This is the drawer content</div>
            <button>This is a button</button>
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
      <button onClick={() => setOpen(!open)}>Open</button>
      <Drawer
        size='lg'
        placement='right'
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <DrawerOverlay>
          <DrawerContent>
            <div>This is the drawer content</div>
            <button>This is a button</button>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
