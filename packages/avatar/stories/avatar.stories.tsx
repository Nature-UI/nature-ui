import * as React from 'react';
import { Stack } from '@nature-ui/layout';

import { Ai } from '@nature-ui/icons';
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
  {
    name: 'Divine Nature',
    url: undefined,
  },
];

export const Basic = () => (
  <Stack row>
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
  <Stack row>
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
  <Stack row>
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

    <Avatar>
      <AvatarBadge size='1.6em' className='bg-green-500' />
    </Avatar>

    {/* You can also change the borderColor and bg of the badge */}
    <Avatar>
      <AvatarBadge className='bg-orange-500 border-blue-500' size='1.25em' />
    </Avatar>
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

export const CustomFallbackAvatar = () => (
  <>
    <AvatarGroup spacing='1rem'>
      <Avatar color='red-500' icon={<Ai.AiOutlineUser size='20px' />} />
      <Avatar color='teal-500' className='mb-6' />
    </AvatarGroup>
    <AvatarGroup>
      <Avatar color='red-500' icon={<Ai.AiOutlineUser />} />
      <Avatar color='teal-500' />
    </AvatarGroup>
  </>
);
