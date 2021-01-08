import * as React from 'react';
import { Stack } from '@nature-ui/layout';

import { Radio, RadioGroup, useRadioGroup } from '../src';

export default {
  title: 'Radio',
};

export const Basic = () => <Radio>Hello</Radio>;

export const Disabled = () => <Radio isDisabled>Disabled</Radio>;

export const Readonly = () => (
  <Radio
    wrapperClass='mt-48'
    colorScheme='blue-600'
    isChecked
    isReadOnly
    size='lg'
  >
    I'm a readonly radio
  </Radio>
);

export const Invalid = () => (
  <Radio wrapperClass='mt-48' colorScheme='blue-600' isInvalid size='lg'>
    I'm a invalid radio
  </Radio>
);

export const WithSizes = () => {
  const sizes: ['sm', 'md', 'lg'] = ['sm', 'md', 'lg'];

  return (
    <>
      {sizes.map((size) => (
        <Radio
          key={size}
          size={size}
          name='sample'
          colorScheme='green-500'
          className='ml-6'
        >
          Option
        </Radio>
      ))}
    </>
  );
};

export const radioGroup = () => {
  return (
    <RadioGroup defaultValue='Option 1' onChange={console.log}>
      <Stack spacing='1rem'>
        <Radio value='Option 1'>Option 1</Radio>
        <Radio value='Option 2'>Option 2</Radio>
        <Radio value='Option 3'>Option 3</Radio>
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
    <Stack spacing='20px' direction='row' {...getRootProps()}>
      {options.map((value) => (
        <Radio key={value} {...getRadioProps({ value })}>
          {value}
        </Radio>
      ))}
    </Stack>
  );
};
