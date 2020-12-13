# Popover

Popover is a non-modal dialog that floats around a trigger. It's used to display
contextual information to the user, and should be paired with a clickable
trigger element.

## Installation

```sh
yarn add @nature-ui/popover

# or

npm i @nature-ui/popover
```

## Import components

```jsx
import {
  usePopover,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@nature-ui/core';
```

## Usage

When using this component, ensure the children passed to `PopoverTrigger` is
focusable, user can tab to it using their keyboard, and it can take a `ref`.
It's critical for accessiblity.

> **A11y:** When the Popover opens, focus is sent to the `PopoverContent`. When
> it closes, focus is returned to the trigger.

```jsx
<Popover>
  <PopoverTrigger>
    <Button variant='solid' className=''>
      Trigger
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Confirmation!</PopoverHeader>
    <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
  </PopoverContent>
</Popover>
```
