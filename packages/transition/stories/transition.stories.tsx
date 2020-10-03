import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Modal } from './modal';
import { Fade, FadeProps } from '../src';

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
      <Fade timeout={500} in={isOpen}>
        {(styles) => <Modal style={styles} />}
      </Fade>
    </>
  );
};
