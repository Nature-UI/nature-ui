# Drawer

The Drawer component is a panel that slides out from the edge of the screen. It
can be useful when you need users to complete a task or view some details
without leaving the current page.

## Installation

```sh
yarn add @nature-ui/drawer
```

## Import component

```jsx
import { Drawer, DrawerContent, DrawerOverlay } from '@nature-ui/drawer';
```

## Usage

```jsx
<>
  <button onClick={() => setOpen(!open)}>Open</button>
  <Drawer placement='right' isOpen={open} onClose={() => setOpen(false)}>
    <DrawerOverlay>
      <DrawerContent>
        <div>This is the drawer content</div>
        <button>This is a button</button>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
</>
```
