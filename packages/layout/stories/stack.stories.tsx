import * as React from 'react';

import { Button } from '@nature-ui/button';
import { Icon } from '@nature-ui/icon';
import { Di, Io, Md } from '@nature-ui/icons';

import { Stack, Box } from '../src';

export default {
  title: 'Stack',
};

export const Inline = () => (
  <Stack direction='row' spacing='1rem' className='flex-wrap'>
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
  </Stack>
);

export const Column = () => (
  <Stack direction='col'>
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-blue-200 p-4 border border-solid'>
      Hi
    </Box>
    <div className='bg-blue-200 p-4 border border-solid'>
      Hi, I&rsquo;m an ordinary div and a valid element
    </div>
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
    <Box size='50px' className='bg-gray-200 p-4 border border-solid' />
  </Stack>
);

export const WithButtons = () => (
  <Stack direction='row' spacing='1rem'>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
    <Button variant='solid'>Hi world</Button>
  </Stack>
);

export const links = [
  {
    icon: Di.DiGithubBadge,
    label: 'Github',
  },
  {
    icon: Io.IoLogoTwitter,
    label: 'Twitter',
  },
  {
    icon: Io.IoGlobeOutline,
    label: 'Website',
  },
  {
    icon: Io.IoLogoLinkedin,
    label: 'Linkedin',
  },
  {
    icon: Md.MdEmail,
    label: 'Email',
  },
];

export const WithIcons = () => {
  return (
    <Stack direction='row' spacing='1rem'>
      {links.map((link) => (
        <Icon
          as={link.icon}
          size='xl'
          aria-label={link.label}
          key={link.label}
        />
      ))}
    </Stack>
  );
};
