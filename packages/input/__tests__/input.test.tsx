import { render, screen, testA11y } from '@nature-ui/test-utils';
import { Input } from '../src';

describe('@nature-ui/input', () => {
  test('passes a11y test', async () => {
    await testA11y(<Input />, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    });
  });

  test('Input renders correctly', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder='Hello world' />,
    );

    expect(getByPlaceholderText('Hello world')).toBeInTheDocument();
  });

  test('Input addons render correctly', () => {
    const { getByText } = render(
      <Input addonLeft='https://' addonRight='.com' />,
    );

    expect(getByText('https://')).toBeInTheDocument();
    expect(getByText('.com')).toBeInTheDocument();
  });

  test('Disabled input renders correctly', () => {
    render(<Input isDisabled />);

    expect(screen.getByRole('textbox')).toHaveAttribute('disabled');
  });

  test('Invalid input renders correctly', () => {
    render(<Input isInvalid />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('Readonly input renders correctly', () => {
    render(<Input isReadOnly />);

    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-readonly',
      'true',
    );
  });
});
