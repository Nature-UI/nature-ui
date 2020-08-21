import * as React from 'react';
import Icon, { SvgIconProps, IconProps } from '.';
import { __DEV__ } from '@nature-ui/utils';

interface CreateIconOptions {
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
  } = options;

  const Comp = React.forwardRef(
    (props: SvgIconProps & IconProps, ref: React.Ref<any>) => {
      const { size = 'sm', ...rest } = props;
      return (
        <Icon ref={ref} as='svg' size={size} viewBox={viewBox} {...rest}>
          {path ?? <path fill='currentColor' d={pathDefinition} />}
        </Icon>
      );
    }
  );

  if (__DEV__) {
    Comp.displayName = displayName;
  }

  return Comp;
};
