import Link from 'next/link';
import React from 'react';

export const Logo = () => {
  return (
    <Link href='/'>
      <a>
        <div className='flex items-center mr-8'>
          <img src='favicon-2.png' alt='Nature UI Logo' />
          <h2 className='text-xl font-bold text-gray-1000 w-full'>Nature UI</h2>
        </div>
      </a>
    </Link>
  );
};
