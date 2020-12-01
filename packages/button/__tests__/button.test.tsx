import * as React from 'react';
import { render } from '@nature-ui/test-utils';

import { Button } from '../src';

describe('@nature-ui/button', () => {
  test('Button rernders correctly', () => {
    const { asFragment } = render(<Button />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('shows spinner if isLoading', () => {
    const { asFragment, getByText } = render(<Button isLoading>Email</Button>);

    expect(asFragment()).toMatchSnapshot();

    // "Loading..." visually hidden label shown
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('shows spinner and loading text if isLoading and loadingText', () => {
    const { asFragment, queryByText, getByText } = render(
      <Button isLoading loadingText='Submitting'>
        Submit
      </Button>
    );

    expect(asFragment()).toMatchSnapshot();

    // children text is replaced by `loadingText`
    getByText('Submitting');
    expect(queryByText('Submit')).toBeNull();
  });

  test('has the proper aria attributes', () => {
    const { rerender, getByRole } = render(<Button>Hello</Button>);

    // button has role="button"
    const button = getByRole('button');

    expect(button).not.toHaveAttribute('aria-disabled');

    // isLoading sets aria-disabled="true"
    rerender(<Button isLoading>Hello</Button>);
    expect(button).toHaveAttribute('data-loading', '');

    // isDisabled sets aria-disabled="true"
    rerender(<Button isDisabled>Hello</Button>);
    expect(button).toHaveAttribute('disabled', '');
  });
});
