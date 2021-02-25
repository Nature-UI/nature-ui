import * as React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

const PageTransition = (props: HTMLMotionProps<'main'>) => (
  <motion.main
    initial={{ y: -16, opacity: 0 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
    {...props}
  />
);

export default PageTransition;
