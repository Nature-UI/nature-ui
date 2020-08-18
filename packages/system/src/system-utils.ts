import * as React from 'react';
import { isString, __DEV__ } from '@nature-ui/utils';

import { ForwardRefComponent } from './system-types';

export const isTag = (target: any) => {
  return isString(target) && __DEV__
    ? target.charAt(0) === target.charAt(0).toLowerCase()
    : true;
};

export const getComponentName = (primitive: React.ComponentType | string) => {
  return (
    (__DEV__ ? isString(primitive) && primitive : false) ||
    (!isString(primitive) && primitive.displayName) ||
    (!isString(primitive) && primitive.name) ||
    'NatureComponent'
  );
};

export const getDisplayName = (primitive: any) => {
  return isTag(primitive) ? `nature.${primitive}` : getComponentName(primitive);
};

export const forwardRef = <P>(
  comp: (props: P, ref: React.Ref<any>) => React.ElementType | null
) => {
  return (React.forwardRef(comp as any) as unknown) as ForwardRefComponent<P>;
};
