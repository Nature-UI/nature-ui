import * as React from 'react';
import { PropsOf, forwardRef, nature, clsx } from '@nature-ui/system';
import { createContext, __DEV__ } from '@nature-ui/utils';

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
  color?: string;
};

const [
  RadioGroupContextProvider,
  useRadioGroupContext,
] = createContext<RadioGroupContext>({
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
    const { size = 'md', children, className, color, ...hookProps } = props;

    const { value, onChange, getRootProps, name, htmlProps } = useRadioGroup(
      hookProps,
    );

    const group = React.useMemo(
      () => ({
        name,
        size,
        onChange,
        color,
        value,
      }),
      [size, name, onChange, value],
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
