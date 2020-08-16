import * as React from 'react';
import { render } from '@testing-library/react';

import Alert from '../src';

describe('Alert test: ', () => {
  test('should be in the dom', () => {
    const { getByText } = render(
      <Alert component='div' status='success'>
        Hi world
      </Alert>
    );

    expect(getByText('Hi world')).toBeInTheDocument();
  });
});
