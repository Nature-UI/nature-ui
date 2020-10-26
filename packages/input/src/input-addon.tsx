/** @jsx jsx */
import { nature, PropsOf, clsx, jsx } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

type Placement = 'left' | 'right';
const DivTag = nature('div');

const placements = {
  left: {
    marginRight: '-1px',
    borderRightRadius: 0,
    borderRightColor: 'transparent',
  },
  right: {
    marginRight: '-1px',
    borderLeftRadius: 0,
    borderLeftColor: 'transparent',
  },
};

/**
 * StyledAddon
 *
 * Wrapper element around the InputAddon component
 */
const StyledAddon = (props: PropsOf<typeof DivTag>) => {
  const { className = '', ...rest } = props;

  const _className = clsx(`flex w-auto items-center whitespace-no-wrap`, {
    [className]: className,
  });

  return (
    <DivTag
      css={{
        flex: '0 0 auto',
      }}
      className={_className}
      {...rest}
    />
  );
};

export type InputAddonProps = PropsOf<typeof StyledAddon> & {
  placement?: Placement;
  value?: string;
};

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */
export const InputAddon = React.forwardRef(
  (props: InputAddonProps, ref: React.Ref<any>) => {
    const { placement = 'left', value, children, ...rest } = props;
    const placementStyles = placements[placement] ?? {};

    return (
      <StyledAddon ref={ref} css={placementStyles} {...rest}>
        {value || children}
      </StyledAddon>
    );
  }
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
    return <InputAddon ref={ref} {...props} />;
  }
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
    return <InputAddon ref={ref} placement='right' {...props} />;
  }
);

if (__DEV__) {
  InputRightAddon.displayName = 'InputRightAddon';
}

// @ts-ignore
InputRightAddon.__hidden = 'InputRightAddon';
