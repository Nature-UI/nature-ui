/** @jsx jsx */
import { forwardRef, nature, PropsOf, jsx } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';

const Span = nature('span');
const Input = nature('input');

/**
 * Styles to visually hide an element
 * but make it accessible to screen-readers.
 */
export const visuallyHiddenStyle: React.CSSProperties = {
  border: 0,
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  width: '1px',
  margin: '--1px',
  padding: '0px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'absolute',
};
/**
 * Visually hidden component used to hide
 * elements on screen
 */
export const VisuallyHidden = (props: PropsOf<typeof Span>) => (
  <Span css={visuallyHiddenStyle as any} {...props} />
);

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}

/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 */
export const VisuallyHiddenInput = forwardRef<PropsOf<typeof Input>>(
  (props, ref) => (
    <Input css={visuallyHiddenStyle as any} {...props} ref={ref} />
  )
);

if (__DEV__) {
  VisuallyHiddenInput.displayName = 'VisuallyHiddenInput';
}

export default VisuallyHidden;
