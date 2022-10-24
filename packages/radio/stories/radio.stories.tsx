import { Stack } from '@nature-ui/layout';
import { Story } from '@storybook/react';
import React from 'react';

import { Radio, RadioGroup, RadioProps, useRadioGroup } from '../src';

export default {
  title: 'Radio',
};

const Template: Story<RadioProps> = (args) => (
  <Radio
    {...args}
    bg='bg-blue-500'
    borderBg='border-blue-500'
    darkBg='bg-blue-700'
    darkBorderBg='border-blue-700'
  />
);
export const Basic = () => <Template>Hello</Template>;

export const Disabled = () => <Template isDisabled>Disabled</Template>;

export const Readonly = () => (
  <Radio
    bg='bg-purple-600'
    borderBg='border-purple-600'
    darkBg='bg-purple-800'
    darkBorderBg='border-purple-800'
    isChecked
    isReadOnly
  >
    I'm a readonly radio
  </Radio>
);

export const Invalid = () => <Template isInvalid>I'm a invalid radio</Template>;

export const WithSizes = () => {
  const sizes: ['sm', 'md', 'lg'] = ['sm', 'md', 'lg'];

  return (
    <>
      {sizes.map((size) => (
        <Template key={size} size={size} name='sample' className='ml-6'>
          Option
        </Template>
      ))}
    </>
  );
};

export const radioGroup = () => {
  return (
    <RadioGroup defaultValue='Option 1' onChange={console.log}>
      <Stack spacing='1rem'>
        <Template value='Option 1'>Option 1</Template>
        <Template value='Option 2'>Option 2</Template>
        <Template value='Option 3'>Option 3</Template>
      </Stack>
    </RadioGroup>
  );
};

export const WithHook = () => {
  const options = ['react', 'vue', 'svelte'];

  const { getRadioProps, getRootProps } = useRadioGroup({
    name: 'test',
    defaultValue: 'vue',
    onChange: console.log,
  });

  return (
    <Stack spacing='20px' row {...getRootProps()}>
      {options.map((value) => (
        <Radio key={value} {...getRadioProps({ value })}>
          {value}
        </Radio>
      ))}
    </Stack>
  );
};
