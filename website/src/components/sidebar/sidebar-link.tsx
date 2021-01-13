/** @jsx jsx */
import { nature, PropsOf, jsx } from '@nature-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const StyledLink = React.forwardRef(function StyledLink(
  props: PropsOf<typeof nature.a> & { isActive?: boolean },
  ref: React.Ref<any>,
) {
  const { isActive, ...rest } = props;

  return (
    <nature.a
      aria-current={isActive ? 'page' : undefined}
      className='text-gray-75 w-full font-semibold text-sm transition-all duration-200 px-3 py-1 rounded-md'
      rounded='md'
      ref={ref}
      // TODO: Active
      {...rest}
    />
  );
});

type SidebarLinkProps = PropsOf<typeof nature.div> & {
  href?: string;
  icon?: React.ReactElement;
};

const SidebarLink = (props: SidebarLinkProps) => {
  const { href, icon, children, ...rest } = props;

  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <nature.div className='select-none flex items-center leading-6' {...rest}>
      <NextLink href={href} passHref>
        <StyledLink isActive={isActive}>{children}</StyledLink>
      </NextLink>
    </nature.div>
  );
};

export default SidebarLink;
