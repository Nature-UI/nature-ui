import {
  Button,
  Input,
  Radio,
  RadioGroup,
  useBoolean,
  useInterval,
} from '@nature-ui/core';
import { nature } from '@nature-ui/system';
import { useState } from 'react';
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  usePopover,
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

export function PopoverExample() {
  const { getTriggerProps, getPopoverProps, onClose } = usePopover();

  return (
    <>
      <button type='button' {...getTriggerProps()}>
        Open
      </button>
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
        <button type='button' onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
}

export const simple = () => (
  <Popover placement='right-start'>
    <PopoverTrigger>
      <nature.button>Trigger</nature.button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>Confirmation!</PopoverHeader>
      <PopoverBody>
        <p>Are you sure you want to have that milkshake?</p>
        <br />
        <button>Yes</button>
        <button>No</button>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

export const basic = () => (
  <>
    <Popover placement='top'>
      <PopoverTrigger>
        <nature.button>Welcome home</nature.button>
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
        <nature.button>Welcome home</nature.button>
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

    <nature.input />
  </>
);

export const Arrow = () => (
  <>
    <Popover placement='top' arrowSize={40}>
      <PopoverTrigger>
        <button>Welcome home</button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow className=' bg-red-600' />
        <PopoverHeader>Submit now</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  </>
);

export function ControlledUsage() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  return (
    <>
      <Button mr={5} onClick={open}>
        Trigger
      </Button>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button className='bg-pink-500 text-white'>Popover Target</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader className='font-semibold'>Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to continue with your action?
          </PopoverBody>
          <PopoverFooter className='flex justify-end'>
            <Button variant='outline' size='sm'>
              Cancel
            </Button>
            <Button className='bg-red-500 ml-3 text-white' size='sm'>
              Apply
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

const Interval = () => {
  const [value, setValue] = useState(0);
  useInterval(() => setValue((v) => v + 1), 1000);
  return (
    <span style={{ fontWeight: 'bold', color: 'tomato', padding: 4 }}>
      {value}
    </span>
  );
};

export function WithLazyPopover() {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button className='bg-teal-500'>Popover Target</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          Are you sure you want to continue with your action?
          <p>
            Timer: <Interval />
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function WithLazyPopoverMounted() {
  return (
    <Popover isLazy lazyBehavior='keepMounted'>
      <PopoverTrigger>
        <Button className='bg-teal-500'>Popover Target</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          Are you sure you want to continue with your action?
          <p>
            Timer: <Interval />
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function WithPopoverAnchor() {
  const [isEditing, setIsEditing] = useBoolean();
  const [color, setColor] = useState('text-red-500');

  return (
    <Popover
      isOpen={isEditing}
      onOpen={setIsEditing.on}
      onClose={setIsEditing.off}
      closeOnBlur={false}
      isLazy
      lazyBehavior='keepMounted'
    >
      <PopoverAnchor>
        <Input
          className={`${color} w-auto inline-flex`}
          isDisabled={!isEditing}
          defaultValue='Popover Anchor'
        />
      </PopoverAnchor>

      <PopoverTrigger>
        <Button className='bg-teal-200'>{isEditing ? 'Save' : 'Edit'}</Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverBody>
          Colors:
          <RadioGroup
            value={color}
            onChange={(newColor: string) => setColor(newColor)}
          >
            <Radio value='text-red-500'>red</Radio>
            <Radio value='text-blue-500'>blue</Radio>
            <Radio value='text-green-500'>green</Radio>
            <Radio value='text-purple-500'>purple</Radio>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
