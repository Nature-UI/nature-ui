# Portal

A wrapper for rendering components in React Portals, with support for nested
portals and stacking. No need to use `z-index` at all with this portal, that's
right!

## Installation

```sh
yarn add @nature-ui/portal

# or

npm i @nature-ui/portal
```

## Import components

```jsx
import { Portal, PortalManager } from '@nature-ui/portal';
```

Render the `PortalManager` once at the root of your application

```jsx
function App() {
  return (
    <>
      <CSSReset />
      <PortalManager>{/* Your app goes here  */}</PortalManager>
    </>
  );
}
```

### Basic usage

Portals are render into the portal manager's node by default not
`document.body`.

> It'll only render into `document.body` if you don't include `PortalManager`.

```jsx
<div>
  <p>Welcome</p>
  <Portal>This text has been portaled</Portal>
</div>
```

### Nested portals

Nesting portal can be very useful to build complex widgets like nested menu,
popovers, modal, etc.

```jsx
<Portal>
  This is a portal.
  <Portal>This is a nested portal</Portal>
</Portal>
```
