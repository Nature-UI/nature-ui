import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Button from './button';

export default {
  title: 'Button',
  decorators: [withKnobs],
};

export const primary: React.FC = () => {
  const label = text('Label', 'See now');
  const outlined = boolean('Oultined', false);
  return <Button onClick={action('clicked')} outlined={outlined} label={label} />;
};

export const secondary: React.FC = () => {
  const label = text('Label', 'See now');
  const outlined = boolean('Oultined', true);
  return <Button onClick={action('clicked')} outlined={outlined} label={label} />;
};
