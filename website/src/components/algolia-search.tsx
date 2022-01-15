/** ** */
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import {
  Button,
  nature,
  Portal,
  PropsOf,
  Stack,
  VisuallyHidden,
} from '@nature-ui/core';
import { SearchIcon } from '@nature-ui/icons';
import { startsWith } from 'lodash/fp';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

const startsWithCss = startsWith('css-');

const ACTION_KEY_DEFAULT = ['Ctrl', 'Control'];
const ACTION_KEY_APPLE = ['⌘', 'Command'];

function Hit(props) {
  const { hit, children } = props as any;
  return (
    <Link href={hit.url}>
      <a>{children}</a>
    </Link>
  );
}

export const SearchButton = React.forwardRef(
  (props: PropsOf<typeof nature.button>, ref: React.Ref<HTMLButtonElement>) => {
    const [actionKey, setActionKey] =
      React.useState<string[]>(ACTION_KEY_APPLE);

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
        <Stack row className='items-center'>
          <SearchIcon className='text-gray-50' />
          <p className='text-gray-50 ml-4'>Search the docs</p>

          <Stack row spacing='4px' className='items-center ml-auto'>
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

export function Search() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const searchButtonRef = React.useRef();
  const [initialQuery, setInitialQuery] = React.useState(null);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = React.useCallback(
    (e) => {
      setIsOpen(true);
      setInitialQuery(e.key);
    },
    [setIsOpen, setInitialQuery],
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <>
      <SearchButton onClick={onOpen} ref={searchButtonRef} />
      {isOpen && (
        <Portal>
          <DocSearchModal
            placeholder='Search the docs'
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            onClose={onClose}
            indexName='nature-ui'
            apiKey='0d8256bb9d09856b576409dfb05103af'
            appId='BH4D9OD16A'
            navigator={{
              navigate({ itemUrl }) {
                setIsOpen(false);
                router.push(itemUrl);
              },
            }}
            hitComponent={Hit}
            transformItems={(items) => {
              return items
                .filter((item) => {
                  const { lvl1 } = item.hierarchy;
                  return !startsWithCss(lvl1) || !startsWithCss(item.content);
                })
                .map((item) => {
                  /**
                   *  We transform the absolute URL into a relative URL to
                   *  leverage Next's preloading.
                   */
                  const a = document.createElement('a');
                  a.href = item.url;
                  const hash = a.hash === '#content-wrapper' ? '' : a.hash;

                  return {
                    ...item,
                    url: `${a.pathname}${hash}`,
                    content: item.content ?? item.hierarchy.lvl0,
                  };
                });
            }}
          />
        </Portal>
      )}
    </>
  );
}
