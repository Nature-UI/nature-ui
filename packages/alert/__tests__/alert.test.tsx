import '@testing-library/jest-dom/extend-expect';

import * as React from 'react';
import { render, axe } from '@nature-ui/test-utils';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  AlertWrapper,
} from '../src';

describe('@nature-ui/alert ', () => {
  test('should have no accessibility issue', async () => {
    const tools = render(
      <AlertWrapper>
        <AlertIcon />
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </AlertWrapper>,
    );

    const result = await axe(tools.container);

    expect(result).toHaveNoViolations();
  });

  test('should render correctly', () => {
    const tools = render(
      <AlertWrapper>
        <AlertIcon />
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </AlertWrapper>,
    );

    expect(tools.asFragment()).toMatchSnapshot();
  });

  test('should also have no accessibility issue', async () => {
    const tools = render(
      <Alert alertTitle='Alert title'>Alert description</Alert>,
    );

    const result = await axe(tools.container);

    expect(result).toHaveNoViolations();
  });

  test('should also render correctly', async () => {
    const tools = render(
      <Alert alertTitle='Alert title'>Alert description</Alert>,
    );

    expect(tools.asFragment()).toMatchSnapshot();
  });

  test("should have role='alert'", () => {
    const tools = render(
      <Alert alertTitle='Alert title'>Alert description</Alert>,
    );
    const alert = tools.getByRole('alert');

    expect(alert).toBeInTheDocument();
  });
});
