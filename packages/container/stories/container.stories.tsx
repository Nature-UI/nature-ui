import * as React from 'react';
import { Container } from '../src';

export default {
  title: 'Container',
  component: Container,
};

export const SizeXL: React.FC = () => {
  return (
    <Container centered className='bg-gray-300' size='xl'>
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

export const Size500: React.FC = () => {
  return (
    <Container className='bg-gray-300' size='300px' centered>
      I love Nature
    </Container>
  );
};
