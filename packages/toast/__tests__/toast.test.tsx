import * as React from 'react';
import { render } from '@nature-ui/test-utils';
import { Button } from '@nature-ui/button';

import { useToast } from '../src';

test('Spinner renders correctly', () => {
  const Component = () => {
    const toast = useToast();

    return (
      <Button
        onClick={() =>
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isCloseable: true,
          })
        }
      >
        Show Success Toast
      </Button>
    );
  };

  const { asFragment } = render(<Component />);

  expect(asFragment()).toMatchSnapshot();
});
