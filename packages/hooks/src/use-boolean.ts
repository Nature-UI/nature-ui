import { useCallback, useState } from 'react';

type InitialState = boolean | (() => boolean);

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */

export const useBoolean = (initialState: InitialState = false) => {
  const [value, setValue] = useState(initialState);

  const on = useCallback(() => {
    setValue(true);
  }, []);

  const off = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setState = useCallback((specificValue: boolean) => {
    setValue(specificValue);
  }, []);

  return [value, { on, off, toggle, setState }] as const;
};
