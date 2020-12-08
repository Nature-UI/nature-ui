import * as React from 'react';
import { Meta } from '@storybook/react';

import { ScaleFade } from '../src';

import { Modal, modalStyles } from './modal';

export default {
  title: 'Transition/ScaleFade',
  component: ScaleFade,
} as Meta;

export const Basic = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Click Me</button>
      <ScaleFade in={isOpen}>
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
      </ScaleFade>
    </>
  );
};

export const ScaleFadeWithTimeout = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Click Me</button>
      <ScaleFade timeout={500} in={isOpen}>
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
      </ScaleFade>
    </>
  );
};
