import { CSSObject } from '@emotion/css';
import {
  As,
  Dict,
  isEmptyObject,
  isString,
  isUndefined,
  runIfFn,
} from '@nature-ui/utils';
import hoist from 'hoist-non-react-statics';
import * as React from 'react';
import { jsx } from './jsx';
import { NatureComponent } from './system.types';
import { getDisplayName } from './system.utils';

const formatClassNames = (className: string): string => {
  const withCss = className.split(' ').filter((v) => v.match(/css-\w+/));
  const ArrayClassName = className
    .split(' ')
    .filter((v) => !v.match(/css-\w+/));

  const result = {};
  const required: string[] = [];
  ArrayClassName.forEach((v) => {
    const splitCn = v.split('-');

    if (splitCn.length === 1) {
      required.push(v);
    } else if (isNaN(parseInt(splitCn[1]))) {
      required.push(v);
    } else {
      const firstChar = splitCn[0];
      result[firstChar] = v;
    }
  });

  const cn = `${Object.values(result).join(' ')} ${required.join(
    ' ',
  )} ${withCss?.join(' ')}`;

  return cn;
};
export const createComponent = <T extends As>(component: T) => {
  return (...interpolations: any[]) => {
    const Component = React.forwardRef((_props: any, ref: React.Ref<any>) => {
      const { as, ...props } = _props;
      let computedStyles: CSSObject = {};

      interpolations.forEach((interpolation) => {
        const style = runIfFn(interpolation, { ...props });

        computedStyles = {
          ...computedStyles,
          ...style,
        };
      });

      const element = as || component;

      const isTag = isString(element);

      const computedProps: Dict = isTag ? { ...props } : { ...props };
      if (
        computedProps.className &&
        typeof computedProps.className === 'string' &&
        computedProps.className.length
      ) {
        computedProps.className = formatClassNames(computedProps.className);
      }

      if (isEmptyObject(computedProps.css) || isUndefined(computedProps.css)) {
        delete computedProps.css;
      }

      return jsx(element, {
        ref,
        ...computedProps,
      });
    });

    // Compute the display name of the final component
    Component.displayName = getDisplayName(component);

    Component.defaultProps = (component as any).defaultProps;
    // hoist all non-react statics attached to the `component` prop
    const MainComponent = hoist(Component, component as any);

    return MainComponent as NatureComponent<T>;
  };
};
