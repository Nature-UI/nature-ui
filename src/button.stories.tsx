import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import { Button } from './button';

export default {
  decorators: [withKnobs],
  title: 'Button'
};

export const primary: React.FC = () => {
  const label = text('Label', 'See now');
  const outlined = boolean('Oultined', false);

  return <Button label={label} onClick={action('clicked')} outlined={outlined} />;
};

export const secondary: React.FC = () => {
  const label = text('Label', 'See now');
  const outlined = boolean('Oultined', true);

  return <Button label={label} onClick={action('clicked')} outlined={outlined} />;
};
