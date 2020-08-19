import * as React from 'react';
import { nature, PropsOf } from '@nature-ui/system';
import clx from 'clsx';

interface IconProps {
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: string;
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'sx';
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   */
  viewBox?: string;
  // children?: React.ReactNode;
  titleAccess?: string;
}

const SvgIcon = nature('svg');

type SvgIconProps = PropsOf<typeof SvgIcon>;

const Icon = React.forwardRef(
  (props: IconProps & SvgIconProps, ref: React.Ref<any>) => {
    const {
      children,
      className = '',
      size,
      role = 'presentation',
      // boxSize = "1rem",
      viewBox = '0 0 24 24',
      color = 'currentColor',
      as: type,
      focusable = false,
      titleAccess,
      ...rest
    } = props;

    const DEFAULT_CLASS = clx({
      [className]: className,
    });

    const sharedProps = {
      className: DEFAULT_CLASS,
      color,
      focusable,
      ref,
      role,
      viewBox,
      size,
    };

    /*
     *className={DEFAULT_CLASS}
     *color={color}
     *focusable='false'
     *ref={ref}
     *role="presentation"
     *viewBox={viewBox}
     *{...rest}
     *as={Component}
     */

    if (type && typeof type !== 'string') {
      return <SvgIcon as={type} {...sharedProps} {...rest} />;
    }

    return (
      <SvgIcon {...sharedProps} {...rest}>
        {children}
        {titleAccess && <title>{titleAccess}</title>}
      </SvgIcon>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
