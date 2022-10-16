import { render, screen, testA11y } from '@nature-ui/test-utils';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  AlertWrapper,
} from '../src';

describe('@nature-ui/alert ', () => {
  test('should have no accessibility issue', async () => {
    await testA11y(
      <AlertWrapper>
        <AlertIcon />
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </AlertWrapper>,
    );

    await testA11y(<Alert title='Alert title'>Alert description</Alert>);
  });

  test('should have role="alert"', async () => {
    render(<Alert title='Alert title'>Alert description</Alert>);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('should have role="alert"', () => {
    render(
      <AlertWrapper>
        <AlertIcon />
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </AlertWrapper>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
