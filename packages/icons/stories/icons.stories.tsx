import * as React from 'react';
import { Icon } from '@nature-ui/icon';
import { withKnobs } from '@storybook/addon-knobs';

import { AddIcon } from '../src';

export default {
  decorators: [withKnobs],
  title: 'Icons',
};

export const Add = () => <AddIcon size={60} color='orange' />;
export const Add2 = () => <Icon as={AddIcon} size='md' color='blue' />;
