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

const LiveCodePreview = (props) => (
  <LivePreview className='mt-5 p-3 border rounded-lg' {...props} />
);

const CopyButton = (props: ButtonType) => (
  <Button
    size='sm'
    className='absolute uppercase text-blue-500 text-xs h-6 top-0'
    css={{ zIndex: 1, right: '1.25em' }}
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

const CodeContainer = (props) => (
  <Box
    className='p-5 rounded-lg my-8'
    css={{ backgroundColor: '#011627' }}
    {...props}
  />
);

function CodeBlock(props) {
  const { className, live = true, manual, render, children, ...rest } = props;
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
        <LiveCodePreview zIndex='1' />
        <Box position='relative' zIndex='0'>
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
        </LiveProvider>
      </div>
    );
  }

  return (
    <LiveProvider disabled {...liveProviderProps}>
      <CodeContainer>
        <LiveEditor style={liveEditorStyle} />
      </CodeContainer>
    </LiveProvider>
  );
}

CodeBlock.defaultProps = {
  mountStylesheet: false,
};

export default CodeBlock;
