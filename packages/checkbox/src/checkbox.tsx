/** @jsx jsx*/
import { forwardRef, nature, PropsOf, jsx } from '@nature-ui/system';
import { css } from 'emotion';
import * as React from 'react';

const transition = css`
  transition: transform 240ms, opacity 240mx;
`;

const StyledControl = forwardRef<PropsOf<typeof nature.div>>((props, ref) => {
  const _className = `inline-flex items-center justify-center align-top select-none flex-shrink-0 ${transition}`;
  return <nature.div className={_className} ref={ref} {...props} />;
});

const StyledLabel = forwardRef<PropsOf<typeof nature.div>>((props, ref) => {
  const _className = `select-none`;
  return <nature.div className={_className} ref={ref} {...props} />;
});

const Label = nature("label")
const StyledWrapper = forwardRef<PropsOf<typeof Label>>((props, ref) => {
  const _className = `cursor-pointer inline-flex items-center align-top relative ${transition}`;
  return <Label className={_className} ref={ref} {...props} />;
});

type BaseControlProps = Omit<
  PropsOf<typeof StyledControl>,
  'onChange' | 'defaultChecked'
>;

type Omitted = 'checked' | 'defaultChecked';

export type CheckboxProps = BaseControlProps &
  Omit<PropsOf<'input'>, Omitted> &
  UseCh;
