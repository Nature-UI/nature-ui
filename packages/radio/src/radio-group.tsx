import { clsx, forwardRef, nature, PropsOf } from '@nature-ui/system';
import { createContext, __DEV__ } from '@nature-ui/utils';
import React from 'react';

import {
  useRadioGroup,
  UseRadioGroupProps,
  UseRadioGroupReturn,
} from './use-radio-group';

export type RadioGroupContext = Pick<
  UseRadioGroupReturn,
  'onChange' | 'value' | 'name'
> & {
  size?: 'sm' | 'md' | 'lg' | number;
  darkBg?: string;
  bg?: string;
  borderBg?: string;
  darkBorderBg?: string;
};

const [RadioGroupContextProvider, useRadioGroupContext] =
  createContext<RadioGroupContext>({
    name: 'RadioGroupContext',
    strict: false,
  });

export { useRadioGroupContext };

const DivTag = nature('div');

export type RadioGroupProps = UseRadioGroupProps &
  Omit<PropsOf<typeof DivTag>, 'onChange' | 'value' | 'defaultValue'> & {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | number;
  };

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://nature-ui.com/components/radio
 */
export const RadioGroup = forwardRef(
  (props: RadioGroupProps, ref: React.Ref<any>) => {
    const {
      size = 'md',
      children,
      className,
      darkBg = 'bg-blue-700',
      bg = 'bg-blue-500',
      borderBg = 'border-blue-500',
      darkBorderBg = 'border-blue-700',
      ...hookProps
    } = props;

    const { value, onChange, getRootProps, name, htmlProps } =
      useRadioGroup(hookProps);

    const group = React.useMemo(
      () => ({
        name,
        size,
        onChange,
        darkColor: darkBg,
        color: bg,
        value,
      }),
      [name, size, onChange, darkBg, bg, borderBg, darkBorderBg, value],
    );

    const groupProps = getRootProps({
      ref,
      ...htmlProps,
    });
    const _className = clsx('nature-radio-group', className);

    return (
      <RadioGroupContextProvider value={group}>
        <DivTag {...groupProps} className={_className}>
          {children}
        </DivTag>
      </RadioGroupContextProvider>
    );
  },
);

if (__DEV__) {
  RadioGroup.displayName = 'RadioGroup';
}
