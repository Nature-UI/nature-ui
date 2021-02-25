/** ** */
import * as React from 'react';
import { Alert, Box, PropsOf, Divider, clsx, nature } from '@nature-ui/core';
import CodeBlock from './codeblock/codeblock';

const Pre = (props) => <nature.div className='my-8 rounded-sm' {...props} />;

const Table = (props) => (
  <nature.div className='overflow-x-hidden'>
    <nature.table
      className='text-left mt-8 w-full overflow-x-auto'
      {...props}
    />
  </nature.div>
);

const THead = (props) => (
  <nature.th
    className='bg-gray-25 bg-opacity-10 p-2 font-semibold text-sm '
    {...props}
  />
);

const TData = (props) => (
  <nature.td
    className='p-2 border-t text-sm whitespace-normal'
    css={{ borderColor: 'inherit' }}
    {...props}
  />
);

const LinkedHeading = (props: PropsOf<typeof nature.h2>) => {
  const { children, id } = props;
  const [hover, setHover] = React.useState(false);

  const handleHover = () => {
    setHover(!hover);
  };

  return (
    <nature.h2
      data-group=''
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      css={{ scrollMarginBlock: '6.875rem' }}
      {...props}
    >
      <span>{children}</span>
      {id && (
        <nature.a
          aria-label='anchor'
          href={`#${id}`}
          className={clsx(
            'text-primary-500 focus:opacity-100 focus:shadow-outline opacity-0 ml-2 outline-none hover:opacity-100 rounded-md',
            {
              'opacity-100': hover,
            },
          )}
        >
          #
        </nature.a>
      )}
    </nature.h2>
  );
};

const InlineCode = (props: any) => (
  <nature.code className='text-accent-600 ' {...props} />
);

const MDXComponents = {
  h1: (props) => (
    <nature.h1 className='font-black text-4xl leading-5' {...props} />
  ),
  h2: (props) => (
    <LinkedHeading
      className='font-bold text-3xl mt-16 mb-2 leading-5'
      {...props}
    />
  ),
  h3: (props) => (
    <LinkedHeading className='text-2xl font-semibold mt-6' as='h3' {...props} />
  ),
  h4: (props) => <LinkedHeading as='h4' {...props} />,
  hr: (props) => <Divider {...props} />,
  strong: (props) => <Box as='strong' className='font-medium ' {...props} />,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  // kbd: Kbd,
  br: (props) => <Box height='24px' {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: (props) => (
    <nature.a className='text-primary-500 hover:underline' {...props} />
  ),
  p: (props) => <nature.p className='mt-5 leading-7' {...props} />,
  ul: (props) => <nature.ul className='mt-7 ml-7' {...props} />,
  ol: (props) => <nature.ol {...props} />,
  li: (props) => <nature.li className='pb-1 list-disc' {...props} />,
  blockquote: (props) => (
    <Alert
      className='mt-4 rounded-md my-6'
      role='none'
      status='warning'
      variant='left-accent'
      as='blockquote'
      {...props}
    />
  ),
};

export default MDXComponents;
