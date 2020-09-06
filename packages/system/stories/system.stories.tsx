/** @jsx jsx */
import { nature, jsx } from '../src';

export default {
  title: 'System',
};

const Heading = nature('h1');

const Btn = nature('button');

export const withHeading = () => (
  <div>
    <Heading className='text-2xl font-bold'>Welcome</Heading>
    <Btn className='px-4 py-3 font-bold text-lg border border-black rounded mt-12'>
      Welcome
    </Btn>
  </div>
);

export const Basic = () => (
  <nature.h1 className='text-3xl font-bold'>Hello world</nature.h1>
);
