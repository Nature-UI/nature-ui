import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { MdAccessible, MdAcUnit } from 'react-icons/md';
import { Icon, SvgIconProps } from '../src';

export default {
  title: 'Icons/Icon',
  component: Icon,
} as Meta;

type IconType = Story<SvgIconProps>;

export const Default = (props: IconType) => {
  return (
    <span>
      <Icon viewBox='0 0 70 71' {...props} size='xl'>
        <path
          d='M35.0002 0.937256C16.1553 0.937256 0.875244 16.4125 0.875244 35.498C0.875244 54.5836 16.1553 70.0588 35.0002 70.0588C53.8452 70.0588 69.1252 54.5836 69.1252 35.498C69.1252 16.4125 53.8452 0.937256 35.0002 0.937256ZM49.7395 24.2118L33.6977 46.738C33.4735 47.0549 33.1779 47.3132 32.8355 47.4913C32.4931 47.6695 32.1136 47.7624 31.7287 47.7624C31.3437 47.7624 30.9643 47.6695 30.6218 47.4913C30.2794 47.3132 29.9838 47.0549 29.7596 46.738L20.261 33.4074C19.9715 32.9985 20.261 32.4277 20.7561 32.4277H24.3286C25.1055 32.4277 25.8444 32.8057 26.3014 33.4537L31.7249 41.0756L43.6991 24.2581C44.1561 23.6178 44.8874 23.232 45.6719 23.232H49.2444C49.7395 23.232 50.029 23.8029 49.7395 24.2118V24.2118Z'
          fill='black'
        />
      </Icon>
      <h1>Hello world</h1>
    </span>
  );
};

export const UsingReactIcon = (props: IconType) => (
  <Icon as={MdAcUnit} color='teal' size='lg' {...props} />
);

export const WithCustomColor = (props: IconType) => (
  <Icon as={MdAccessible} className='text-blue-500' size='lg' {...props} />
);

export const BoxSize = (props: IconType) => (
  <Icon
    as={MdAccessible}
    boxSize='50px'
    className='text-blue-500'
    size='lg'
    {...props}
  />
);
