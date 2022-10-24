import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Progress, ProgressProps } from '../src';

export default {
  title: 'Progress/Linear',
  component: Progress,
} as Meta;

type ProgressType = Story<ProgressProps>;

const Template: ProgressType = (args) => <Progress {...args} />;

export const Basic: ProgressType = Template.bind({});
Basic.args = {
  value: 50,
};

/**
 * Pass the `colorScheme` prop to change the color of the
 * indicator of the progress component
 */
export const withColorScheme: ProgressType = Template.bind({});
withColorScheme.args = {
  value: 30,
  size: 'sm',
  indicatorClassName: 'bg-teal-500',
};

/**
 * Pass the `value` prop as `undefined` to put the progress component in
 * the indeterminate state
 */
export const Indeterminate: ProgressType = Template.bind({});
Indeterminate.args = {
  size: 5,
  isIndeterminate: true,
};

/**
 * Pass the `label` prop as `string` to display some text
 */
export const WithValueText: ProgressType = Template.bind({});
WithValueText.args = {
  value: 60,
  valueText: 'Divine Nature',
  size: 20,
};

/**
 * Pass the `hasStripe` prop to have a beautiful gradient to create a striped effect
 */
export const withStripe: ProgressType = Template.bind({});
withStripe.args = {
  value: 60,
  hasStripe: true,
};

/**
 * Pass the `size` prop to change the height of the progress component.
 * Allowed `size` values are sm, md, lg
 */
export const withSizes = () => (
  <div>
    <Progress size='sm' value={20} />
    <br />
    <Progress size='md' value={20} />
    <br />
    <Progress size='lg' value={20} />
  </div>
);

/**
 * Pass the `isAnimated` prop combined with the `hasStrip` prop
 * to get a beautifully animated progress component
 */
export const WithAnimation: ProgressType = Template.bind({});
WithAnimation.args = {
  value: 50,
  hasStripe: true,
  indicatorClassName: 'bg-teal-500',
  isAnimated: true,
};
