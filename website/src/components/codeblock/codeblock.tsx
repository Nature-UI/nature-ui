import {
  Box,
  BoxProps,
  Button,
  ButtonType,
  useClipboard,
} from '@nature-ui/core';
import theme from 'prism-react-renderer/themes/nightOwl';
import React, { useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import scope from './react-live-scope';
import Highlight from './highlight';

export const liveEditorStyle: React.CSSProperties = {
  fontSize: 14,
  overflowX: 'auto',
  fontFamily: 'SF Mono, Menlo, monospace',
};

export const liveErrorStyle: React.CSSProperties = {
  fontFamily: 'SF Mono, Menlo, monospace',
  fontSize: 14,
  padding: '1em',
  overflowX: 'auto',
  color: 'white',
  backgroundColor: 'red',
};

const LiveCodePreview = ({ className, ...props }: any) => (
  <LivePreview
    className={`${className} mt-5 p-3 border border-solid border-gray-200 rounded-lg overflow-x-auto`}
    {...props}
  />
);

const CopyButton = ({ className, ...props }: ButtonType) => (
  <Button
    size='xs'
    color='primary-600'
    className={`${className} uppercase text-xs h-6 top-0 right-5 z-10`}
    css={{ position: 'absolute' }}
    {...props}
  />
);

const EditableNotice = (props: BoxProps) => {
  return (
    <Box
      className='absolute w-full rounded-t-lg py-2 z-0 text-gray-400 text-xs font-semibold text-center uppercase pointer-events-none'
      css={{
        top: '-1.25em',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        backgroundColor: '#011627',
      }}
      {...props}
    >
      Editable Example
    </Box>
  );
};

const CodeContainer = ({ className, ...props }: any) => (
  <Box
    className={`${className} p-3 rounded-lg my-8`}
    css={{ backgroundColor: '#011627' }}
    {...props}
  />
);

function CodeBlock(props) {
  const {
    className,
    live = true,
    manual,
    ln,
    viewlines,
    render,
    children,
    ...rest
  } = props;
  const [editorCode, setEditorCode] = useState(children.trim());

  const language = className && className.replace(/language-/, '');
  const { copied, onCopy } = useClipboard(editorCode);

  const liveProviderProps = {
    theme,
    language,
    code: editorCode,
    scope,
    noInline: manual,
    ...rest,
  };

  const onChange = (newCode) => setEditorCode(newCode.trim());

  if (language === 'jsx' && live === true) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview className='z-10' />
        <Box className='relative z-0'>
          <CodeContainer>
            <LiveEditor onChange={onChange} style={liveEditorStyle} />
          </CodeContainer>
          <CopyButton onClick={onCopy}>{copied ? 'copied' : 'copy'}</CopyButton>
          <EditableNotice />
        </Box>
        <LiveError style={liveErrorStyle} />
      </LiveProvider>
    );
  }

  if (render) {
    return (
      <div style={{ marginTop: 32 }}>
        <LiveProvider {...liveProviderProps}>
          <LiveCodePreview />
          <Box className='relative z-0'>
            <CopyButton onClick={onCopy}>
              {copied ? 'copied' : 'copy'}
            </CopyButton>
          </Box>
        </LiveProvider>
      </div>
    );
  }

  return (
    <Box className='relative z-0'>
      <CodeContainer className='p-4 overflow-hidden'>
        <Highlight
          codeString={editorCode}
          language={language}
          metaString={ln}
          showLines={viewlines}
        />
      </CodeContainer>
      <CopyButton className='top-4' onClick={onCopy}>
        {copied ? 'copied' : 'copy'}
      </CopyButton>
    </Box>
  );
}

CodeBlock.defaultProps = {
  mountStylesheet: false,
};

export default CodeBlock;
