import { Input } from '@nature-ui/input';
import { Button } from '@nature-ui/button';
import { Box, Stack } from '@nature-ui/layout';
import * as React from 'react';

import {
  usePopover,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
} from '../src';

export default {
  title: 'Popover',
  component: Popover,
  decorators: [
    (story: Function) => (
      <div className='mt-64 mx-auto max-w-screen-sm'>{story()}</div>
    ),
  ],
};

export const PopoverExample = () => {
  const { getTriggerProps, getPopoverProps, onClose } = usePopover({
    returnFocus: false,
    autoFocus: false,
  });

  return (
    <>
      <button {...getTriggerProps()}>Open</button>
      <div
        {...getPopoverProps({
          style: {
            background: 'tomato',
            color: 'white',
            padding: 30,
          },
        })}
      >
        This is the content <br />
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export const simple = () => (
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
);

export const basic = () => (
  <>
    <Popover placement='top'>
      <PopoverTrigger>
        <Button>Welcome home</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Submit now</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PopoverBody>
      </PopoverContent>
    </Popover>

    <Popover placement='bottom'>
      <PopoverTrigger>
        <Button className='ml-4'>Welcome home</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Submit now</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PopoverBody>
      </PopoverContent>
    </Popover>

    <Input />
  </>
);

export function WalkthroughPopover() {
  const initialFocusRef = React.useRef();
  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement='bottom'
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button className='ml-12  '>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent className='w-full px-3 bg-blue-800 text-white border-blue-800'>
        <PopoverHeader className='pt-4 font-bold border-none'>
          Manage Your Channels
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </PopoverBody>
        <PopoverFooter className='flex pb-4 border-none justify-between items-center'>
          <Box className='text-sm'>Step 2 of 4</Box>
          <Stack row spacing='1rem'>
            <Button size='sm' className='block' color='green-500'>
              Setup Email
            </Button>
            <Button size='sm' color='blue-500' ref={initialFocusRef}>
              Next
            </Button>
          </Stack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
