import { render, testA11y } from '@nature-ui/test-utils';
import {
  MdArrowForward as ArrowForwardIcon,
  MdEmail as EmailIcon,
} from 'react-icons/md';
import { Button } from '../src';

describe('@nature-ui/button', () => {
  it('passes a11y test', async () => {
    await testA11y(<Button>test</Button>);
  });

  test('renders with icons', () => {
    const { getByText } = render(
      <>
        <Button leftIcon={<EmailIcon />}>Email</Button>
        <Button rightIcon={<ArrowForwardIcon />}>Arrow Forward</Button>
      </>,
    );
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Arrow Forward')).toBeTruthy();
  });

  test('shows spinner if isLoading', () => {
    const { getByText } = render(<Button isLoading>Email</Button>);

    // "Loading..." visually hidden label shown
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('shows spinner and loading text if isLoading and loadingText', () => {
    const { queryByText, getByText } = render(
      <Button isLoading loadingText='Submitting'>
        Submit
      </Button>,
    );

    // children text is replaced by `loadingText`
    expect(getByText('Submitting')).toBeInTheDocument();
    expect(queryByText('Submit')).toBeNull();
  });

  test('has the proper aria attributes data-loading', () => {
    const { getByRole } = render(<Button isLoading>Hello</Button>);

    // button has role="button"
    const button = getByRole('button');
    // isLoading sets aria-disabled="true"
    expect(button).toHaveAttribute('data-loading', '');
  });

  test('has the proper aria attributes disabled', () => {
    const { getByRole } = render(<Button isDisabled>Hello</Button>);

    // button has role="button"
    const button = getByRole('button');

    expect(button).toHaveAttribute('disabled', '');
  });
});
