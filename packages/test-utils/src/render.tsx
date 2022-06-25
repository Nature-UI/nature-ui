import '@testing-library/jest-dom/extend-expect';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { userEvent } from './user-event';

expect.extend(toHaveNoViolations);

export interface ChakraRenderOptions extends RenderOptions {
  withChakraProvider?: boolean;
}

export function render(
  ui: React.ReactElement,
  { ...options },
): ReturnType<typeof rtlRender> & { user: ReturnType<typeof userEvent.setup> } {
  const { wrapper: Wrapper = React.Fragment, ...rtlOptions } = options;
  const user = userEvent.setup();

  const result = rtlRender(
    <>
      <Wrapper>{ui}</Wrapper>
    </>,
    rtlOptions,
  );
  return { user, ...result };
}
