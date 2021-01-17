import React from 'react';
import Link from 'next/link';
import { Icon, useUpdateEffect, useDisclosure } from '@nature-ui/core';

import siteConfig from 'configs/site-config';

import { SearchButton } from './algolia-search';
import VersionSwitcher from './VersionSwitcher';
import { Logo } from './Logo';
import { MobileNaveContent, MobileNavButton } from './mobile-nav';
import { DiscordIcon, GithubIcon } from './CustomIcons';

const HeaderContent = () => {
  const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

  const mobileNav = useDisclosure();

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);
  return (
    <div className='fixed top-0 left-0 w-full pb-3 bg-white z-10 border-b'>
      <div className='w-full bg-gradient-line h-2 absolute top-0 left-0' />

      <div className='w-full max-w-4xl px-4 md:mx-auto mt-3'>
        <div className='flex items-center justify-between'>
          <Logo />
          <div className='hidden md:w-4/6 md:flex items-center justify-end'>
            <SearchButton />
            <VersionSwitcher />
            <Link
              aria-label='Go to Nature UI GitHub page'
              href={siteConfig.repo.url}
            >
              <a target='_blank'>
                <Icon
                  className='mr-5 text-gray-50 hover:text-gray-75 transition-colors duration-150'
                  size='lg'
                  as={GithubIcon}
                />
              </a>
            </Link>
            <Link
              aria-label='Go to Nature UI Discord page'
              href={siteConfig.discord.url}
            >
              <a target='_blank'>
                <Icon
                  className='text-gray-50 hover:text-gray-75 transition-colors duration-150'
                  size='lg'
                  as={DiscordIcon}
                />
              </a>
            </Link>
          </div>

          <MobileNavButton
            ref={mobileNavBtnRef}
            aria-label='Open Menu'
            onClick={mobileNav.onOpen}
          />
        </div>
      </div>

      <MobileNaveContent
        isOpen={mobileNav.isOpen}
        onClose={mobileNav.onClose}
      />
    </div>
  );
};

const Header = () => {
  return <HeaderContent />;
};

export default Header;
