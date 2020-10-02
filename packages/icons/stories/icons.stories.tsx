import * as React from 'react';
import { Icon } from '@nature-ui/icon';

import { AddIcon } from '../src';

export default {
  title: 'Icons/Icons',
};

export const Add = () => <AddIcon size={60} color='orange' />;
export const Add2 = () => <Icon as={AddIcon} size='sm' color='blue' />;
