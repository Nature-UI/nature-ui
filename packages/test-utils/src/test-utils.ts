import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

export * from '@testing-library/react';

export { act as invoke, renderHook } from '@testing-library/react-hooks';

export type {
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react-hooks';
export { default as userEvent } from '@testing-library/user-event';
export * from 'jest-axe';
export { render };
export const escape = (ui: HTMLElement) =>
  fireEvent.keyDown(ui, { key: 'Escape', keyCode: 27 });
