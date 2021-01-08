# @nature-ui/alert-dialog

AlertDialog component is used interrupt the user with a mandatory confirmation
or action.

## Installation

```sh
yarn add @nature-ui/alert-dialog

# or

npm i @nature-ui/alert-dialog
```

## Import components

```jsx
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@nature-ui/react';
```

## Basic usage

## Usage

AlertDialog requires that you provide the `leastDestructiveRef` prop.

Based on
[WAI-ARIA specifications](https://www.w3.org/TR/wai-aria-practices/#alertdialog),
focus should be placed on the least destructive element when the dialog opens,
to prevent users from accidentally confirming the destructive action.

```jsx
function AlertDialogExample() {
  const [isOpen, setIsOpen] = React.useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete Customer</Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Please Confirm!</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete something? This action is
              permanent, and we're totally not just flipping a field called
              "deleted" to "true" in our database, we're actually deleting
              something.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                className='bg-gray-200 hover:bg-gray-300'
              >
                Nevermind
              </Button>
              <Button className='ml-3' variant='outline'>
                Yes, delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
```
