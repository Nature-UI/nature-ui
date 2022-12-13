import { Stack } from '@nature-ui/layout';
import React from 'react';
import {
  randomColor,
  randomColorFromList,
  randomColorFromString,
  randomFromList,
} from '../src';

export default {
  title: 'Color',
};

const list = ['#145fd9', '#14d95c', '#9414d9', '#2e14d9', '#d2d914', '#d91452'];

export const Random = () => (
  <Stack row>
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
  <Stack row>
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
    <Stack row>
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
    <Stack row>
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

export const TailwindColors = () => {
  const Box = (p: any) => (
    <div style={{ width: '100px', height: '100px' }} {...p} />
  );

  return (
    <Stack col>
      <Stack row>
        <Box className='bg-blue-50' />
        <Box className='bg-blue-100' />
        <Box className='bg-blue-200' />
        <Box className='bg-blue-300' />
        <Box className='bg-blue-400' />
        <Box className='bg-blue-500' />
        <Box className='bg-blue-600' />
        <Box className='bg-blue-700' />
        <Box className='bg-blue-800' />
        <Box className='bg-blue-900' />
      </Stack>
      <Stack row>
        <Box className='bg-red-50' />
        <Box className='bg-red-100' />
        <Box className='bg-red-200' />
        <Box className='bg-red-300' />
        <Box className='bg-red-400' />
        <Box className='bg-red-500' />
        <Box className='bg-red-600' />
        <Box className='bg-red-700' />
        <Box className='bg-red-800' />
        <Box className='bg-red-900' />
      </Stack>
    </Stack>
  );
};
