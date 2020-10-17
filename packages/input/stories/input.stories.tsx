import * as React from 'react';
import {Story} from '@storybook/react';
import { Stack } from "@nature-ui/layout"

import { Input, InputProps } from '../src';

export default {
  title: 'Input',
  component: Input,
};

type InputType = Story<InputProps>

const Template: InputType = args => <Input {...args} />

export const Basic: InputType = Template.bind({})
Basic.args = {
  placeholder: "Basic input",
}

export const WithSizes = () => {
  return (
    <Stack spacing="1rem" >
      {(["sm", "md", "lg", 45]).map((size) => (
        // @ts-ignore
        <Input size={size} placeholder="This is an input component"  key={size}/>
      ))}
    </Stack>
  )
}

