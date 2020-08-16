import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Alert from '../src';

describe('Alert test: ', () => {
  it('should be in the dom', () => {
    render(
      <Alert component='div' status='success'>
        Hi world
      </Alert>
    );

    expect(screen.getByRole('div')).toHaveTextContent('Hi world');
  });
});
