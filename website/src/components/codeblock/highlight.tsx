/** * */
import * as React from 'react';
import { El } from 'components/nature-jsx-elements';
import BaseHighlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { liveEditorStyle } from './codeblock';

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false;
  }

  const lineNumbers = RE.exec(meta)[1]
    .split(',')
    .map((v) => v.split('-').map((x) => parseInt(x, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
    );
    return inRange;
  };
};

interface HighlightProps {
  codeString: string;
  language: Language;
  metaString?: string;
  showLines?: boolean;
}

const Highlight = ({
  codeString,
  language,
  metaString,
  showLines,
  ...props
}: HighlightProps) => {
  const shouldHighlightLine = calculateLinesToHighlight(metaString);

  return (
    <BaseHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
      {...props}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div style={liveEditorStyle} data-language={language}>
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              return (
                <El.div
                  className={`px-5 ${
                    shouldHighlightLine(i) && 'bg-primary-25 bg-opacity-40'
                  }`}
                  {...lineProps}
                >
                  {showLines && (
                    <El.span className='opacity-30 mr-6 text-xs'>
                      {i + 1}
                    </El.span>
                  )}
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </El.div>
              );
            })}
          </pre>
        </div>
      )}
    </BaseHighlight>
  );
};
export default Highlight;
