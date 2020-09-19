import * as React from 'react';
import { forwardRef, nature, PropsOf } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import { css } from 'emotion';

const Span = nature('span');
const Input = nature('input');

/**
 * Styles to visually hide an element
 * but make it accessible to screen-readers.
 */
export const visuallyHiddenStyle = css`
  border: 0;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  width: 1px;
  margin: --1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
`;

/**
 * Visually hidden component used to hide
 * elements on screen
 */
export const VisuallyHidden = forwardRef<PropsOf<typeof Span>>((props, ref) => (
  <Span className={visuallyHiddenStyle} {...props} ref={ref} />
));

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}

/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 */
export const VisuallyHiddenInput = forwardRef<PropsOf<typeof Input>>(
  (props, ref) => <Input className={visuallyHiddenStyle} {...props} ref={ref} />
);

if (__DEV__) {
  VisuallyHiddenInput.displayName = 'VisuallyHiddenInput';
}

export default VisuallyHidden;
