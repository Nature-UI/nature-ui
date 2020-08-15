import * as React from 'react';

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
}

const Container: React.ForwardRefExoticComponent<IContainer> = React.forwardRef(
  (props: IContainer, ref: React.Ref<any>) => {
    const { component: Component = 'div', size = 'lg', children } = props;

    return (
      <Component data-size={size} ref={ref}>
        {children}
      </Component>
    );
  }
);

export default Container;
