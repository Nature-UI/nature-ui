import * as React from 'react';
import { createContext, __DEV__ } from '@nature-ui/utils';

import {
  useCheckboxGroup,
  UseCheckboxGroupProps,
  UseCheckboxGroupReturn,
} from './use-checkbox-group';

export interface CheckboxGroupProps extends UseCheckboxGroupProps {
  children?: React.ReactNode;
  size?: string | undefined;
  color?: string | undefined;
}

export type CheckboxGroupContext = Pick<
  UseCheckboxGroupReturn,
  'onChange' | 'value'
> & {
  size?: string | undefined;
  color?: string | undefined;
};

const [
  CheckboxGroupContextProvider,
  useCheckboxGroupContext,
] = createContext<CheckboxGroupContext>({
  name: 'CheckboxGroupContext',
  strict: false,
});

export { useCheckboxGroupContext };

/**
 * Used for multiple checkboxes which are bound in one group
 * and it indicates whether one or more options are selected
 *
 */
export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { children, color, size } = props;
  const { value, onChange } = useCheckboxGroup(props);

  const group = React.useMemo(
    () => ({
      onChange,
      value,
      color,
      size,
    }),
    [onChange, value],
  );

  return (
    <CheckboxGroupContextProvider value={group}>
      {children}
    </CheckboxGroupContextProvider>
  );
};

if (__DEV__) {
  CheckboxGroup.displayName = 'CheckboxGroup';
}
