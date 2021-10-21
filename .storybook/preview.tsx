import React from 'react';
import 'tailwindcss/tailwind.css';

const withNature: React.FC<Function> = (StoryFn) => {
  return (
    <div id='story-wrapper' style={{ minHeight: '100vh' }}>
      <StoryFn />
    </div>
  );
};

export const decorators = [withNature];
