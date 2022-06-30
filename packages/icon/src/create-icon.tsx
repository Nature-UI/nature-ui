import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

import { Icon, IconProps, SvgIconProps } from './icon';

interface CreateIconOptions {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string;
  /**
   * The `svg` path or group element
   */
  path?: React.ReactElement | React.ReactElement[];
  /**
   * If the has a single path, simply copy the path's `d` attribute
   */
  d?: string;
  /**
   * The display name useful in the dev tools
   */
  displayName?: string;
  /**
   * Default props automatically passed to the component; overwriteable
   */
  defaultProps?: IconProps;
}

export const createIcon = (options: CreateIconOptions) => {
  const {
    viewBox = '0 0 24 24',
    d: pathDefinition,
    displayName,
    defaultProps = {},
  } = options;
  const path = React.Children.toArray(options.path);

  const Comp = React.forwardRef(
    (props: SvgIconProps & IconProps, ref: React.Ref<any>) => {
      return (
        <Icon as='svg' ref={ref} {...defaultProps} viewBox={viewBox} {...props}>
          {path.length ? path : <path d={pathDefinition} fill='currentColor' />}
        </Icon>
      );
    },
  );

  if (__DEV__) {
    Comp.displayName = displayName;
  }

  return Comp;
};
