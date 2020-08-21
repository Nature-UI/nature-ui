import * as React from 'react';
import { AddIcon } from '../src';
import { Icon } from '@nature-ui/icon';

export default {
  title: 'Icons',
};

export const Add = () => <AddIcon size='sm' color='orange' />;
export const Add2 = () => <Icon as={AddIcon} size='100' color='blue' />;
