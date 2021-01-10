import React from 'react';
import NextLink from 'next/link';

import { ChevronLeftIcon, ChevronRightIcon } from '@nature-ui/icons';

export const PaginationLink = (props) => {
  const { label, href, children, ...rest } = props;

  return (
    <NextLink href={href} passHref>
      <a {...rest}>
        {label}
        {children}
      </a>
    </NextLink>
  );
};

// export const Pagination = ({previous, NextLink, ...rest}) => {
//   return (
//     <
//   )
// }
