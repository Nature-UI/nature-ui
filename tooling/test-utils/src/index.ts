export { act, fireEvent, screen, waitFor } from '@testing-library/react';
export * from './accessibility';
export { blur, focus } from './focus';
export * from './hooks';
export * from './press';
export { render } from './render';
export * from './test-utils';
import { mockImage } from './mock-image';

export const mocks = {
  image: mockImage,
};
