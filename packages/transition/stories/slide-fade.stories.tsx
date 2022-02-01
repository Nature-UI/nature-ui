import { Button } from '@nature-ui/button';
import { useBoolean } from '@nature-ui/hooks';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { SlideFade, SlideFadeProps } from '../src';

export default {
  title: 'Transition/SlideFade',
  component: SlideFade,
} as Meta;

const Template: Story<SlideFadeProps> = (args) => {
  const [open, { toggle }] = useBoolean(false);

  return (
    <>
      <Button onClick={toggle}>Toggle Slide</Button>
      <SlideFade
        in={open}
        {...args}
        style={{
          maxWidth: 400,
          background: 'red',
          padding: 30,
          ...args.style,
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </SlideFade>
    </>
  );
};

export const Basic = Template.bind({});

export const WithCustomTransition = Template.bind({});
WithCustomTransition.args = {
  transition: { enter: { duration: 0.3 }, exit: { duration: 0.5 } },
};

export const WithTransitionEnd = Template.bind({});
WithTransitionEnd.args = {
  style: {
    display: 'block',
  },
  transitionEnd: {
    exit: { display: 'none' },
  },
};

export const WithoutReverseProp = Template.bind({});
WithoutReverseProp.args = {
  reverse: false,
  style: {
    display: 'block',
  },
  transitionEnd: { exit: { display: 'none' } },
};
