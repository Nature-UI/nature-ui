import { nature, PropsOf } from '@nature-ui/system';
import { SafeMerge } from '@nature-ui/utils';
import React from 'react';

import { useClickable, UseClickableProps } from '../src';

export type ClickableProps = SafeMerge<
  UseClickableProps,
  PropsOf<typeof nature.button>
>;

const Clickable = React.forwardRef(
  (props: ClickableProps, ref: React.Ref<any>) => {
    const clickable = useClickable({
      ...props,
      ref,
    });

    // console.log({ clickable });

    if (typeof props.children === 'function') {
      return (
        <button className='inline-flex' {...clickable}>
          {props.children(clickable)}
        </button>
      );
    }

    return <button className='inline-flex' {...clickable} />;
  },
);

export default {
  title: 'Clickable',
  component: useClickable,
};

export const button = () => (
  <>
    <Clickable
      as='div'
      onClick={() => {
        alert('clicked');
      }}
      /*
       * _active={{ bg: "blue.500", color: "white" }}
       * _disabled={{ opacity: 0.4, pointerEvents: "none" }}
       */
    >
      {({ disabled, 'aria-disabled': Disabled }: ClickableProps) => {
        return (
          <span
            style={{
              opacity: disabled || Disabled ? 0.5 : 1,
            }}
          >
            Clickable
          </span>
        );
      }}
    </Clickable>

    <Clickable
      isDisabled
      isFocusable
      // _disabled={{ opacity: 0.4, pointerEvents: "none" }}
    >
      {({ disabled, 'aria-disabled': Disabled }: ClickableProps) => {
        return (
          <span
            style={{
              opacity: disabled || Disabled ? 0.5 : 1,
              pointerEvents: disabled || Disabled ? 'none' : 'initial',
            }}
          >
            Clickable
          </span>
        );
      }}
    </Clickable>

    <button
      onClick={() => {
        alert('clicked');
      }}
    >
      Native Button
    </button>
  </>
);
