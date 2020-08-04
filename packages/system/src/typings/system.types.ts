import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type As = React.ElementType<any>;

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

export type WithAs<P, T extends As> = P &
  Omit<PropsOf<T>, 'as' | keyof P> & {
    as?: T;
  };
