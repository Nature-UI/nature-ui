import React from 'react';
import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  clsx,
  IconButton,
  IconButtonProps,
  Stack,
  useUpdateEffect,
} from '@nature-ui/core';
import { Ai, Icon } from '@nature-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RemoveScroll } from 'react-remove-scroll';
import { AnimatePresence, motion, useElementScroll } from 'framer-motion';

import siteConfig from 'configs/site-config';
import { useRouteChanged } from 'hooks/use-route-change';
import { getRoutes } from 'layouts/mdx';

import { Logo } from './Logo';
import { SidebarContent } from './sidebar/sidebar';
import { GithubIcon } from './CustomIcons';

const NavLink = ({ href, children, ...rest }) => {
  const { pathname } = useRouter();

  const [, group] = href.split('/');
  const isActive = pathname.includes(group);

  return (
    <Link href={href}>
      <Button
        className={clsx('transition-all duration-200', {
          'font-semibold flex-1': isActive,
        })}
        css={{
          flex: '1 1 0%',
        }}
        color={`${isActive ? 'gradient-button' : 'gray-50'}`}
        variant={`${isActive ? 'solid' : 'outline'}`}
        {...rest}
      >
        {children}
      </Button>
    </Link>
  );
};

const ScrollView = (props: BoxProps & { onScroll?: any }) => {
  const { onScroll, ...rest } = props;
  const [y, setY] = React.useState(0);
  const elRef = React.useRef<any>();
  const { scrollY } = useElementScroll(elRef);
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  useUpdateEffect(() => {
    onScroll?.(y > 5);
  }, [y]);

  return (
    <Box
      ref={elRef}
      className='overflow-auto px-6 mb-6 flex-1'
      id='routes'
      {...rest}
    />
  );
};

interface MobileNavContentProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const MobileNaveContent = (props: MobileNavContentProps) => {
  const { isOpen, onClose } = props;
  const closeBtnRef = React.useRef<HTMLButtonElement>();
  const { pathname } = useRouter();

  useRouteChanged(onClose);

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    }
  }, [isOpen]);

  const [shadow, setShadow] = React.useState<string>();

  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Box className='h-screen absolute top-0 left-0 w-full mt-3 bg-white z-10 flex flex-col overflow-auto pb-8'>
              <Box>
                <Box className='px-4'>
                  <Stack direction='row' className='items-center'>
                    <Logo />
                    <CloseButton
                      ref={closeBtnRef}
                      className='ml-auto'
                      onClick={onClose}
                    />
                  </Stack>
                </Box>
                <Box className={`px-6 mt-6 pb-4 shadow-${shadow}`}>
                  <Stack direction='row' spacing='8px'>
                    <NavLink href='/docs/getting-started'>Docs</NavLink>
                    <NavLink href='/guides/integrations/with-cra'>
                      Guides
                    </NavLink>
                    <NavLink href='/team'>Team</NavLink>
                  </Stack>
                </Box>
              </Box>

              <ScrollView
                onScroll={(scrolled) => {
                  setShadow(scrolled ? 'md' : undefined);
                }}
              >
                <SidebarContent
                  pathname={pathname}
                  routes={getRoutes(pathname)}
                />
              </ScrollView>
            </Box>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  );
};

export const MobileNavButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <div className='md:hidden justify-end flex items-center'>
        <Link
          aria-label='Go to Nature UI GitHub page'
          href={siteConfig.repo.url}
        >
          <a target='_blank'>
            <Icon
              className='md:hidden text-gray-50 hover:text-gray-75 transition-colors duration-150'
              size='lg'
              as={GithubIcon}
            />
          </a>
        </Link>
        <IconButton
          className='md:hidden text-xl  ml-3'
          ref={ref}
          css={{
            paddingLeft: '5px !important',
            paddingRight: '5px !important',
          }}
          aria-label='Open menu'
          color='gray-800'
          variant='ghost'
          icon={<Ai.AiOutlineMenu />}
          {...props}
        />
      </div>
    );
  },
);
