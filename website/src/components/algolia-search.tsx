/** ** */
import * as React from 'react';
import {
  nature,
  PropsOf,
  Button,
  Stack,
  VisuallyHidden,
} from '@nature-ui/core';
import { SearchIcon } from '@nature-ui/icons';

const ACTION_KEY_DEFAULT = ['Ctrl', 'Control'];
const ACTION_KEY_APPLE = ['⌘', 'Command'];

export const SearchButton = React.forwardRef(
  (props: PropsOf<typeof nature.button>, ref: React.Ref<HTMLButtonElement>) => {
    const [actionKey, setActionKey] = React.useState<string[]>(
      ACTION_KEY_APPLE,
    );

    React.useEffect(() => {
      if (typeof navigator === 'undefined') return;

      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

      if (!isMac) {
        setActionKey(ACTION_KEY_DEFAULT);
      }
    }, []);

    return (
      <Button
        ref={ref}
        {...props}
        variant='none'
        className='w-full px-4 py-3 mx-5 focus:ring focus:outline-none rounded-md transition-shadow duration-200 shadow-md'
      >
        <Stack direction='row' className='items-center'>
          <SearchIcon className='text-gray-50' />
          <p className='text-gray-50 ml-4'>Search the docs</p>

          <Stack direction='row' spacing='4px' className='items-center ml-auto'>
            <VisuallyHidden>Press </VisuallyHidden>
            <kbd className='no-underline px-2 rounded bg-gray-200'>
              <abbr title={actionKey[1]}>{ACTION_KEY_APPLE[0]}</abbr>
            </kbd>
            <VisuallyHidden> and </VisuallyHidden>
            <kbd className='no-underline px-2 rounded bg-gray-200'>K</kbd>
          </Stack>
        </Stack>
      </Button>
    );
  },
);
