import { nature, NatureProps } from '@nature-ui/system';
import { scaleFadeConfig, slideFadeConfig } from '@nature-ui/transition';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export interface ModalTransitionProps
  extends Omit<HTMLMotionProps<'section'>, 'color' | 'transition'> {
  preset: 'slideInBottom' | 'slideInRight' | 'scale' | 'none';
}

const transition = {
  slideInButton: {
    ...slideFadeConfig,
    custom: { offsetY: 16, reverse: true },
  },
  slideInRight: {
    ...slideFadeConfig,
    custom: { offsetX: 16, reverse: true },
  },
  scale: {
    ...scaleFadeConfig,
    custom: { initialScale: 0.95, reverse: true },
  },
  none: {},
};

const Motion = nature(motion.section);

export const ModalTransition = React.forwardRef(
  (props: ModalTransitionProps, ref: React.Ref<any>) => {
    const { preset, ...rest } = props;
    const motionProps = transition[preset];
    return <Motion ref={ref} {...(motionProps as NatureProps)} {...rest} />;
  },
);
