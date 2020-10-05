/** @jsx jsx */
import { jsx, nature, PropsOf } from '@nature-ui/system';
import * as React from 'react';

import {
  FormControlOptions,
  FormControl,
  //   FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  useFormControl,
} from '../src';

export default {
  title: 'FormControl',
  component: FormControl,
};

const InputTag = nature('input');

type OmittedTypes = 'disabled' | 'required' | 'readOnly' | 'size';

type InputProps = Omit<PropsOf<typeof StyledInput>, OmittedTypes> &
  FormControlOptions & {
    // Input component as `size` by default so it resolves to `never`
    size?: string;
  };

// Create an input that consumes useFromControl
type Props = { focusBorderColor?: string; errorBorderColor?: string };

const StyledInput = (props: PropsOf<typeof InputTag> & Props) => (
  <InputTag {...props} />
);

const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const inputProps = useFormControl<HTMLInputElement>(props);

    return <StyledInput ref={ref} {...inputProps} />;
  }
);

export const InputExample = () => (
  <FormControl id='first-name' isRequired isInvalid>
    <FormLabel>First name</FormLabel>
    <Input placeholder='First Name' />
    <FormHelperText>Keep it very short and sweet!</FormHelperText>
    <FormErrorMessage>Your First name is invalid</FormErrorMessage>
  </FormControl>
);
