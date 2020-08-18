import * as React from 'react';
import { As, runIfFn, isString } from '@nature-ui/utils';

const createComponent = <T extends As>(component: T) => {
  return (...interpolations: any[]) => {
    const Component = React.forwardRef(
      ({ as, ...props }: any, ref: React.Ref<any>) => {
        interpolations.forEach((interpolation) => {
          runIfFn(interpolation, {});
        });

        const element = as || component;

        const isTag = isString(element);
      }
    );

    Component.displayName = getDisplayName(component);
    Component.defaultProps = (component as any).defaultProps;
  };
};

function styled<T extends As>(component: T) {
  return;
}
