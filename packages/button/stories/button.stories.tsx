import { SearchIcon } from '@nature-ui/icons';
import { Stack } from '@nature-ui/layout';
import { Meta, Story } from '@storybook/react';
import { IoLogoGithub } from 'react-icons/io';
import { Button, ButtonProps, ButtonSpinner } from '../src';

export default {
  title: 'Button/Buttons',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button
    {...args}
    className={`bg-blue-500 hover:bg-blue-700 text-white ${args.className}`}
  />
);
export const Defaults = () => {
  return (
    <Stack row>
      <Template>Button</Template>
      <Button className='outline-blue-500 hover:bg-blue-100 text-blue-500 border border-blue-500'>
        Button
      </Button>
      <Button className='hover:bg-blue-100 text-blue-500'>Button</Button>
      <Button className='bg-purple-300 text-purple-700'>Button</Button>
    </Stack>
  );
};

export const Sizes = () => {
  return (
    <Stack row>
      {['xs', 'sm', 'md', 'lg'].map((size: any) => (
        <Template size={size} key={size}>
          Button
        </Template>
      ))}
      <Template size={['50px', '2rem']}>Button</Template>
    </Stack>
  );
};

export const IsDisabled = Template.bind({});

IsDisabled.args = {
  isDisabled: true,
  children: 'Disabled',
};

export const IsLoading = () => {
  return (
    <>
      <Template isLoading loadingText='Submitting...' size='md'>
        Button
      </Template>
      <Template isLoading loadingText='loading...' className='ml-4 ' size='md'>
        Button
      </Template>
      <Button
        className='ml-4 outline-blue-500  text-blue-500 border border-blue-500'
        isLoading
      >
        Email
      </Button>
    </>
  );
};
export const buttonSpinner = () => {
  return <ButtonSpinner />;
};

export const WithIcon = () => {
  return (
    <Stack row>
      <Button
        className='ml-4 outline-blue-500  text-blue-500 border border-blue-500'
        leftIcon={<SearchIcon />}
      >
        Search
      </Button>
      <Template rightIcon={<IoLogoGithub />}>Github</Template>
    </Stack>
  );
};
