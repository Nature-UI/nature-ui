import * as React from 'react';
import { Story } from '@storybook/react';
import { Stack } from '@nature-ui/layout';

import { Checkbox, CheckboxGroup, CheckboxProps } from '../src';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

type CheckboxType = Story<CheckboxProps>;

const Template: CheckboxType = (args) => <Checkbox {...args} />;

export const Basic: CheckboxType = Template.bind({});
Basic.args = {
  ...Template.args,
  children: 'Basic',
  defaultIsChecked: true,
};

export const Disabled: CheckboxType = Template.bind({});
Disabled.args = {
  ...Template.args,
  children: 'Disabled',
  isDisabled: true,
};

export const Readonly: CheckboxType = Template.bind({});
Readonly.args = {
  ...Template.args,
  children: 'Readonly',
  isReadOnly: true,
};

export const ReadonlyChecked: CheckboxType = Template.bind({});
ReadonlyChecked.args = {
  ...Template.args,
  children: 'Readonly Checked',
  defaultIsChecked: true,
  isReadOnly: true,
};

export const Invalid: CheckboxType = Template.bind({});
Invalid.args = {
  ...Template.args,
  children: 'Invalid',
  color: 'blue-400',
  isInvalid: true,
};

export const Controlled = () => {
  const [value, setValue] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
  };

  return (
    <Checkbox isChecked={value} onChange={handleChange}>
      Controlled
    </Checkbox>
  );
};

export const Indeterminate = () => {
  const [checkedItems, setCheckedItems] = React.useState([true, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
      >
        Parent Checkbox
      </Checkbox>
      <Stack className='ml-6 mt-2 items-start'>
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          Child Checkbox 1
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Child Checkbox 2
        </Checkbox>
      </Stack>
    </>
  );
};

export const CheckboxGroupExample = () => {
  return (
    <CheckboxGroup
      defaultValue={['one', 'two']}
      onChange={(value) => console.log(value)}
    >
      <Stack spacing={24} direction='row'>
        <Checkbox value='one'>One</Checkbox>
        <Checkbox value='two'>Two</Checkbox>
        <Checkbox value='three'>Three</Checkbox>
      </Stack>
    </CheckboxGroup>
  );
};

type Value = string | number;
type ArrayOfValue = Value[];

export const ControlledCheckboxGroup = () => {
  const [value, setValue] = React.useState<ArrayOfValue>(['one', 'two']);

  return (
    <CheckboxGroup
      value={value}
      onChange={(v: any) => {
        console.log(v);
        setValue(v);
      }}
    >
      <Stack direction='row' spacing='40px'>
        <Checkbox value='one'>One</Checkbox>
        <Checkbox value='two'>Two</Checkbox>
        <Checkbox value='three'>Three</Checkbox>
      </Stack>
    </CheckboxGroup>
  );
};
