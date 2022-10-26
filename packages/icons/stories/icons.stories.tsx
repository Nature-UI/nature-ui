import { Icon, SvgIconProps } from '@nature-ui/icon';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { MdAccessible } from 'react-icons/md';
import { AddIcon } from '../src';

export default {
  title: 'Icons/Icons',
  component: Icon,
} as Meta;

type IconType = Story<SvgIconProps>;

const Template: IconType = (args) => <AddIcon {...args} />;

export const WithSize: IconType = Template.bind({});
WithSize.args = {
  size: 60,
  color: 'teal',
};

export const _All = () => <MdAccessible />;

export const WithAs: IconType = Template.bind({});
WithAs.args = {
  as: AddIcon,
  size: 'sm',
  color: 'blue',
};
