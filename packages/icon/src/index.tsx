import * as React from 'react';
import clx from 'clsx';

type MergeElementProps<T extends React.ElementType, P extends object = {}> = Omit<
  React.ComponentPropsWithRef<T>,
  keyof P
> &
  P;

type IconProps<T extends React.ElementType = 'svg'> = {
  className?: string;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: string;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
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
  children?: React.ReactNode;
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: string;
};

const Icon = React.forwardRef((props: MergeElementProps<'svg', IconProps>, ref: React.Ref<any>) => {
  const {
    children,
    className = '',
    // size = 'md',
    component: Component = 'svg',
    viewBox = '0 0 24 24',
    titleAccess,
    color = '',
    ...rest
  } = props;

  const DEFAULT_CLASS = clx({
    [className]: className,
  });

  return (
    <Component
      aria-hidden={!titleAccess && true}
      className={DEFAULT_CLASS}
      color={color}
      focusable='false'
      ref={ref}
      role={titleAccess && 'img'}
      viewBox={viewBox}
      {...rest}
    >
      {children}
      {titleAccess && <title>{titleAccess}</title>}
    </Component>
  );
});

Icon.displayName = 'Icon';

export default Icon;
