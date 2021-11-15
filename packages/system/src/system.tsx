import { As } from '@nature-ui/utils';
import clsx from 'clsx';
import { createComponent } from './create-component';
import { NatureComponent, PropsOf } from './system.types';
import { DOMElements, domElements } from './system.utils';

export const natureComp = <T extends As>(component: T) => {
  return createComponent<T>(component)();
};

type NatureJSXElements = {
  [Tag in DOMElements]: NatureComponent<Tag, {}>;
};

export type HTMLNatureProps<T extends As> = Omit<
  PropsOf<T>,
  T extends 'svg' ? 'ref' | 'children' : 'ref'
> & { as?: As };

type CreateNatureComponent = {
  <T extends As, P = {}>(component: T): NatureComponent<T, P>;
};

export const nature = natureComp as unknown as CreateNatureComponent &
  NatureJSXElements;

domElements.forEach((tag) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  nature[tag] = nature(tag);
});

export { clsx };
