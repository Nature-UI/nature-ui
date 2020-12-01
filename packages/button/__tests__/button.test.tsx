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
    getByText('Loading...');
  });
});
