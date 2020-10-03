import * as React from 'react';
import { Meta } from '@storybook/react';

import { Modal, modalStyles } from './modal';
import { Slide } from '../src';

export default {
  title: 'Transition/Slide',
  component: Slide,
} as Meta;

export const Basic = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Slide in={isOpen}>{(styles) => <Modal style={styles} />}</Slide>
      <button
        className='absolute right-0 mr-48'
        onClick={() => setIsOpen((p) => !p)}
      >
        Click Me
      </button>
    </>
  );
};
export const SlideWithPlacement = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Click Me</button>
      <Slide placement='right' in={isOpen}>
        {(styles) => <Modal style={styles} />}
      </Slide>
    </>
  );
};

export const SlideWithTimeout = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Click Me</button>
      <Slide placement='bottom' timeout='500' in={isOpen}>
        {(styles) => <Modal style={styles} />}
      </Slide>
    </>
  );
};
