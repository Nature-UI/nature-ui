import { Button } from '@nature-ui/button';
import { useBoolean } from '@nature-ui/hooks';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ScaleFade, ScaleFadeProps } from '../src';

export default {
  title: 'Transition/ScaleFade',
  component: ScaleFade,
} as Meta;

export const Basic: Story<ScaleFadeProps> = (args) => {
  const [isOpen, { toggle }] = useBoolean();

  return (
    <>
      <Button onClick={toggle}>Click Me</Button>
      <ScaleFade
        {...args}
        in={isOpen}
        style={{
          maxWidth: 400,
          background: 'red',
          padding: 30,
          ...args.style,
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </ScaleFade>
    </>
  );
};
