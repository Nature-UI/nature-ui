import React from 'react';
import { clsx, PropsOf, nature } from '@nature-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const StyledLink = React.forwardRef(function StyledLink(
  props: PropsOf<typeof nature.a> & { isActive?: boolean },
  ref: React.Ref<any>,
) {
  const { isActive, ...rest } = props;

  return (
    <nature.a
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'text-gray-75 font-medium w-full text-sm transition-all duration-200 px-3 py-1 rounded-md bg-opacity-50',
        {
          'bg-primary-200 text-primary-700': isActive,
        },
      )}
      rounded='md'
      ref={ref}
      {...rest}
    />
  );
});

type SidebarLinkProps = PropsOf<typeof nature.div> & {
  href?: string;
  icon?: React.ReactElement;
};

const SidebarLink = (props: SidebarLinkProps) => {
  const { href, icon, children, className, ...rest } = props;

  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <nature.div
      className={`select-none flex items-center leading-6 ${className}`}
      {...rest}
    >
      <NextLink href={href} passHref>
        <StyledLink isActive={isActive}>{children}</StyledLink>
      </NextLink>
    </nature.div>
  );
};

export default SidebarLink;
