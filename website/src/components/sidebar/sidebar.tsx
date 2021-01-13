/** @jsx jsx */
import { Box, BoxProps, nature, Stack, jsx } from '@nature-ui/core';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Routes } from 'utils/get-route-context';
import NextLink from 'next/link';
import _ from 'lodash';
import SidebarCategory from './sidebar-category';
import SidebarLink from './sidebar-link';
import { BlogIcon, DocsIcon, GuidesIcon, TeamIcon } from './sidebar-icons';

export type SidebarContentProps = Routes & {
  pathname?: string;
  contentRef?: any;
};

export function SidebarContent(props: SidebarContentProps) {
  const { routes, pathname, contentRef } = props;
  return (
    <>
      {routes.map((lvl1, idx) => {
        return (
          <React.Fragment key={String(idx)}>
            {lvl1.heading && (
              <nature.h4 className='text-sm font-bold my-5 uppercase text-gray-75'>
                {lvl1.title}
              </nature.h4>
            )}

            {lvl1.routes.map((lvl2, index) => {
              if (!lvl2.routes) {
                return (
                  <SidebarLink
                    className='-ml-3 mt-2'
                    key={lvl2.path}
                    href={lvl2.path}
                  >
                    {lvl2.title}
                  </SidebarLink>
                );
              }

              const selected = pathname.startsWith(lvl2.path);
              const opened = selected || lvl2.open;

              const sortedRoutes = lvl2.sort
                ? _.sortBy(lvl2.routes, (i) => i.title)
                : lvl2.routes;

              return (
                <SidebarCategory
                  contentRef={contentRef}
                  key={String(lvl2.path + index)}
                  title={lvl2.title}
                  selected={selected}
                  opened={opened}
                >
                  <Stack as='ul'>
                    {sortedRoutes.map((lvl3) => (
                      <SidebarLink as='li' key={lvl3.path} href={lvl3.path}>
                        {lvl3.title}
                      </SidebarLink>
                    ))}
                  </Stack>
                </SidebarCategory>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}

const MainNavLink = ({ href, icon, children }) => {
  const { pathname } = useRouter();
  const [, group] = href.split('/');
  // const active = pathname.includes(group);

  return (
    <NextLink href={href} passHref>
      <nature.a
        className='flex items-center text-sm font-semibold transition-colors duration-200 text-gray-100'
        // TODO: Update color and hover state
      >
        <nature.div className='flex items-center justify-center w-6 h-6 bg-primary-100 rounded-sm mr-3'>
          {icon}
        </nature.div>
        {children}
      </nature.a>
    </NextLink>
  );
};

const mainNavLinks = [
  {
    icon: <DocsIcon />,
    href: '/docs/getting-started',
    label: 'Docs',
  },
  {
    icon: <GuidesIcon />,
    href: '/guides/integrations/with-cra',
    label: 'Guides',
  },
  {
    icon: <TeamIcon />,
    href: '/team',
    label: 'Team',
  },
  {
    icon: <BlogIcon />,
    href: '/blog',
    label: 'Blog',
  },
];

const MainNavLinkGroup = (props: BoxProps) => {
  return (
    <Stack
      direction='col'
      as='ul'
      className='items-stretch'
      spacing='4'
      {...props}
    >
      {mainNavLinks.map((item) => (
        <Box as='li' key={item.label}>
          <MainNavLink icon={item.icon} href={item.href}>
            {item.label}
          </MainNavLink>
        </Box>
      ))}
    </Stack>
  );
};

const Sidebar = ({ routes }) => {
  const { pathname } = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={ref}
      as='nav'
      aria-label='Main Navigation'
      pos='sticky'
      top='6.5rem'
      w='280px'
      h='calc(((100vh - 1.5rem) - 64px) - 42px);'
      pr='8'
      pb='8'
      pl='3'
      pt='8'
      overflowY='auto'
      className='sidebar-content'
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <MainNavLinkGroup mb='10' />
      <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
    </Box>
  );
};

export default Sidebar;
