/** @jsx jsx */
import { nature, clsx, jsx, PropsOf } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

const DivTag = nature('div');

export type InputElementProps = PropsOf<typeof DivTag> & {
  placement?: 'left' | 'right';
};

const StyledElement = (props: PropsOf<typeof DivTag>) => {
  const { className = '', ...rest } = props;

  const _className = clsx(`flex items-center justify-center absolute top-0`, {
    [className]: className,
  });

  return <DivTag className={_className} css={{ zIndex: 2 }} {...rest} />;
};

const InputElement = React.forwardRef(
  (props: InputElementProps, ref: React.Ref<any>) => {
    const { placement = 'left', ...rest } = props;

    const placementProp = { [placement]: '0' };

    return <StyledElement ref={ref} {...placementProp} {...rest} />;
  }
);

// @ts-ignore
InputElement.__hidden = 'InputElement';

if (__DEV__) {
  InputElement.displayName = 'InputElement';
}

export const InputLeftElement = React.forwardRef(
  (props: InputElementProps, ref: React.Ref<any>) => {
    const { className, ...rest } = props;
    const _className = clsx('chakra-input__left-element', className);

    return (
      <InputElement
        ref={ref}
        placement='left'
        className={_className}
        {...rest}
      />
    );
  }
);

// @ts-ignore
InputLeftElement.__hidden = 'InputLeftElement';

if (__DEV__) {
  InputLeftElement.displayName = 'InputLeftElement';
}

export const InputRightElement = React.forwardRef(
  (props: InputElementProps, ref: React.Ref<any>) => {
    const { className, ...rest } = props;
    const _className = clsx('chakra-input__right-element', className);

    return (
      <InputElement
        ref={ref}
        placement='right'
        className={_className}
        {...rest}
      />
    );
  }
);

// @ts-ignore
InputRightElement.__hidden = 'InputRightElement';

if (__DEV__) {
  InputRightElement.displayName = 'InputRightElement';
}
