/** @jsx jsx */
import { nature, PropsOf, clsx, jsx } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

type Placement = 'left' | 'right';
const SpanTag = nature('span');

const placements = {
  left: {
    marginRight: '-1px',
    borderRightRadius: 0,
    borderRightColor: 'transparent',
  },
  right: {
    marginLeft: '0px',
    borderLeftRadius: 0,
    borderLeftColor: 'transparent',
  },
};

/**
 * StyledAddon
 *
 * Wrapper element around the InputAddon component
 */
const StyledAddon = (props: PropsOf<typeof SpanTag>) => {
  const { className = '', ...rest } = props;

  const _className = clsx('flex w-auto items-center whitespace-no-wrap', {
    [className]: className,
  });

  return <SpanTag className={_className} {...rest} />;
};

export type InputAddonProps = PropsOf<typeof StyledAddon> & {
  placement?: Placement;
};

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */
export const InputAddon = React.forwardRef(
  (props: InputAddonProps, ref: React.Ref<any>) => {
    const { placement = 'left', children, className = '', ...rest } = props;
    const placementStyles = placements[placement] ?? {};
    // const _isString = typeof children === 'string';
    const _className = clsx(
      className,
      'px-4 bg-gray-100 border border-gray-200',
    );

    return (
      <StyledAddon
        ref={ref}
        css={placementStyles}
        {...rest}
        className={_className}
      >
        {children}
      </StyledAddon>
    );
  },
);

if (__DEV__) {
  InputAddon.displayName = 'InputAddon';
}

/**
 * InputLeftAddon
 *
 * Element to append to the left of an input
 */
export const InputLeftAddon = React.forwardRef(
  (props: InputAddonProps, ref: React.Ref<any>) => {
    const { className = '', ...rest } = props;
    const _className = clsx(className, 'rounded-l');

    return <InputAddon ref={ref} {...rest} className={_className} />;
  },
);

if (__DEV__) {
  InputLeftAddon.displayName = 'InputLeftAddon';
}

// @ts-ignore
InputLeftAddon.__hidden = 'InputLeftAddon';

/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */
export const InputRightAddon = React.forwardRef(
  (props: InputAddonProps, ref: React.Ref<any>) => {
    const { className = '', ...rest } = props;
    const _className = clsx(className, 'rounded-r');

    return (
      <InputAddon
        ref={ref}
        placement='right'
        className={_className}
        {...rest}
      />
    );
  },
);

if (__DEV__) {
  InputRightAddon.displayName = 'InputRightAddon';
}

// @ts-ignore
InputRightAddon.__hidden = 'InputRightAddon';
