import * as React from 'react';
import copy from 'copy-to-clipboard';

/**
 * React hook to copy content to clipboard
 *
 * @param text the text or value to copy
 * @param timeout delay (in ms) to switch back to initial state once copied.
 */

export const useClipboard = (
  text: string,
  timeout = 1500
): readonly [boolean, () => void] => {
  const [copied, setCopied] = React.useState(false);

  const onCopy = React.useCallback(() => {
    const didCopy = copy(text);
    setCopied(didCopy);
  }, [text]);

  React.useEffect(() => {
    if (copied) {
      const id = setTimeout(() => {
        setCopied(false);
      }, timeout);
      return () => clearTimeout(id);
    }
    return;
  }, [timeout, copied]);

  return [copied, onCopy] as const;
};
