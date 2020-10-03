import * as React from 'react';
import { Meta } from '@storybook/react';

import { Modal, modalStyles } from './modal';
import { SlideFade } from '../src';

export default {
  title: 'Transition/SlideFade',
  component: SlideFade,
} as Meta;

export const Basic = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Click Me</button>
      <SlideFade in={isOpen}>
        {(styles) => (
          <Modal
            style={{
              ...styles,
              transform: styles.transform
                ? `${modalStyles.transform} ${styles.transform}`
                : `${modalStyles.transform}`,
            }}
          />
        )}
      </SlideFade>
    </>
  );
};

export const WithTmeout = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Click Me</button>
      <SlideFade timeout={500} in={isOpen}>
        {(styles) => (
          <Modal
            style={{
              ...styles,
              transform: styles.transform
                ? `${modalStyles.transform} ${styles.transform}`
                : `${modalStyles.transform}`,
            }}
          />
        )}
      </SlideFade>
    </>
  );
};
