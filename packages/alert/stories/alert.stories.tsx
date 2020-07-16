import React from 'react';
import { withKnobs, text, boolean } from '@nature-ui/utils';

import { Alert } from '../src';

export default {
  title: 'Alert',
  decorators: [withKnobs],
};

export const primary: React.FC = () => {
  return <Alert />;
};

export const secondary: React.FC = () => {
  return <Alert />;
};
