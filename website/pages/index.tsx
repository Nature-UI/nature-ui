import React from 'react';
import { Container, Button, Box } from '@nature-ui/core';
import { Io } from '@nature-ui/icons';

import Header from 'components/header';

const Index = () => {
  return (
    <>
      <Header />
      <div className='grid place-items-center w-screen'>
        <Container size='md' className='text-center mt-32 mb-16'>
          <h1 className='text-3xl md:text-6xl font-bold text-gray-1000 leading-normal'>
            Set of Lightview and fully customizable React Components optimized
            for <span className='text-primary-100'>TailwindCss</span>
          </h1>

          <div className='mt-12'>
            <Button
              color='gradient-button'
              size='lg'
              className='w-full mb-4 sm:mb-0 sm:w-auto sm:mr-8 shadow-gradient hover:opacity-80'
            >
              Get started
            </Button>
            <Button
              size='lg'
              color='gray-200'
              text='gray-1000'
              className='w-full sm:w-auto'
            >
              <Io.IoLogoGithub size='1.5rem' className='mr-2' /> Github
            </Button>
          </div>
        </Container>
      </div>
      <Box
        className='bg-center bg-no-repeat -mb-8 bg-cover md:mt-20'
        css={{
          backgroundImage: "url('bg-1.png')",
          height: '216px',
        }}
      />
    </>
  );
};

export default Index;
