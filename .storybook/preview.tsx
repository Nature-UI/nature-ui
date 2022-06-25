import React from 'react';
import 'tailwindcss/tailwind.css';

const withNature: React.FC<Function> = (StoryFn) => {
  return (
    <React.StrictMode>
      {/* <ToastProvider> */}
      <div className='min-h-screen'>
        <StoryFn />
      </div>
      {/* </ToastProvider> */}
    </React.StrictMode>
  );
};

export const decorators = [withNature];

export const parameters = {
  controls: {
    expanded: true,
  },
};
