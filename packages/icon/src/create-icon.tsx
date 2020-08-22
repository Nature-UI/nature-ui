import * as React from 'react';
import { __DEV__ } from '@nature-ui/utils';

import { Icon, SvgIconProps, IconProps } from './icon';

interface CreateIconOptions extends IconProps {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string;
  /**
   * The `svg` path or group element
   */
  path?: React.ReactElement;
  /**
   * If the has a single path, simply copy the path's `d` attribute
   */
  d?: string;
  /**
   * The display name useful in the dev tools
   */
  displayName?: string;
}

export const createIcon = (options: CreateIconOptions) => {
  const {
    viewBox = '0 0 24 24',
    d: pathDefinition,
    path,
    displayName,
    size = 'md',
  } = options;

  const Comp = React.forwardRef(
    (props: SvgIconProps & IconProps, ref: React.Ref<any>) => {
      return (
        <Icon as='svg' ref={ref} size={size} viewBox={viewBox} {...props}>
          {path ?? <path d={pathDefinition} fill='currentColor' />}
        </Icon>
      );
    }
  );

  if (__DEV__) {
    Comp.displayName = displayName;
  }

  return Comp;
};
