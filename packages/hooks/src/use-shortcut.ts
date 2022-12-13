import React from 'react';

/**
 * Checks if the key pressed is a printable character
 * and can be used for shortcut navigation
 */
export const isPrintableCharacter = (event: React.KeyboardEvent) => {
  const { key } = event;

  return key.length === 1 || (key.length > 1 && /[^a-zA-Z0-9]/.test(key));
};

export interface UseShortcutProps {
  timeout?: number;
  preventDefault?: (event: React.KeyboardEvent) => boolean;
}

/**
 * React hook that provides an enhanced keydown handler,
 * that's used for key navigation within menus, select dropdowns.
 */
export const useShortcut = (props: UseShortcutProps = {}) => {
  const { timeout = 300, preventDefault = () => true } = props;

  const [keys, setKeys] = React.useState<string[]>([]);
  const timeoutRef = React.useRef<any>();

  const flush = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const clearKeysAfterDelay = () => {
    flush();
    timeoutRef.current = setTimeout(() => {
      setKeys([]);
      timeoutRef.current = null;
    }, timeout);
  };

  React.useEffect(() => {
    return flush;
  }, []);

  type Callback = (keysSoFar: string) => void;

  const onKeyDown = (fn: Callback) => {
    return (event: React.KeyboardEvent) => {
      if (event.key === 'Backspace') {
        const keyCopy = [...keys];

        keyCopy.pop();
        setKeys(keyCopy);

        return;
      }

      if (isPrintableCharacter(event)) {
        const keysCopy = keys.concat(event.key);

        if (preventDefault(event)) {
          event.preventDefault();
          event.stopPropagation();
        }

        setKeys(keysCopy);
        fn(keysCopy.join(''));

        clearKeysAfterDelay();
      }
    };
  };

  return onKeyDown;
};
