import React from 'react';
import 'tailwindcss/tailwind.css';

const withNature: React.FC<Function> = (StoryFn) => {
  return (
    <div id='story-wrapper'>
      <StoryFn />
    </div>
  );
};

export const decorators = [withNature];

export const parameters = {
  controls: {
    expanded: true,
  },
};
