import { useDisclosure } from '@nature-ui/hooks';
import { motion, Variants } from 'framer-motion';
import { usePopper } from '../src';

export default {
  title: 'Popper',
  component: usePopper,
};

export const Basic = () => {
  const { isOpen, onToggle } = useDisclosure();

  const { referenceRef, popperRef } = usePopper({
    placement: 'bottom-start',
    matchWidth: true,
  });

  return (
    <>
      <button ref={referenceRef} style={{ margin: 400 }} onClick={onToggle}>
        Reference Tooltip Trigger
      </button>

      {isOpen && (
        <div
          ref={popperRef}
          className='bg-red-500 w-[250px] p-[15px] rounded-[6px]'
          data-popper-arrow-styles='bg-red-500'
          style={{
            ['--popper-arrow-bg' as string]: 'red',
            borderRadius: 6,
          }}
        >
          Popper
          <div data-popper-arrow=''>
            <div data-popper-arrow-inner='' className='bg-red-500' />
          </div>
        </div>
      )}
    </>
  );
};

export const WithTransition = () => {
  const { isOpen, onToggle } = useDisclosure();

  const { referenceRef, popperRef } = usePopper({
    placement: 'bottom-start',
  });

  const slide: Variants = {
    exit: { y: -2, opacity: 0 },
    enter: { y: 0, opacity: 1 },
  };

  return (
    <>
      <button ref={referenceRef} onClick={onToggle}>
        Toggle
      </button>
      <div ref={popperRef} style={{ ['--popper-arrow-bg' as string]: 'red' }}>
        <motion.div
          transition={{
            duration: 0.15,
            easings: 'easeInOut',
          }}
          variants={slide}
          initial={false}
          animate={isOpen ? 'enter' : 'exit'}
          className='bg-red-500 w-[200px] rounded-[4px]'
          style={{
            transformOrigin: 'var(--popper-transform-origin)',
          }}
        >
          Testing
          <div data-popper-arrow=''>
            <div data-popper-arrow-inner='' />
            <div data-popper-arrow-inner='' className='bg-red-500' />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export const WithMatchWidth = () => {
  const { onToggle } = useDisclosure();

  const { getPopperProps, getReferenceProps } = usePopper({
    placement: 'bottom-start',
    matchWidth: true,
  });

  const popperProps = getPopperProps();

  return (
    <>
      <button
        {...getReferenceProps()}
        onClick={onToggle}
        style={{ width: '400px', margin: 400 }}
      >
        Toggle
      </button>
      <div
        {...popperProps}
        style={{
          ...popperProps,
          background: 'red',
        }}
      >
        <div style={{ width: '100%' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </div>
      </div>
    </>
  );
};
