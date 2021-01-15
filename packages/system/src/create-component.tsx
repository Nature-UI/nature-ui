import { As } from '@nature-ui/utils';
import { NatureComponent } from './system-types';

// Todo: A lot of future improvements on my mind TODO:

export const createComponent = <T extends As>(component: T) => {
  return component as NatureComponent<T>;
};
