import { Button } from '@nature-ui/button';
import { useBoolean } from '@nature-ui/hooks';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Slide } from '../src';

export default {
  title: 'Transition/Slide',
  component: Slide,
  argTypes: {
    direction: {
      options: ['left', 'right', 'top', 'bottom'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Slide>;

const Template: ComponentStory<typeof Slide> = (args) => {
  const [open, { toggle }] = useBoolean(false);
  return (
    <>
      <Button onClick={toggle}>Toggle Slide</Button>
      <Slide
        style={{
          maxWidth: 400,
          background: 'skyblue',
          padding: 30,
          ...args.style,
        }}
        {...args}
        in={open}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Slide>
    </>
  );
};

export const Basic = Template.bind({});

export const BottomPlacement = Template.bind({});
BottomPlacement.args = {
  style: {
    maxWidth: 'unset',
  },
  direction: 'bottom',
};
