import * as React from 'react';
import { Meta } from '@storybook/react';

import { Fade } from '../src';

import { Modal } from './modal';

export default {
  title: 'Transition/Fade',
  component: Fade,
} as Meta;

export const Basic = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Toggle Modal</button>
      <Fade in={isOpen}>{(styles) => <Modal style={styles} />}</Fade>
    </>
  );
};

export const WithTimeout = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Toggle Modal</button>
      <Fade timeout={700} in={isOpen}>
        {(styles) => <Modal style={styles} />}
      </Fade>
    </>
  );
};
