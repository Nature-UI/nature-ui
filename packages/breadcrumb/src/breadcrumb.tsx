/** ** */
import { forwardRef, nature, PropsOf, clsx, css } from '@nature-ui/system';
import { getValidChildren, __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

const Span = nature('span');
const Link = nature('a');
const ListItem = nature('li');
const OrderedList = nature('ol');
const Nav = nature('nav');

export type BreadcrumbSeparatorProps = PropsOf<typeof Span> & {
  spacing?: string | number;
};
/**
 * React component that separates each breadcrumb link
 */
export const BreadcrumbSeparator = forwardRef<BreadcrumbSeparatorProps>(
  (props, ref) => {
    const { className = '', spacing, ...rest } = props;

    const STYLES = clsx(
      css`
        margin-left: ${spacing};
        margin-right: ${spacing};
      `,
      {
        [className]: className,
      },
    );

    return <Span className={STYLES} ref={ref} role='presentation' {...rest} />;
  },
);

if (__DEV__) {
  BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
}

interface LinkOptions {
  /**
   * Disables a link when its set to true
   */
  isCurrent?: boolean;
}

export type BreadcrumbLinkProps = PropsOf<typeof Link> & LinkOptions;

/**
 * Breadcrumb link.
 *
 * It renders a `span` when it's the current link. Otherwise,
 * it renders an anchor tag.
 */
export const BreadcrumbLink = forwardRef<BreadcrumbLinkProps>((props, ref) => {
  const { isCurrent, as, className = '', ...rest } = props;

  const sharedProps = {
    ref,
    as,
    ...rest,
  };

  if (isCurrent) {
    return <Span className={className} aria-current='page' {...sharedProps} />;
  }

  const _className = clsx('hover:underline', {
    [className]: { className },
  });

  return <Link className={_className} {...sharedProps} />;
});

if (__DEV__) {
  BreadcrumbLink.displayName = 'BreadcrumbLink';
}

type BreadcrumbItemOptions = BreadcrumbProps & {
  isCurrent?: boolean;
  /**
   * this is only used within the `cloneElement`
   * @private
   */
  isLastChild?: boolean;
};

export type BreadcrumbItemProps = BreadcrumbItemOptions &
  PropsOf<typeof ListItem>;

/**
 * React component used to group a breadcrumb link
 *
 * It renders a `li` element to denote it belongs to an order list of links
 */
export const BreadcrumbItem = forwardRef<BreadcrumbItemProps>((props, ref) => {
  const {
    isCurrent,
    separator,
    isLastChild,
    spacing,
    children,
    className = '',
    ...rest
  } = props;

  const validChildren = getValidChildren(children);

  const clones = validChildren.map((child) => {
    if (child.type === BreadcrumbLink) {
      return React.cloneElement(child as React.ReactElement<any>, {
        isCurrent,
      });
    }

    if (child.type === BreadcrumbSeparator) {
      return React.cloneElement(child as React.ReactElement<any>, {
        spacing,
        children: child.props.children || separator,
      });
    }

    return child;
  });

  return (
    <ListItem ref={ref} {...rest} className={className}>
      {clones}
      {!isLastChild && (
        <BreadcrumbSeparator spacing={spacing}>{separator}</BreadcrumbSeparator>
      )}
    </ListItem>
  );
});

if (__DEV__) {
  BreadcrumbItem.displayName = 'BreadcrumbItem';
}

export interface BreadcrumbOptions {
  children?: React.ReactNode;
  /**
   * The visual separator between each breadcrumb item
   */
  separator?: string | React.ReactElement;
  /**
   * The left and right margin applied to the separator
   */
  spacing?: string | number;
}

export type BreadcrumbProps = PropsOf<typeof Nav> & BreadcrumbOptions;

/**
 * React component used to render a breadcrumb navigation landmark
 *
 * It renders a `nav` element with `aria-label` set to `Breadcrumb`
 *
 */
export const Breadcrumb = forwardRef<BreadcrumbProps>((props, ref) => {
  const {
    children,
    separator = '/',
    className = '',
    spacing = '0.5rem',
    ...rest
  } = props;

  const SPACING = typeof spacing === 'string' ? spacing : `${spacing}px`;

  const validChildren = getValidChildren(children);
  const count = validChildren.length;

  const clones = validChildren.map((child, index) =>
    React.cloneElement(child as React.ReactElement<any>, {
      separator,
      isLastChild: count === index + 1,
      spacing: SPACING,
    }),
  );

  return (
    <Nav ref={ref} aria-label='breadcrumb' className={className} {...rest}>
      <OrderedList className='flex'>{clones}</OrderedList>
    </Nav>
  );
});

if (__DEV__) {
  Breadcrumb.displayName = 'Breadcrumb';
}
