import { As } from '@nature-ui/utils';

import { DOMElements } from './system-utils';
import { NatureComponent } from './system-types';
import { createComponent } from './create-component';

export const natureComp = <T extends As>(component: T) => {
  return createComponent<T>(component);
};

type NatureJSXElements = {
  [Tag in DOMElements]: NatureComponent<Tag, {}>;
};

type CreateNatureComponent = {
  <T extends As, P = {}>(component: T): NatureComponent<T, P>;
};

export const nature = (natureComp as unknown) as CreateNatureComponent &
  NatureJSXElements;
