import * as React from 'react';
import {
  As,
  isString,
  Dict,
  isEmptyObject,
  isUndefined,
} from '@nature-ui/utils';

import { jsx } from './jsx';
import { getDisplayName } from './system-utils';
import { NatureComponent } from './system-types';

export const createComponent = <T extends As>(component: T) => {
  // return (...interpolations: any[]) => {
  const Component = React.forwardRef(
    ({ as, ...props }: any, ref: React.Ref<any>) => {
      /*
       * interpolations.forEach((interpolation) => {
       *   runIfFn(interpolation, {});
       * });
       */

      const element = as || component;

      const isTag = isString(element);

      const computedProps: Dict = !isTag && { ...props };

      if (isEmptyObject(computedProps.css) || isUndefined(computedProps.css)) {
        delete computedProps.css;
      }

      return jsx(element, {
        ref,
        ...props,
      });
    }
  );

  Component.displayName = getDisplayName(component);
  Component.defaultProps = (component as any).defaultProps;

  return Component as NatureComponent<T>;
  // };
};

const nature = (createComponent as unknown) as typeof createComponent;

export default nature;
