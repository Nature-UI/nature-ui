/** @jsx jsx */
import { forwardRef, nature, PropsOf, jsx, clsx } from '@nature-ui/system';
import { getValidChildren, __DEV__ } from '@nature-ui/utils';

export type BreadcrumbSeparatorProps = PropsOf<typeof nature.div>;

/**
 * React component that separates each breadcrumb link
 */
export const BreadcrumbSeparator = forwardRef<BreadcrumbSeparatorProps>(
  (props, ref) => {
    const { className = '', ...rest } = props;

    const STYLES = clsx(`mx-1`, {
      [className]: className,
    });

    return (
      <nature.span className={STYLES} ref={ref} role='presentation' {...rest} />
    );
  }
);

if (__DEV__) {
  BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
}

interface LinkOptions {
  /**
   * Disables a link when its set to true
   */
  isCurrentPage?: boolean;
}

export type BreadcrumbLinkProps = PropsOf<typeof nature.a> & LinkOptions;

/**
 * Breadcrumb link.
 *
 * It renders a `span` when it's the current link. Otherwise,
 * it renders an anchor tag.
 */
export const BreadcrumbLink = forwardRef<BreadcrumbLinkProps>((props, ref) => {
  const { isCurrentPage, as, className, ...rest } = props;

  const sharedProps = {
    ref,
    as,
    className,
    ...rest,
  };

  if (isCurrentPage) {
    return <nature.span aria-current='page' {...sharedProps} />;
  }

  return <nature.a {...sharedProps} />;
});

if (__DEV__) {
  BreadcrumbLink.displayName = 'BreadcrumbLink';
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
}

export type BreadcrumbProps = PropsOf<typeof nature.nav> & BreadcrumbOptions;

/**
 * React component used to render a breadcrumb navigation landmark
 *
 * It renders a `nav` element with `aria-label` set to `Breadcrumb`
 *
 */
export const Breadcrumb = forwardRef<BreadcrumbProps>((props, ref) => {
  const { children, separator = '/', className, ...rest } = props;

  const validChildren = getValidChildren(children);
  const count = validChildren.length;

  const clones = validChildren.map((child, index) =>
    React.cloneElement(child as React.ElementType<any>, {})
  );
});
