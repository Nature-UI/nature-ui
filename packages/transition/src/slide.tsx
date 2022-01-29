import { clsx } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  MotionStyle,
  Variants as _Variants,
} from 'framer-motion';
import React from 'react';
import {
  SlideDirection,
  slideTransition,
  TransitionEasings,
  Variants,
  withDelay,
  WithTransitionConfig,
} from './transition-utiils';

export type { SlideDirection };

const defaultTransition = {
  exit: { duration: 0.15, ease: TransitionEasings.easeInOut },
  enter: {
    tyepe: 'spring',
    damping: 25,
    stiffness: 180,
  },
};

export interface SlideOptions {
  /**
   * The direction to slide from
   * @default "right"
   */
  direction?: SlideDirection;
}
const variants: Variants<SlideOptions> = {
  exit: ({ direction, transition, transitionEnd, delay }) => {
    const { exit: exitStyles } = slideTransition({ direction });

    return {
      ...exitStyles,
      transition:
        transition?.exit ?? withDelay.exit(defaultTransition.exit, delay),
      transitionEnd: transitionEnd?.exit,
    };
  },
  enter: ({ direction, transitionEnd, transition, delay }) => {
    const { enter: enterStyles } = slideTransition({ direction });

    return {
      ...enterStyles,
      transition:
        transition?.enter ?? withDelay.enter(defaultTransition.enter, delay),
      transitionEnd: transitionEnd?.enter,
    };
  },
};

export interface SlideProps
  extends WithTransitionConfig<HTMLMotionProps<'div'>>,
    SlideOptions {}

export const Slide = React.forwardRef<HTMLDivElement, SlideProps>(
  (props, ref) => {
    const {
      direction = 'right',
      style,
      unmountOnExit,
      in: isOpen,
      className,
      transition,
      transitionEnd,
      delay,
      ...rest
    } = props;

    const transitionStyles = slideTransition({ direction });
    const computedStyle: MotionStyle = Object.assign(
      { position: 'fixed' },
      transitionStyles.position,
      style,
    );

    const show = unmountOnExit ? isOpen && unmountOnExit : true;
    const animate = isOpen || unmountOnExit ? 'enter' : 'exit';

    const custom = { transitionEnd, transition, direction, delay };

    return (
      <AnimatePresence custom={custom}>
        {show && (
          <motion.div
            ref={ref}
            initial='exit'
            className={clsx('', className)}
            animate={animate}
            exit='exit'
            custom={custom}
            variants={variants as _Variants}
            style={computedStyle}
            {...rest}
          />
        )}
      </AnimatePresence>
    );
  },
);

if (__DEV__) {
  Slide.displayName = 'Slid';
}
