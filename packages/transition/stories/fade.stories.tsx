import { Button } from '@nature-ui/button';
import { useBoolean } from '@nature-ui/hooks';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { Fade, FadeProps } from '../src';
import { Modal } from './modal';

export default {
  title: 'Transition/Fade',
  component: Fade,
} as Meta;

const Template: Story<FadeProps> = (args) => {
  const [open, { toggle }] = useBoolean(false);
  return (
    <>
      <Button onClick={toggle}>Toggle Slide</Button>
      <Fade in={open} {...args}>
        <Modal>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Modal>
      </Fade>
    </>
  );
};

export const Basic = Template.bind({});
