/** @jsx jsx */
import { nature, jsx, PropsOf, Box } from '@nature-ui/core';

const Nature = {
  h1: nature('h1'),
  h2: nature('h2'),
};

const Pre = (props) => <nature.div className='my-8 rounded-sm' {...props} />;

const Table = (props) => (
  <nature.div className='overflow-x-auto'>
    <nature.table className='text-left mt-10 w-full' {...props} />
  </nature.div>
);

const THead = (props) => (
  <nature.th {...props} className='font-semibold bg-gray-300 p-1 text-sm' />
);

const TData = (props) => (
  <nature.td
    className='p-2 text-sm whitespace-normal'
    css={{ borderTopWidth: '1px', borderColor: 'inherit' }}
    {...props}
  />
);

const LinkedHeading = (props: PropsOf<typeof Nature.h2>) => {
  const { id, children } = props;
  return (
    <nature.h2 data-group='' css={{ scrollMarginBlock: '6.875rem' }} {...props}>
      <span>{children}</span>
      {id && (
        <nature.a
          aria-label='anchor'
          className='text-blue-500 outline-none focus:opacity-100 focus:shadow-outline opacity-0 ml-1'
          href={`#${id}`}
        >
          #
        </nature.a>
      )}
    </nature.h2>
  );
};

const MDXComponents = {
  h1: (props: any) => <Nature.h1 apply='mdx.h1' {...props} />,
  h2: (props) => <LinkedHeading apply='mdx.h2' {...props} />,
  h3: (props) => <LinkedHeading as='h3' apply='mdx.h3' {...props} />,
  h4: (props) => <LinkedHeading as='h4' apply='mdx.h4' {...props} />,
  hr: (props) => <nature.hr apply='mdx.hr' {...props} />,
  strong: (props) => <Box as='strong' fontWeight='semibold' {...props} />,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  br: (props) => <Box height='24px' {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: (props) => <nature.a apply='mdx.a' {...props} />,
  p: (props) => <nature.p apply='mdx.p' {...props} />,
  ul: (props) => <nature.ul apply='mdx.ul' {...props} />,
  ol: (props) => <nature.ol apply='mdx.ul' {...props} />,
  li: (props) => <nature.li pb='4px' {...props} />,
  blockquote: (props) => (
    <Alert
      mt='4'
      role='none'
      status='warning'
      variant='left-accent'
      as='blockquote'
      rounded='4px'
      my='1.5rem'
      {...props}
    />
  ),
  'carbon-ad': CarbonAd,
  ComponentLinks,
  IconsList,
  PropsTable,
};

export default MDXComponents;
