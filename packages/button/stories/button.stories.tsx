import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, ButtonType } from '../src';

export default {
  title: 'Button',
  component: Button,
} as Meta;

type ButtonStoryType = Story<ButtonType>;

const Template: ButtonStoryType = (args) => <Button {...args} />;

export const Default: ButtonStoryType = Template.bind({});
Default.args = {
  children: 'Click me',
};

export const Outlined: ButtonStoryType = Template.bind({});
Outlined.args = {
  text: 'teal-500',
  variant: 'outline',
  children: 'Click me!',
};

export const Ghost: ButtonStoryType = Template.bind({});
Ghost.args = {
  text: 'teal-500',
  variant: 'ghost',
  children: 'Hover me!',
};

export const Link: ButtonStoryType = Template.bind({});
Link.args = {
  text: 'teal-500',
  variant: 'link',
  children: 'Click me!',
};

export const Sizes = () => {
  return (
    <div>
      <Button size='xs' className='mr-4' color='blue-500' variant='solid'>
        Button
      </Button>
      <Button size='sm' className='mr-4' color='blue-500' variant='solid'>
        Button
      </Button>
      <Button size='md' className='mr-4' color='blue-500' variant='solid'>
        Button
      </Button>
      <Button size='lg' className='mr-4' color='blue-500' variant='solid'>
        Button
      </Button>
    </div>
  );
};

export const IsDisabled: ButtonStoryType = Template.bind({});

IsDisabled.args = {
  isDisabled: true,
  children: 'Disabled',
};

export const IsLoading = () => {
  return (
    <>
      <Button
        color='teal-500'
        variant='solid'
        isLoading
        loadingText='loading...'
        size='md'
      >
        Button
      </Button>
      <Button color='teal-500' variant='solid' isLoading className='ml-4' />
    </>
  );
};

export const Red = () => {
  return (
    <Button color='red-500' variant='solid'>
      Button
    </Button>
  );
};
