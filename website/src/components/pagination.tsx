/** @jsx jsx */
import { Box, jsx } from '@nature-ui/core';
import { ChevronLeftIcon, ChevronRightIcon } from '@nature-ui/icons';
import NextLink from 'next/link';

export const PaginationLink = (props) => {
  const { label, href, children, className, ...rest } = props;

  return (
    <NextLink href={href} passHref>
      <a
        className={`hover:no-underline flex-1 rounded-md ${className}`}
        {...rest}
      >
        <span className='text-sm px-2'>{label}</span>
        <span className='mt-1 text-lg font-bold text-purple-600 block'>
          {children}
        </span>
      </a>
    </NextLink>
  );
};

export const Pagination = ({ previous, next, ...rest }) => {
  return (
    <Box className='flex justify-between my-16' {...rest}>
      {previous ? (
        <PaginationLink
          className='text-left'
          label='Previous'
          href={previous.path}
          rel='prev'
        >
          <ChevronLeftIcon className='mr-1 inline-block' size='lg' />
          {previous.title}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink
          className='text-right'
          label='Next'
          href={next.path}
          rel='next'
        >
          {next.title}
          <ChevronRightIcon className='ml-1 inline-block' size='lg' />
        </PaginationLink>
      ) : (
        <div />
      )}
    </Box>
  );
};
