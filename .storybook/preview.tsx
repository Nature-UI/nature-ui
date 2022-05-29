import { ToastProvider } from '@nature-ui/toast';
import React from 'react';
import 'tailwindcss/tailwind.css';

const withNature: React.FC<Function> = (StoryFn) => {
  return (
    <ToastProvider>
      <StoryFn />
    </ToastProvider>
  );
};

export const decorators = [withNature];

export const parameters = {
  controls: {
    expanded: true,
  },
};
