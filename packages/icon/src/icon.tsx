/** @jsx jsx */
import { jsx, nature, PropsOf, clsx as clx } from '@nature-ui/system';
import * as React from 'react';
import { StringOrNumber, __DEV__ } from '@nature-ui/utils';

const fallbackIcon = {
  path: (
    <g fillRule='evenodd'>
      <circle cx='12' cy='12' fill='currentColor' r='10' />
      <circle cx='12' cy='18' fill='inherit' r='1' />
      <path
        d='M15.89 9.05a3.975 3.975 0 0 0-2.957-2.942C10.321 5.514 8.017 7.446 8 9.95l.005.147a.992.992 0 0 0 .982.904c.552 0 1-.447 1.002-.998a2.004 2.004 0 0 1 4.007-.002c0 1.102-.898 2-2.003 2H12a1 1 0 0 0-1 .987v2.014a1.001 1.001 0 0 0 2.004 0v-.782c0-.217.145-.399.35-.472A3.99 3.99 0 0 0 15.89 9.05'
        fill='inherit'
      />
    </g>
  ),
  viewBox: '0 0 10 10',
};

const sizes = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 36,
};

export interface IconProps {
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: string;
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   */
  size?: keyof typeof sizes | number;
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   */
  viewBox?: string;
  /**
   * Overwrites the width and height of the svg element
   */
  boxSize?: StringOrNumber;
}

const SvgIcon = nature('svg');

export type SvgIconProps = PropsOf<typeof SvgIcon> & IconProps;

export const Icon = React.forwardRef(
  (props: SvgIconProps, ref: React.Ref<any>) => {
    const {
      children,
      className = '',
      size = 'sm',
      role = 'presentation',
      viewBox = '0 0 24 24',
      color = 'currentColor',
      as: type,
      focusable = false,
      boxSize,
      css,
      ...rest
    } = props;

    const DEFAULT_CLASS = clx({
      [className]: className,
    });

    const _width = boxSize ?? (sizes[size] || size);
    const _height = boxSize ?? (sizes[size] || size);

    const sharedProps = {
      className: DEFAULT_CLASS,
      color,
      focusable,
      ref,
      role,
      css: {
        width: _width,
        height: _height,
      },
      width: _width,
      height: _height,
    };

    if (type && typeof type !== 'string') {
      return <SvgIcon as={type} {...sharedProps} {...rest} />;
    }

    const _path = children ?? fallbackIcon.path;
    const _viewBox = viewBox ?? fallbackIcon.viewBox;

    return (
      <SvgIcon viewBox={_viewBox} {...sharedProps} {...rest}>
        {_path}
      </SvgIcon>
    );
  },
);

if (__DEV__) {
  Icon.displayName = 'Icon';
}
