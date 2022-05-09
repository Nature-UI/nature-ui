import { CheckIcon } from '@nature-ui/icons';
import { Box, Stack } from '@nature-ui/layout';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { Input, InputProps } from '../src';

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

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Basic input',
  className: 'focus:border-blue-500',
};

export const WithSizes = () => {
  return (
    <Stack spacing='1rem' col>
      {['sm', 'md', 'lg'].map((size) => (
        <Input
          size={size as any}
          placeholder='This is an input component'
          key={size}
        />
      ))}
    </Stack>
  );
};

export const Controlled = () => {
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

export const WithStates = () => (
  <Stack col>
    <Input placeholder='Idle' />
    <Input isInvalid placeholder='isInvalid' className='' />
    <Input isDisabled placeholder='isDisabled' />
    <Input isReadOnly placeholder='isReadonly' />
  </Stack>
);

export const WithVariants = () => (
  <Stack spacing='2rem' col>
    <Input variant='outline' placeholder='Outline' />
    <Input variant='filled' placeholder='Filled' />
    <Input
      variant='flushed'
      placeholder='Flushed'
      className='focus:border-purple-400'
    />
    <Input variant='unstyled' placeholder='Unstyled' />
  </Stack>
);

export const WithInputAddon = () => (
  <Stack spacing='2rem' col>
    <Input
      placeholder='your-website'
      defaultValue='divinehycenth'
      addonLeft='https://'
      addonRight='.com'
    />

    <Input
      placeholder='Phone number...'
      type='number'
      addonLeft='+234'
      size='sm'
    />

    <Input
      placeholder='Enter amount'
      type='number'
      addonRight={<CheckIcon color='green' />}
    />
  </Stack>
);

export const PasswordInput = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Input
      placeholder='Enter password'
      type={show ? 'text' : 'password'}
      addonRight={
        <button onClick={handleClick}>{show ? 'Hide' : 'Show'}</button>
      }
    />
  );
};
