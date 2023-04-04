import { css, nature } from '../src';

export default {
  title: 'System',
};

const Heading = nature('h1');

const Btn = nature('button');

export const withHeading1 = () => (
  <div>
    <Heading
      className={css({
        fontSize: '50px',
        color: 'tomato',
      })}
    >
      Welcome
    </Heading>
    <Btn
      css={{
        height: '60px',
        fontSize: '20px',
        minWidth: '400px',
      }}
    >
      Welcome
    </Btn>
  </div>
);

export const withHeading = () => (
  <div>
    <Heading className='text-2xl font-bold'>Welcome</Heading>
    <Btn
      className={`px-4 py-3 font-bold text-lg border border-black rounded mt-12 ${css(
        { border: '1px solid red' },
      )}`}
    >
      Welcome
    </Btn>
  </div>
);

export const Basic = () => (
  <nature.h1
    as='span'
    css={{
      backgroundColor: 'red',
    }}
    className='text-3xl font-bold'
  >
    Hello world
  </nature.h1>
);

export const WithAs = () => (
  <nature.h1
    css={{
      backgroundColor: 'red',
    }}
    className='text-3xl font-bold'
  >
    Hello world
  </nature.h1>
);
