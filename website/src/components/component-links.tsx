import React from 'react';
import { PropsOf, Stack, nature } from '@nature-ui/core';
import { FaNpm, FaGithub } from 'react-icons/fa';
import { El } from './nature-jsx-elements';

type ComponentLinkProps = PropsOf<typeof nature.a> & {
  icon: React.ElementType;
  url: string;
  iconSize?: string;
  iconColor?: string;
};

const ComponentLink = (props: ComponentLinkProps) => {
  const { icon, url, children, iconColor, ...rest } = props;

  return (
    <El.a
      href={url}
      target='_blank'
      className='px-3 items-center border rounded-md text-gray-50 hover:text-gray-1000 focus:-translate-y-1 hover:shadow-sm'
      {...rest}
    />
  );
};
