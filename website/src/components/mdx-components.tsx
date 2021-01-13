/** @jsx jsx */
import { Alert, Box, nature, jsx, PropsOf } from '@nature-ui/core';
import CodeBlock from './codeblock/codeblock';
// import ComponentLinks from './component-links';

const Pre = (props) => <nature.div className='my-8 rounded-sm' {...props} />;

const Table = (props) => (
  <nature.div className='overflow-x-hidden'>
    <nature.table className='text-left mt-8 w-full' {...props} />
  </nature.div>
);

const THead = (props) => (
  <nature.th className='bg-gray-50 p-2 font-semibold text-sm ' {...props} />
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

  return (
    <nature.h2 data-group='' css={{ scrollMarginBlock: '6.875rem' }} {...props}>
      <span>{children}</span>
      {id && (
        <nature.a
          aria-label='anchor'
          href={`#${id}`}
          className='text-primary-100 focus:opacity-100 focus:shadow-outline opacity-0 ml-1 outline-none'
        >
          #
        </nature.a>
      )}
    </nature.h2>
  );
};

const InlineCode = (props: any) => (
  <nature.code apply='mdx.code' className='text-accent-100 ' {...props} />
);

const MDXComponents = {
  h1: (props) => <nature.h1 apply='mdx.h1' {...props} />,
  h2: (props) => <LinkedHeading apply='mdx.h2' {...props} />,
  h3: (props) => <LinkedHeading as='h3' apply='mdx.h3' {...props} />,
  h4: (props) => <LinkedHeading as='h4' apply='mdx.h4' {...props} />,
  hr: (props) => <nature.hr apply='mdx.hr' {...props} />,
  strong: (props) => <Box as='strong' fontWeight='semibold' {...props} />,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  // kbd: Kbd,
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
  // 'carbon-ad': CarbonAd,
  // ComponentLinks,
  // IconsList,
  // PropsTable,
};

export default MDXComponents;
