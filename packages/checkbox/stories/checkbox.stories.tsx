import * as React from 'react';
import { Story } from '@storybook/react';

import { Checkbox, CheckboxProps } from '../src';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

type CheckboxType = Story<CheckboxProps>;

const Template: CheckboxType = (args) => <Checkbox {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  ...Template.args,
  children: 'Basic',
  defaultIsChecked: true,
};

// export const Checked = () => <Checkbox >Checked</Checkbox>
