import * as React from 'react';
import { Stack } from '@nature-ui/layout';

import { Avatar, AvatarBadge, AvatarGroup } from '../src';

export default {
  title: 'Avatar',
};

const Avatars = [
  {
    name: 'Dan Abrahmov',
    url: 'https://bit.ly/dan-abramov',
  },
  {
    name: 'Divine Nature',
    url: 'https://tinyurl.com/y4mmkc9v',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: undefined,
    url: undefined,
  },
];

export const Basic = () => (
  <Stack direction='row'>
    {Avatars.map(({ name, url }) => (
      <Avatar
        key={name}
        {...{
          name,
          src: url,
        }}
      />
    ))}
  </Stack>
);

export const DifferentSizes = () => (
  <Stack direction='row'>
    <Avatar size='md' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
    <Avatar
      size='lg'
      name='Christian Nwamba'
      src='https://bit.ly/code-beasts'
    />
    <Avatar size='xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
    <Avatar
      size='2xl'
      name='Divine Nature'
      src='https://tinyurl.com/y4mmkc9v'
    />
  </Stack>
);

export const WithBadge = () => (
  <Stack direction='row'>
    {Avatars.map(({ name, url }) => (
      <Avatar
        size='md'
        {...{
          name,
          src: url,
        }}
        key={name + 1}
      >
        <AvatarBadge size='1.25em' className='bg-green-500' />
      </Avatar>
    ))}
  </Stack>
);

export const avatarGroup = () => (
  <AvatarGroup size='md' max={3}>
    {Avatars.map(({ name, url }) => (
      <Avatar
        size='md'
        {...{
          name,
          src: url,
        }}
        key={name + 1}
      />
    ))}
  </AvatarGroup>
);
