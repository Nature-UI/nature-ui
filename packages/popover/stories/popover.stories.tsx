import { nature } from '@nature-ui/system';
import { Button } from '@nature-ui/button';
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
} from '../src';

export default {
  title: 'Popover',
  component: Popover,
  decorators: [(story: Function) => <div className='mt-64'>{story()}</div>],
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

const Input = nature('input');

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
