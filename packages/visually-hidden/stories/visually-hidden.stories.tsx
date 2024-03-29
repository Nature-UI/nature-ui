import React from 'react';
import { VisuallyHidden, VisuallyHiddenInput } from '../src';

export default {
  title: 'Visually Hidden',
};

export const hiddenSpan = () => (
  <VisuallyHidden>This is visually hidden</VisuallyHidden>
);

export const hiddenInput = () => (
  <VisuallyHiddenInput
    type='checkbox'
    defaultChecked
    onChange={(e) => console.log(e.target.checked)}
  />
);
