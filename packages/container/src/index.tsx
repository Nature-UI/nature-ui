import * as React from 'react';
import clx from 'clsx';

interface IContainer {
  children?: React.ReactNode;
  /**
   * Determine the max-width of the container.
   */
  size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ComponentType;
  className?: string;
}

const BASE_STYLE = 'mx-auto container';
const LG = 'px-20';
const MD = 'px-32';
const SM = 'px-48';
const XL = 'px-0';
const XS = 'px-64';

const Container: React.ForwardRefExoticComponent<IContainer> = React.forwardRef(
  (props: IContainer, ref: React.Ref<any>) => {
    const {
      component: Component = 'div',
      size = 'lg',
      children,
      className = '',
    } = props;

    const componentClass: string = clx(BASE_STYLE, {
      [LG]: size === 'lg',
      [MD]: size === 'md',
      [SM]: size === 'sm',
      [XL]: size === 'xl',
      [XS]: size === 'xs',
    });

    return (
      <Component className={componentClass} ref={ref}>
        <Component className={className}>{children}</Component>
      </Component>
    );
  }
);

Container.displayName = 'Container';

export default Container;
