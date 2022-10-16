import { Container } from '@nature-ui/container';
import { Stack } from '@nature-ui/layout';
import { Meta } from '@storybook/react';
import { LazyImage } from '../src';

export default {
  title: 'Image/LazyImage',
  component: LazyImage,
} as Meta;

export const Example = () => {
  return (
    <Container size='xs' centered>
      <Stack spacing='8' col className='w-full'>
        <h1 className='title'>Mouth Watering Burgers</h1>
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 1'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 2'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 3'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 4'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1586816001966-79b736744398?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1586816001966-79b736744398?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='Burger 5'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1564362411991-472954b39f56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1564362411991-472954b39f56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 6'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1572448862527-d3c904757de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1572448862527-d3c904757de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 7'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 8'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 1'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 2'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 3'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 4'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1586816001966-79b736744398?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1586816001966-79b736744398?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='Burger 5'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1564362411991-472954b39f56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1564362411991-472954b39f56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 6'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1572448862527-d3c904757de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1572448862527-d3c904757de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 7'
        />
        <LazyImage
          className='w-full h-96 object-cover'
          src='https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          fallbackSrc='https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=10&q=60'
          alt='burger 8'
        />
      </Stack>
    </Container>
  );
};
