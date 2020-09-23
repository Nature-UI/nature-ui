import * as React from 'react';

import { Checkbox, CheckboxProps } from '../src';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

const Template = (args: CheckboxProps) => <Checkbox {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Basic',
  defaultIsChecked: true,
} as CheckboxProps;

console.log({ Basic });
// export const Checked = () => <Checkbox >Checked</Checkbox>
