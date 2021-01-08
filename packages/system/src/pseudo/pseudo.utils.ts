import { Dict, memoizeOne, isObject, isFunction } from '@nature-ui/utils';

import { pseudoSelectors, Pseudos } from './pseudo.selector';

const isPseudoProp = (prop: string): prop is keyof Pseudos =>
  prop in pseudoSelectors;

const getPropName = memoizeOne((prop: string) =>
  isPseudoProp(prop) ? pseudoSelectors[prop] : prop,
);

export const parsePseudo = (props: Dict) => {
  const next: Dict = {};

  Object.keys(props).forEach((prop) => {
    if (prop) {
      const propValue = props[prop];
      const propName = getPropName(prop);

      if (isObject(propValue) && !isFunction(propValue)) {
        next[propName] = parsePseudo(propValue);
      }
      next[propName] = propValue;
    }
  });

  return next;
};
