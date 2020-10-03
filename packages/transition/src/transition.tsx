import * as React from 'react';
import { __DEV__ } from '@nature-ui/utils';
import CSSTransition from 'react-transition-group/Transition';
import type {
  TransitionProps as TProps,
  TransitionStatus,
} from 'react-transition-group/Transition';

export type BaseProps = Pick<
  TProps,
  | 'in'
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
  | 'onExit'
  | 'onExiting'
  | 'onExited'
  | 'unmountOnExit'
  | 'timeout'
>;

export interface TransitionProps extends BaseProps {
  transition?: string;
  children: (styles: React.CSSProperties) => React.ReactNode;
  styles: TransitionStyles;
}

export type TransitionStyleState = 'init' | 'entered' | 'exiting';

export type TransitionStyles = {
  [K in TransitionStyleState]?: React.CSSProperties;
};

export const Transition = React.forwardRef(
  (props: TransitionProps, ref: React.Ref<any>) => {
    const {
      styles,
      in: inProp,
      timeout = 150,
      transition = `all ${timeout}ms ease-in-out`,
      children,
      ...rest
    } = props;

    const getStyle = (state: TransitionStatus) => ({
      ...styles.init,
      transition,
      ...styles[state],
    });

    return (
      <CSSTransition
        appear
        unmountOnExit
        in={inProp}
        timeout={timeout}
        {...rest}
        ref={ref}
      >
        {(state) => children(getStyle(state))}
      </CSSTransition>
    );
  }
);

if (__DEV__) {
  Transition.displayName = 'Transition';
}
