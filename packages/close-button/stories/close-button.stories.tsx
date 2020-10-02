import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { CloseButton, CloseButtonProps } from '../src';

export default {
  title: 'Button/CloseButton',
  component: CloseButton,
} as Meta;

type CloseType = Story<CloseButtonProps>;

const Template: CloseType = (args) => <CloseButton {...args} />;

export const Basic: CloseType = Template.bind({});
