import * as React from 'react';
import { StringOrNumber, __DEV__ } from '@nature-ui/utils';

import { Transition, TransitionProps, TransitionStyles } from './transition';

export type FadeProps = Omit<TransitionProps, 'styles' | 'timeout'> & {
  timeout?: StringOrNumber;
};

const styles: TransitionStyles = {
  init: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
};

export const Fade = (props: FadeProps) => {
  const { timeout = 150, ...rest } = props;

  return (
    <Transition
      transition={`all ${timeout}ms cubic-bezier(0.175, 0.885, 0.320, 1.175)`}
      styles={styles}
      timeout={{ enter: 0, exit: Number(timeout) }}
      {...rest}
    />
  );
};

if (__DEV__) {
  Fade.displayName = 'Fade';
}
