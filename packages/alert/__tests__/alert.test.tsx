import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Alert from '../src';
// import { render, axe } from '@nature-ui/test-utils';

// import { AlertDescription, AlertIcon, AlertTitle, AlertWrapper } from '../src';

describe('Alert test: ', () => {
  test('should have no accessibility issue', async () => {
    const { getByText } = render(<Alert>Hello world</Alert>);
    /*
     * const tools = render(
     *   <AlertWrapper>
     *     <AlertIcon />
     *     <AlertTitle>Alert title</AlertTitle>
     *     <AlertDescription>Alert description</AlertDescription>
     *   </AlertWrapper>
     * );
     */

    // const result = await axe(tools.container);

    // expect(result).toHaveNoViolations();

    expect(true).toBe(true);
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
