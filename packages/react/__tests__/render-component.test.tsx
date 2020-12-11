import * as React from 'react';
import { render } from '@nature-ui/test-utils';

import { Alert } from '../src';

describe('@nature-ui/react', () => {
  test('it should render Alert component', () => {
    const tools = render(
      <Alert alertTitle='Alert title'>Alert description</Alert>,
    );

    expect(tools.asFragment()).toMatchSnapshot();
  });
});
