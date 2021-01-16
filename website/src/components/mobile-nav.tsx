import React from 'react';
import {
  Box,
  Button,
  CloseButton,
  clsx,
  IconButton,
  IconButtonProps,
  Stack,
  useUpdateEffect,
} from '@nature-ui/core';
import { Io, Icon } from '@nature-ui/icons';
import Link from 'next/link';

import { RemoveScroll } from 'react-remove-scroll';

import siteConfig from 'configs/site-config';
import { useRouteChanged } from 'hooks/use-route-change';

import { useRouter } from 'next/router';
import { Logo } from './Logo';
import { GithubIcon } from './CustomIcons';

const NavLink = ({ href, children, ...rest }) => {
  const { pathname } = useRouter();

  const [, group] = href.split('/');
  const isActive = pathname.includes(group);

  return (
    <Link href={href}>
      <Button
        className={clsx('transition-all duration-200', {
          'font-semibold': isActive,
        })}
        color={`${isActive ? 'primary-gradient-button' : 'gray-50'}`}
        variant={`${isActive ? 'solid' : 'outline'}`}
        {...rest}
      >
        {children}
      </Button>
    </Link>
  );
};

interface MobileNavContentProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const MobileNaveContent = (props: MobileNavContentProps) => {
  const { isOpen, onClose } = props;
  const closeBtnRef = React.useRef<HTMLButtonElement>();

  useRouteChanged(onClose);

  useUpdateEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <RemoveScroll forwardProps>
          <Box>
            <Box className='px-4'>
              <Stack direction='row'>
                <Logo />
                <CloseButton
                  ref={closeBtnRef}
                  className='ml-auto '
                  onClick={onClose}
                />
              </Stack>
            </Box>
            <Box className='px-6 mt-6'>
              <Stack direction='row' spacing='1rem'>
                <NavLink href='/docs/getting-started'>Docs</NavLink>
                <NavLink href='/guides/integrations/with-cra'>Guides</NavLink>
                <NavLink href='/team'>Team</NavLink>
              </Stack>
            </Box>
          </Box>
        </RemoveScroll>
      )}
    </>
  );
};

export const MobileNavButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <div className='justify-end flex items-center'>
        <Link
          aria-label='Go to Nature UI GitHub page'
          href={siteConfig.repo.url}
        >
          <a target='_blank'>
            <Icon
              className='text-gray-50 hover:text-gray-75 transition-colors duration-150'
              size='lg'
              as={GithubIcon}
            />
          </a>
        </Link>
        <IconButton
          className='md:hidden text-3xl ml-3'
          ref={ref}
          css={{
            paddingLeft: '5px !important',
            paddingRight: '5px !important',
          }}
          aria-label='Open menu'
          color='gray-800'
          variant='ghost'
          size='sm'
          icon={<Io.IoMenuOutline />}
          {...props}
        />
      </div>
    );
  },
);
