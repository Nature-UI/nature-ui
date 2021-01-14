import React from 'react';
import Link from 'next/link';
import { Box } from '@nature-ui/core';
import { DiGithubBadge } from 'react-icons/di';
import { SearchButton } from './algolia-search';

const HeaderContent = () => {
  return (
    <>
      <div className='w-screen bg-gradient-line h-2' />
      <Box size='xl' className='mx-auto'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <a>
              <div className='flex items-center mr-8'>
                <img src='favicon.png' alt='Nature UI Logo' />
                <h2 className='text-3xl font-bold text-gray-100 w-full'>
                  Nature UI
                </h2>
              </div>
            </a>
          </Link>
          <div className='md:w-4/6 flex items-center justify-end'>
            <SearchButton />
            <DiGithubBadge size='2rem' className='ml-14 mr-2' />
            <DiGithubBadge size='2rem' className='mr-2' />
            <DiGithubBadge size='2rem' className='mr-2' />
          </div>
        </div>
      </Box>
    </>
  );
};

const Header = () => {
  return <HeaderContent />;
};

export default Header;
