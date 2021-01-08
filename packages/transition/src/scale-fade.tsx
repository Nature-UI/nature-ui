import * as React from 'react';
import { StringOrNumber, __DEV__ } from '@nature-ui/utils';

import { Transition, TransitionProps } from './transition';

const getTransitionStyles = (initialScale: number) => ({
  init: {
    opacity: 0,
    transform: `scale(${initialScale})`,
  },
  entered: {
    opacity: 1,
    transform: 'scale(1)',
  },
  exiting: {
    opacity: 0,
    transform: `scale(${initialScale})`,
  },
});

export type ScaleFadeProps = Omit<TransitionProps, 'styles' | 'timeout'> & {
  /**
   * The initial scale to animate from
   */
  initialScale?: StringOrNumber;
  /**
   * The transition timeout
   */
  timeout?: StringOrNumber;
};

export const ScaleFade = (props: ScaleFadeProps) => {
  const { initialScale = 0.9, timeout = 150, ...rest } = props;
  const styles = getTransitionStyles(Number(initialScale));

  console.log({ styles, initialScale, timeout });

  return (
    <Transition
      styles={styles}
      transition={`all ${timeout}ms cubic-bezier(0.45, 0, 0.40, 1)`}
      timeout={{ enter: 0, exit: Number(timeout) }}
      unmountOnExit
      {...rest}
    />
  );
};

if (__DEV__) {
  ScaleFade.displayName = 'ScaleFade';
}
