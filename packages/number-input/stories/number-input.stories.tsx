import { Button } from '@nature-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@nature-ui/form-control';
import { Input } from '@nature-ui/input';
import { Stack } from '@nature-ui/layout';
import { nature } from '@nature-ui/system';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  NumberInputWrapper,
  useNumberInput,
} from '../src';

export default {
  title: 'NumberInput',
  component: NumberInput,
  decorators: [
    (story: Function) => (
      <nature.div className='max-w-sm mt-10 mx-auto'>{story()}</nature.div>
    ),
  ],
} as Meta;

const Template: Story<NumberInputProps> = (args) => <NumberInput {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  max: 50,
  min: 10,
};

export const withMinAndMax = () => (
  <NumberInputWrapper defaultValue={15} min={10} max={20}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInputWrapper>
);

export const withStep = () => (
  <NumberInputWrapper step={5} defaultValue={15} min={10} max={30}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInputWrapper>
);

export const withPrecision = () => (
  <NumberInputWrapper defaultValue={15} precision={2} step={0.2}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInputWrapper>
);

export const withClampValueDisabled = () => (
  <NumberInputWrapper defaultValue={15} max={30} clampValueOnBlur={false}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInputWrapper>
);

export const allowOutOfRange = () => (
  <NumberInputWrapper
    defaultValue={15}
    max={10}
    keepWithinRange={false}
    clampValueOnBlur={false}
  >
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInputWrapper>
);

export const inputSizes = () => (
  <Stack>
    {['xs', 'sm', 'md', 'lg'].map((size) => (
      <NumberInputWrapper key={size} size={size} defaultValue={15} min={10}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInputWrapper>
    ))}
  </Stack>
);

export const WithReactHookForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      sales: 12,
    },
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NumberInputWrapper
        name='sales'
        onBlur={() => {
          console.log('blurred');
        }}
      >
        <NumberInputField ref={register} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInputWrapper>
    </form>
  );
};

function FormError(props: any) {
  return (
    <FormErrorMessage
      mt='0'
      bg='red.500'
      color='white'
      px='1'
      lineHeight='1em'
      borderRadius='sm'
      {...props}
    />
  );
}

export const WithFormControl = () => {
  const [isError, setIsError] = React.useState(false);

  return (
    <Stack align='start'>
      <FormControl id='first-name' isInvalid={isError}>
        <nature.div display='flex' mb='2'>
          <FormLabel mb='0' lineHeight='1em'>
            Amount
          </FormLabel>
          <FormError>is invalid!</FormError>
        </nature.div>
        <NumberInputWrapper
          max={50}
          min={10}
          defaultValue={20}
          onBlur={() => {
            console.log('blurred');
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInputWrapper>
        <FormHelperText>Keep it very short and sweet!</FormHelperText>
      </FormControl>
      <Button onClick={() => setIsError((s) => !s)}>Toggle Invalid</Button>
    </Stack>
  );
};
export const HookUsage = () => {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    step: 0.01,
    defaultValue: 1.53,
    min: 1,
    max: 6,
    precision: 2,
    allowMouseWheel: true,
  });

  return (
    <>
      <div>current: {valueAsNumber}</div>
      <nature.div className='flex'>
        <Button {...getIncrementButtonProps()}>+</Button>
        <Input {...getInputProps()} />
        <Button {...getDecrementButtonProps()}>-</Button>
      </nature.div>
    </>
  );
};

const format = (val: string) => `$${val}`;
const parse = (val: string) => val.replace(/^\$/, '');

export const HookWithFormatAndParse = () => {
  const [value, setValue] = React.useState<string>('1.53');

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    step: 0.01,
    value: format(value),
    min: 1,
    max: 6,
    precision: 2,
    onChange: (valueString) => setValue(parse(valueString)),
  });

  return (
    <>
      <div>current: {valueAsNumber}</div>
      <nature.div className='flex'>
        <Button {...getIncrementButtonProps()}>+</Button>
        <Input {...getInputProps()} />
        <Button {...getDecrementButtonProps()}>-</Button>
      </nature.div>
    </>
  );
};
