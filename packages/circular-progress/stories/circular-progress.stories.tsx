import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { CircularProgress, CircularProgressProps } from '../src';

export default {
  title: 'Progress/Circular',
  component: CircularProgress,
} as Meta;

type ProgressType = Story<CircularProgressProps>;

const Template: ProgressType = (args) => <CircularProgress {...args} />;

export const Basic: ProgressType = Template.bind({});
Basic.args = {
  value: 25,
};

export const WithSize: ProgressType = Template.bind({});
WithSize.args = {
  value: 25,
  size: 80,
};

export const WithThickness: ProgressType = Template.bind({});
WithThickness.args = {
  value: 25,
  thickness: 5,
};

export const WithLabel: ProgressType = Template.bind({});
WithLabel.args = {
  value: 65,
  label: '65%',
};
