import { Meta, Story } from '@storybook/react';
import React from 'react';
import { CloseButton, CloseButtonProps } from '../src';

export default {
  title: 'Button/CloseButton',
  component: CloseButton,
} as Meta;

type CloseType = Story<CloseButtonProps>;

const Template: CloseType = (args) => <CloseButton {...args} />;

export const Basic: CloseType = Template.bind({});

export const State: CloseType = Template.bind({});
State.args = {
  isDisabled: true,
  className: 'text-blue-500',
};

export const Sizes = (props: CloseType) => (
  <>
    <CloseButton size='xs' className='text-blue-500' {...props} />
    <CloseButton size='sm' className='text-blue-500' {...props} />
    <CloseButton size='md' className='text-red-500' {...props} />
    <CloseButton size='lg' className='text-blue-500' {...props} />
    <CloseButton size='xl' className='text-purple-500' {...props} />
  </>
);

export const Example = (props: CloseType) => (
  <>
    <div className='p-4 bg-blue-300 relative pr-10'>
      <CloseButton
        aria-label='Close'
        size='sm'
        {...props}
        className='absolute top-0 right-0 mt-2 mr-2'
      />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
      consectetur quo eius ipsam perferendis fugit necessitatibus quia
      dignissimos suscipit molestiae eveniet, dicta a. At, ab blanditiis
      recusandae adipisci facere corporis excepturi quia tempora quos porro
      corrupti suscipit sapiente voluptatem maxime?
    </div>
  </>
);
