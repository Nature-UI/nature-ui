import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Stack, Box } from '@nature-ui/layout';

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

type InputType = Story<InputProps>;

const Template: InputType = (args) => <Input {...args} />;

export const Basic: InputType = Template.bind({});
Basic.args = {
  placeholder: 'Basic input',
};

export const WithSizes: InputType = () => {
  return (
    <Stack spacing='1rem'>
      {['sm', 'md', 'lg', 45].map((size) => (
        // @ts-ignore
        <Input
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

export const WithStates = () => (
  <Stack>
    <Input placeholder='Idle' />
    <Input isInvalid placeholder='isInvalid' />
    <Input isDisabled placeholder='isDisabled' />
    <Input isReadOnly placeholder='isReadonly' />
    <Input isRequired placeholder='isRequired' />
  </Stack>
);
