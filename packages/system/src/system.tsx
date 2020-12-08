import { As } from '@nature-ui/utils';
import clsx from 'clsx';

import { DOMElements, pseudoProps } from './system-utils';
import { NatureComponent } from './system-types';
import { createComponent } from './create-component';

export const natureComp = <T extends As>(component: T) => {
  return createComponent<T>(component)(pseudoProps);
};

type NatureJSXElements = {
  [Tag in DOMElements]: NatureComponent<Tag, {}>;
};

type CreateNatureComponent = {
  <T extends As, P = {}>(component: T): NatureComponent<T, P>;
};

export const nature = (natureComp as unknown) as CreateNatureComponent &
  NatureJSXElements;

export { clsx };
