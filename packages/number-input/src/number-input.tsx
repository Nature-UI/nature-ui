import { useFormControlProps } from '@nature-ui/form-control';
import { Input } from '@nature-ui/input';
import { createContext } from '@nature-ui/react-utils';
import {
  clsx,
  forwardRef,
  HTMLNatureProps,
  nature,
  NatureComponent,
} from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import React from 'react';
import { TriangleDownIcon, TriangleUpIcon } from './icons';
import {
  useNumberInput,
  UseNumberInputProps,
  UseNumberInputReturn,
} from './use-number-input';

interface NumberInputContext extends Omit<UseNumberInputReturn, 'htmlProps'> {}
/**
 * React context used to communicate between components
 */
const [NumberInputProvider, useNumberInputContext] =
  createContext<NumberInputContext>({
    name: 'NumberInputContext',
    errorMessage:
      "useNumberInputContext: `context` is undefined. Seems you forgot to wrap number-input's components withing <NumberInput />",
  });

interface InputOptions {
  /**
   * The border color when the input is focused. Use color keys in `config.colors`
   * @example
   * focusBorderColor = "blue-500"
   */
  focusBorderColor?: string;
  /**
   * The border color when the input is invalid. Use color keys in `config.colors`
   * @example
   * errorBorderColor = "red-500"
   */
  errorBorderColor?: string;
}

export interface NumberInputWrapperProps
  extends UseNumberInputProps,
    UseNumberInputProps,
    InputOptions,
    Omit<NatureComponent<'div'>, keyof UseNumberInputProps> {}

/**
 * NumberInput
 *
 * React component that provides context and logic to all number input
 * sub-components.
 *
 * It renders a `div` by default.
 *
 * @see Docs https://nature-ui.com/numberinput
 */
export const NumberInputWrapper = forwardRef<NumberInputWrapperProps, 'div'>(
  (props, ref) => {
    const controlProps = useFormControlProps(props);

    const { htmlProps, ...context } = useNumberInput(controlProps);
    const ctx = React.useMemo(() => context, [context]);

    return (
      <NumberInputProvider value={ctx}>
        <nature.div
          ref={ref}
          {...htmlProps}
          className={clsx('relative z-0', props.className)}
          css={{
            '&::before': {
              // borderColor:
            },
          }}
        />
      </NumberInputProvider>
    );
  },
);

if (__DEV__) {
  NumberInputWrapper.displayName = 'NumberInput';
}

export interface NumberInputStepperProps extends HTMLNatureProps<'div'> {}

/**
 * NumberInputStepper
 *
 * React component used to group the increment and decrement
 * button spinners.
 *
 * It renders a `div` by default.
 *
 * @see Docs http://nature-ui.com/components/number-input
 */
export const NumberInputStepper = forwardRef<NumberInputStepperProps, 'div'>(
  (props, ref) => {
    return (
      <nature.div
        {...props}
        className={clsx(
          'flex flex-col absolute top-0 m-1 h-full z-10',
          props.className,
        )}
        aria-hidden
        ref={ref}
      />
    );
  },
);

if (__DEV__) {
  NumberInputStepper.displayName = 'NumberInputStepper';
}

export interface NumberInputFieldProps extends HTMLNatureProps<'input'> {}

/**
 * NumberInputField
 *
 * React component that represents the actual `input` field
 * where users can type to edit numeric values.
 *
 * It renders an `input` by default and ensures only numeric
 * values can be typed.
 *
 * @see Docs http://nature-ui.com/numberinput
 */
export const NumberInputField = forwardRef<NumberInputFieldProps, 'input'>(
  (props, ref) => {
    const { getInputProps } = useNumberInputContext();

    const input = getInputProps(props, ref);

    return <Input {...input} />;
  },
);

if (__DEV__) {
  NumberInputField.displayName = 'NumberInputField';
}

export interface NumberDecrementStepperProps extends HTMLNatureProps<'div'> {}

/**
 * NumberDecrementStepper
 *
 * React component used to decrement the number input's value
 *
 * It renders a `div` with `role=button` by default
 */
export const NumberDecrementStepper = forwardRef<
  NumberDecrementStepperProps,
  'div'
>((props, ref) => {
  const { getDecrementButtonProps } = useNumberInputContext();
  const decrement = getDecrementButtonProps(props, ref);

  return (
    <nature.div {...decrement}>
      {props.children ?? <TriangleDownIcon />}
    </nature.div>
  );
});

if (__DEV__) {
  NumberDecrementStepper.displayName = 'NumberIncrementStepper';
}

export interface NumberIncrementStepperProps extends HTMLNatureProps<'div'> {}

/**
 * NumberIncrementStepper
 *
 * React component used to increment the number input's value
 *
 * It renders a `div` with `role=button` by default
 */
export const NumberIncrementStepper = forwardRef<
  NumberIncrementStepperProps,
  'div'
>((props, ref) => {
  const { getIncrementButtonProps } = useNumberInputContext();
  const increment = getIncrementButtonProps(props, ref);

  return (
    <nature.div {...increment}>
      {props.children ?? <TriangleUpIcon />}
    </nature.div>
  );
});

if (__DEV__) {
  NumberIncrementStepper.displayName = 'NumberIncrementStepper';
}

export interface NumberInputProps extends NumberInputWrapperProps {
  inputProps?: NumberInputFieldProps;
  stepperProps?: NumberInputStepperProps;
  incrementStepperProps?: NumberIncrementStepperProps;
  decrementStepperProps?: NumberDecrementStepperProps;
}

export const NumberInput = forwardRef<NumberInputProps, 'input'>(
  (props, ref) => {
    const {
      inputProps,
      stepperProps,
      incrementStepperProps,
      decrementStepperProps,
      ...rest
    } = props;
    return (
      <NumberInputWrapper {...rest}>
        <NumberInputField {...inputProps} ref={ref} />
        <NumberInputStepper {...stepperProps}>
          <NumberIncrementStepper {...incrementStepperProps} />
          <NumberDecrementStepper {...decrementStepperProps} />
        </NumberInputStepper>
      </NumberInputWrapper>
    );
  },
);
