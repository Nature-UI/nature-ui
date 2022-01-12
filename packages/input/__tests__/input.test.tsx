import { render } from '@nature-ui/test-utils';
import { Input } from '../src';

describe('@nature-ui/input', () => {
  test('Input renders correctly', () => {
    const { asFragment } = render(<Input />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Input addons render correctly', () => {
    const { asFragment } = render(
      <Input addonLeft='https://' addonRight='.com' />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Elements inside input render correctly', () => {
    const { asFragment } = render(
      <Input addonLeft={<span>Hello</span>} addonRight={<span>Hello</span>} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Invalid input renders correctly', () => {
    const { getByTestId, container } = render(
      <Input isInvalid data-testid='input' />,
    );
    const input = getByTestId('input');
    console.log(container.innerHTML);

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('Disabled input renders correctly', () => {
    const { getByTestId } = render(<Input isDisabled data-testid='input' />);
    const input = getByTestId('input');

    expect(input).toHaveAttribute('disabled');
  });

  test('Readonly input renders correctly', () => {
    const { getByTestId } = render(<Input isReadOnly data-testid='input' />);
    const input = getByTestId('input');

    expect(input).toHaveAttribute('aria-readonly', 'true');
  });
});
