/** ** */
import { Box, BoxProps, Stack, clsx, nature } from '@nature-ui/core';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Routes } from 'utils/get-route-context';
import NextLink from 'next/link';
import _ from 'lodash';

import SidebarCategory from './sidebar-category';
import SidebarLink from './sidebar-link';
import { DocsIcon } from './sidebar-icons';

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
              <nature.h4 className='text-sm font-bold my-5 uppercase text-gray-1000'>
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
                  <nature.ul>
                    {sortedRoutes.map((lvl3) => (
                      <SidebarLink
                        as='li'
                        className='mt-2'
                        key={lvl3.path}
                        href={lvl3.path}
                      >
                        {lvl3.title}
                      </SidebarLink>
                    ))}
                  </nature.ul>
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
  const active = pathname.includes(group);

  return (
    <NextLink href={href} passHref>
      <nature.a
        className={clsx(
          'flex items-center text-sm font-bold transition-colors duration-200 text-gray-50 hover:text-gray-75',
          {
            'text-gray-1000': active,
          },
        )}
      >
        <nature.div className='flex items-center justify-center w-6 h-6 bg-primary-700 rounded-md mr-3'>
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
  // {
  //   icon: <GuidesIcon />,
  //   href: '/guides/integrations/with-cra',
  //   label: 'Guides',
  // },
  // {
  //   icon: <TeamIcon />,
  //   href: '/team',
  //   label: 'Team',
  // },
  // {
  //   icon: <BlogIcon />,
  //   href: '/blog',
  //   label: 'Blog',
  // },
];

const MainNavLinkGroup = (props: BoxProps) => {
  return (
    <Stack col className='items-stretch' spacing='1rem' {...props}>
      {mainNavLinks.map((item) => (
        <nature.li className='list-none' key={item.label}>
          <MainNavLink icon={item.icon} href={item.href}>
            {item.label}
          </MainNavLink>
        </nature.li>
      ))}
    </Stack>
  );
};

const Sidebar = ({ routes }) => {
  const { pathname } = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Box
        ref={ref}
        as='nav'
        aria-label='Main Navigation'
        css={{
          height: 'calc(((100vh - 1.5rem) - 64px) - 42px);',
        }}
        className='sticky top-28 w-72 pr-8 pb-8 pl-3 pt-8 flex-shrink-0 hidden md:block overflow-y-auto'
      >
        <MainNavLinkGroup className='mb-10' />
        <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
      </Box>
    </>
  );
};

export default Sidebar;
