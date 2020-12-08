import * as React from 'react';
import { render } from '@nature-ui/test-utils';

import { CloseButton } from '../src';

describe('@nature-ui/close-button', () => {
  test('CloseButton renders correctly', () => {
    const { asFragment } = render(<CloseButton />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('has the proper aria attributes', () => {
    const { getByLabelText } = render(<CloseButton />);

    expect(getByLabelText('Close')).toBeInTheDocument();
  });
});
