/** @jsx jsx */
import { nature, jsx } from '../src';

export default {
  title: 'Css',
};

const Heading = nature('h1');

const Btn = nature('button');

export const withHeading1 = () => (
  <div>
    <Heading
      css={{
        fontSize: '50px',
        color: 'tomato',
      }}
      _hover={{ color: 'teal.500' }}
    >
      Welcome
    </Heading>
    <Btn
      css={{
        height: '60px',
        fontSize: '20px',
        minWidth: '400px',
      }}
      _active={{
        backgroundColor: 'tomato',
      }}
    >
      Welcome
    </Btn>
  </div>
);

export const withHeading = () => (
  <div>
    <Heading className='text-2xl font-bold'>Welcome</Heading>
    <Btn className='px-4 py-3 font-bold text-lg border border-black rounded mt-12'>
      Welcome
    </Btn>
  </div>
);

export const Basic = () => (
  <nature.h1
    css={{
      backgroundColor: 'red',
    }}
    className='text-3xl font-bold'
  >
    Hello world
  </nature.h1>
);
