import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Stack } from '@nature-ui/layout';

import {
  lighten,
  darken,
  randomColor,
  transparentize,
  blacken,
  whiten,
  randomColorFromString,
  randomColorFromList,
  randomFromList,
} from '../src';

export default {
  decorators: [withKnobs],
  title: 'Color',
};
const list = ['#145fd9', '#14d95c', '#9414d9', '#2e14d9', '#d2d914', '#d91452'];

export const Lighten = () => (
  <Stack direction='row'>
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: lighten('#145fd9', 20) }}
    />
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: whiten('#9414d9', 50) }}
    />
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: lighten('#14d95c', 20) }}
    />
  </Stack>
);

export const Darken = () => (
  <Stack direction='row'>
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: darken('#145fd9', 20) }}
    />
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: darken('#9414d9', 20) }}
    />
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: blacken('#14d95c', 30) }}
    />
  </Stack>
);

export const Random = () => (
  <Stack direction='row'>
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: randomColor() }}
    />
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: randomColor() }}
    />
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: randomColor() }}
    />
  </Stack>
);

export const RandomColorFromString = () => (
  <Stack direction='row'>
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: randomColorFromString('divine') }}
    />
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: randomColorFromString('nature') }}
    />
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: randomColorFromString('divine nature') }}
    />
  </Stack>
);

export const RandomColorFromList = () => {
  return (
    <Stack direction='row'>
      <div
        className='w-8 h-8 rounded-full'
        style={{ backgroundColor: randomColorFromList('a', list) }}
      />
      <div
        className='w-8 h-8 rounded-full'
        style={{ backgroundColor: randomColorFromList('b', list) }}
      />
      <div
        className='w-8 h-8 rounded-full'
        style={{ backgroundColor: randomColorFromList('c', list) }}
      />
    </Stack>
  );
};

export const RandomFromList = () => {
  return (
    <Stack direction='row'>
      <div
        className='w-8 h-8 rounded-full'
        style={{ backgroundColor: randomFromList(list) }}
      />
      <div
        className='w-8 h-8 rounded-full'
        style={{ backgroundColor: randomFromList(list) }}
      />
      <div
        className='w-8 h-8 rounded-full'
        style={{ backgroundColor: randomFromList(list) }}
      />
    </Stack>
  );
};
export const Transparentize = () => (
  <Stack direction='row'>
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: transparentize('#2e14d9', 0.7) }}
    />
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: transparentize('#2e14d9', 0.5) }}
    />
    <div
      className='w-8 h-8 rounded-full'
      style={{ backgroundColor: transparentize('#2e14d9', 0.3) }}
    />
  </Stack>
);
