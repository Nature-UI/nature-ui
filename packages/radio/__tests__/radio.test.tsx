import * as React from 'react';
import { render } from '@nature-ui/test-utils';

import { Radio, useRadio, UseRadioProps } from '../src';

describe('@nature-ui/radio', () => {
  test('Radio renders correctly', () => {
    const { asFragment } = render(<Radio size='lg' color='blue-500' />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('has proper aria and data attributes', async () => {
    const Component = (props: UseRadioProps = {}) => {
      const { getCheckboxProps, getInputProps } = useRadio(props);

      return (
        <label>
          <input data-testid='input' {...getInputProps()} />
          <div data-testid='checkbox' {...getCheckboxProps()} />
        </label>
      );
    };
    const utils = render(<Component name='name' value='' id='id' />);
    const input = utils.getByTestId('input');
    const checkbox = utils.getByTestId('checkbox');

    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('id', 'id');
    expect(input).toHaveAttribute('value', '');
    expect(input).not.toBeDisabled();
    expect(input).not.toHaveAttribute('aria-required');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).not.toHaveAttribute('aria-disabled');
    expect(checkbox).toHaveAttribute('aria-hidden', 'true');
    expect(checkbox).not.toHaveAttribute('data-active');
    expect(checkbox).not.toHaveAttribute('data-hover');
    expect(checkbox).not.toHaveAttribute('data-checked');
    expect(checkbox).not.toHaveAttribute('data-focus');
    expect(checkbox).not.toHaveAttribute('data-readonly');

    // render with various flags enabled
    utils.rerender(<Component isDisabled isInvalid isReadOnly isRequired />);

    expect(input).toHaveAttribute('aria-required');
    expect(input).toHaveAttribute('aria-invalid');
    expect(input).toHaveAttribute('aria-disabled');
    expect(input).toBeDisabled();
    expect(checkbox).toHaveAttribute('data-readonly');

    // input is not truly disabled if focusable
    utils.rerender(<Component isDisabled isFocusable />);
    expect(input).not.toBeDisabled();
  });
});
