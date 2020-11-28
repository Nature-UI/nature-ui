import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

export { act as invoke, renderHook } from '@testing-library/react-hooks';

export { default as userEvent } from '@testing-library/user-event';
export const escape = (ui: HTMLElement) =>
  fireEvent.keyDown(ui, {
    key: 'Escape',
    keyCode: 27,
  });
