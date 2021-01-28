/** ** */
import { nature, PropsOf, clsx } from '@nature-ui/system';
import * as React from 'react';
import { Meta } from '@storybook/react';

import {
  FormControlOptions,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  useFormControl,
  FormErrorIcon,
} from '../src';

export default {
  title: 'FormControl',
  component: FormControl,
  decorators: [(story: Function) => <div className='max-w-md'>{story()}</div>],
} as Meta;

const InputTag = nature('input');
const TextareaTag = nature('textarea');
const SelectTag = nature('select');

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
    const { className = '', ...rest } = props;
    const { 'aria-invalid': isInvalid } = inputProps;

    const _className = clsx(
      'h-10 px-4 rounded border-2 border-solid outline-none w-full',
      {
        [className]: className,
        'border-red-600 focus:border-red-600': isInvalid,
        'focus:border-blue-400': !isInvalid,
      },
    );

    return (
      <StyledInput className={_className} ref={ref} {...inputProps} {...rest} />
    );
  },
);

export const InputExample = () => (
  <FormControl id='first-name' isRequired isInvalid>
    <FormLabel>First name</FormLabel>
    <Input placeholder='First Name' />
    <FormHelperText>Keep it very short and sweet!</FormHelperText>
    <FormErrorMessage>Your First name is invalid</FormErrorMessage>
  </FormControl>
);

type TextAreaProps = Omit<PropsOf<'textarea'>, OmittedTypes> &
  FormControlOptions;

const StyledTextArea = (props: TextAreaProps) => {
  return (
    <TextareaTag
      css={{
        padding: '8px',
        minHeight: '80px',
        lineHeight: 'short',
      }}
      {...props}
    />
  );
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const inputProps = useFormControl<HTMLTextAreaElement>(props);
    const { className = '', ...rest } = props;

    const { 'aria-invalid': isInvalid } = inputProps;

    const _className = clsx('w-full border-solid border-2 rounded', {
      [className]: className,
      'border-red-600': isInvalid,
    });

    return (
      <StyledTextArea
        ref={ref}
        className={_className}
        {...inputProps}
        {...rest}
      />
    );
  },
);

export const TextAreaExample = () => (
  <FormControl as='fieldset' id='first-name' isInvalid>
    <FormLabel as='legend'>First name</FormLabel>
    <TextArea placeholder='First Name' />
    <FormHelperText>Keep it very short and sweet!</FormHelperText>
    <FormErrorMessage>
      <FormErrorIcon />
      Your First name is invalid
    </FormErrorMessage>
  </FormControl>
);

type SelectProps = Omit<PropsOf<'select'>, OmittedTypes> & FormControlOptions;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const inputProps = useFormControl<HTMLSelectElement>(props);

    return <SelectTag ref={ref} {...inputProps} />;
  },
);

export const SelectExample = () => (
  <FormControl id='first-name' isInvalid>
    <FormLabel>First name</FormLabel>
    <Select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
    <FormHelperText>Keep it very short and sweet!</FormHelperText>
    <FormErrorMessage>
      <FormErrorIcon />
      Your First name is invalid
    </FormErrorMessage>
  </FormControl>
);
