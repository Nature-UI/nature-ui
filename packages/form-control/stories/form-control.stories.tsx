import {
  clsx,
  forwardRef,
  HTMLNatureProps,
  nature,
  PropsOf,
} from '@nature-ui/system';
import { StringOrNumber } from '@nature-ui/utils';
import { Meta } from '@storybook/react';
import * as React from 'react';

import {
  FormControl,
  FormControlOptions,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  RequiredIndicator,
  useFormControl,
} from '../src';

export default {
  title: 'FormControl',
  component: FormControl,
  decorators: [(story: Function) => <div className='max-w-md'>{story()}</div>],
} as Meta;

const TextareaTag = nature('textarea');
const SelectTag = nature('select');

type OmittedTypes = 'disabled' | 'required' | 'readOnly' | 'size';

type InputProps = Omit<HTMLNatureProps<'input'>, OmittedTypes> &
  FormControlOptions & {
    // Input component as `size` by default so it resolves to `never`
    size?: StringOrNumber;
  };

const Input = forwardRef<InputProps, 'input'>((props, ref) => {
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
    //@ts-ignore
    <nature.input className={_className} ref={ref} {...inputProps} {...rest} />
  );
});

export const InputExample = () => (
  <FormControl id='first-name' isRequired isInvalid>
    <FormLabel>First name</FormLabel>
    <RequiredIndicator data-testid='indicator' />
    <Input placeholder='First Name' />
    <FormHelperText>Keep it very short and sweet!</FormHelperText>
    <FormErrorMessage>Your First name is invalid</FormErrorMessage>
  </FormControl>
);

type TextAreaProps = Omit<HTMLNatureProps<'textarea'>, OmittedTypes> &
  FormControlOptions;

const TextArea = forwardRef<TextAreaProps, 'textarea'>((props, ref) => {
  const inputProps = useFormControl<HTMLTextAreaElement>(props);
  const { className = '', ...rest } = props;

  const { 'aria-invalid': isInvalid } = inputProps;

  const _className = clsx('w-full border-solid border-2 rounded', {
    [className]: className,
    'border-red-600': isInvalid,
  });

  return (
    <TextareaTag
      css={{
        padding: '8px',
        minHeight: '80px',
        lineHeight: 'short',
      }}
      className={_className}
      ref={ref}
      {...inputProps}
      {...rest}
    />
  );
});

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
