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

export const State: CloseType = Template.bind({});
State.args = {
  isDisabled: true,
  className: 'text-blue-500',
};

export const Sizes = (props: CloseType) => (
  <>
    <CloseButton size='xs' className='text-teal-500' {...props} />
    <CloseButton size='sm' className='text-orange-500' {...props} />
    <CloseButton size='md' className='text-red-500' {...props} />
    <CloseButton size='lg' className='text-blue-500' {...props} />
    <CloseButton size='xl' className='text-purple-500' {...props} />
  </>
);

export const AlertExample = (props: CloseType) => (
  <>
    <div className='p-4 bg-orange-300'>
      <CloseButton size='sm' {...props} />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
      consectetur quo eius ipsam perferendis fugit necessitatibus quia
      dignissimos suscipit molestiae eveniet, dicta a. At, ab blanditiis
      recusandae adipisci facere corporis excepturi quia tempora quos porro
      corrupti suscipit sapiente voluptatem maxime?
    </div>
  </>
);
