import React from 'react';
import 'tailwindcss/tailwind.css';

const withNature = (StoryFn: Function) => {
  return (
    <div id='story-wrapper' style={{ minHeight: '100vh' }}>
      <StoryFn />
    </div>
  );
};

export const decorators = [withNature];
