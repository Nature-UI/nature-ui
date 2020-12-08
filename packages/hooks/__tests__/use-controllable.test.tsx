import { renderHook, invoke } from '@nature-ui/test-utils';

import { useControllableState } from '../src';

describe('@nature-ui/hooks', () => {
  test('should be uncontrolled when defaultValue is passed', () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 'testing' })
    );
    const [value] = result.current;

    expect(value).toBe('testing');

    invoke(() => {
      const [, setValue] = result.current;

      setValue('naruto');
    });

    const [next] = result.current;

    expect(next).toBe('naruto');
  });

  test('should be controlled when value is passed', () => {
    const { result } = renderHook(() =>
      useControllableState({
        value: 'testing',
        name: 'useControllableState',
      })
    );
    const [value] = result.current;

    expect(value).toBe('testing');

    invoke(() => {
      const [, setValue] = result.current;

      setValue('naruto');
    });

    /*
     * value shouldn't change since it's controlled
     * we need to connect it to state for it to change
     */
    const [next] = result.current;

    expect(next).toBe('testing');
  });
});
