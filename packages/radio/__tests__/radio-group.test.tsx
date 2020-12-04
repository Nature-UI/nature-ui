import * as React from 'react';
import { render } from '@nature-ui/test-utils';
import { useRadioGroup, Radio, UseRadioGroupProps } from '../src';

describe('@nature-ui/radio', () => {
  test('RadioGroup renders correctly', () => {
    const Component = () => {
      const { getRootProps, getRadioProps } = useRadioGroup({ isNative: true });

      return (
        <div {...getRootProps()}>
          <label>
            <input type='radio' {...getRadioProps({ value: 'a' })} />
            <span>a</span>
          </label>
          <label>
            <input type='radio' {...getRadioProps({ value: 'b' })} />
            <span>b</span>
          </label>
        </div>
      );
    };
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('works with Radio component', () => {
    const Component = (props: UseRadioGroupProps = {}) => {
      const { getRootProps, getRadioProps } = useRadioGroup(props);

      return (
        <div {...getRootProps()}>
          <Radio {...getRadioProps({ value: 'a' })}>a</Radio>
          <Radio {...getRadioProps({ value: 'b' })}>b</Radio>
        </div>
      );
    };
    const utils = render(<Component defaultValue='a' />);

    expect(utils.getByLabelText('a')).toBeChecked();
  });
});
