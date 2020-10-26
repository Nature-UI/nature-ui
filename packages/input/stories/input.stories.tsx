import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Stack, Box } from '@nature-ui/layout';

import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps,
  InputRightAddon,
} from '../src';

export default {
  title: 'Input',
  component: Input,
  decorators: [
    (args) => (
      <Box className='mx-auto' size='md'>
        {args()}
      </Box>
    ),
  ],
} as Meta;

type InputType = Story<InputProps>;

const Template: InputType = (args) => <Input {...args} />;

export const Basic: InputType = Template.bind({});
Basic.args = {
  placeholder: 'Basic input',
};

export const WithSizes: InputType = () => {
  return (
    <Stack spacing='1rem'>
      {['sm', 'md', 'lg'].map((size) => (
        <Input
          // @ts-ignore
          size={size}
          placeholder='This is an input component'
          key={size}
        />
      ))}
    </Stack>
  );
};

export const Controlled: InputType = () => {
  const [value, setValue] = React.useState('Starting...');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <>
      <Input
        value={value}
        onChange={handleChange}
        placeholder='Controlled input'
      />
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </>
  );
};

export const WithStates: InputType = () => (
  <Stack>
    <Input placeholder='Idle' />
    <Input isInvalid placeholder='isInvalid' />
    <Input isDisabled placeholder='isDisabled' />
    <Input isReadOnly placeholder='isReadonly' />
  </Stack>
);

export const WithVariants: InputType = () => (
  <Stack spacing='2rem'>
    <Input variant='outline' placeholder='Outline' />
    <Input variant='filled' placeholder='Filled' />
    <Input variant='flushed' placeholder='Flushed' />
    <Input variant='unstyled' placeholder='Unstyled' />
  </Stack>
);

export const WithInputAddon = () => (
  <Stack spacing='2rem'>
    <InputGroup>
      <InputLeftAddon
        value='+234'
        className='px-4 bg-gray-200 border-solid border rounded-l border-gray-400'
      />
      <Input placeholder='Phone number...' />
    </InputGroup>

    <InputGroup size='sm'>
      <InputLeftAddon
        value='https://'
        className='px-4 bg-gray-200 border-solid border rounded-l border-gray-400'
      />
      <Input
        placeholder='website.com'
        // className='rounded-l-none rounded-r-none'
      />
      <InputRightAddon
        value='.com'
        className='px-4 bg-gray-300 border-solid border border-gray-400'
      />
    </InputGroup>
  </Stack>
);
