/** @jsx jsx */
import VisuallyHidden, {
  nature,
  jsx,
  PropsOf,
  Button,
  Stack,
} from '@nature-ui/core';
import { SearchIcon } from '@nature-ui/icons';
import * as React from 'react';

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
        className='w-full px-4 py-3 mx-3 focus:ring focus:outline-none rounded-md transition-shadow duration-200 shadow-md'
      >
        <Stack direction='row' className='items-center '>
          <SearchIcon className='mr-4 text-gray-50' />
          <p className='text-gray-50'>Search the docs</p>

          <Stack direction='row' spacing='4px' className='items-center'>
            <VisuallyHidden>Press </VisuallyHidden>
            <kbd className='p-2 no-underline'>
              <nature.div as='abbr' className='bg-gray-25' title={actionKey[1]}>
                {ACTION_KEY_APPLE[0]}
              </nature.div>
            </kbd>
            <VisuallyHidden> and </VisuallyHidden>
            <kbd color='gray.500' rounded='2px'>
              K
            </kbd>
          </Stack>
        </Stack>
      </Button>
    );
  },
);
