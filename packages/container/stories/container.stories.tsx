import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Container from '../src';

export default {
  decorators: [withKnobs],
  title: 'Container',
};

export const SizeXL: React.FC = () => {
  return (
    <Container className='bg-gray-300' size='xl'>
      I love Nature
    </Container>
  );
};

export const SizeLG: React.FC = () => {
  return (
    <Container className='bg-gray-300' size='lg'>
      I love Nature
    </Container>
  );
};

export const SizeMD: React.FC = () => {
  return (
    <Container className='bg-gray-300' size='md'>
      I love Nature
    </Container>
  );
};

export const SizeSM: React.FC = () => {
  return (
    <Container className='bg-gray-300' size='sm'>
      I love Nature
    </Container>
  );
};

export const SizeXS: React.FC = () => {
  return (
    <Container className='bg-gray-300' size='xs'>
      I love Nature
    </Container>
  );
};
