import * as React from 'react';
import {
  As,
  Dict,
  isEmptyObject,
  isString,
  isUndefined,
} from '@nature-ui/utils';
import hoist from 'hoist-non-react-statics';

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

      const computedProps: Dict = isTag ? { ...props } : { ...props };
      // const computedProps: Dict = !isTag && { ...props };

      if (isEmptyObject(computedProps.css) || isUndefined(computedProps.css)) {
        delete computedProps.css;
      }

      return jsx(element, {
        ref,
        ...computedProps,
      });
    }
  );

  Component.displayName = getDisplayName(component);
  Component.defaultProps = (component as any).defaultProps;

  // hoist all non-react statics attached to the `component` prop
  const MainComponent = hoist(Component, component as any);

  return MainComponent as NatureComponent<T>;
  // };
};
