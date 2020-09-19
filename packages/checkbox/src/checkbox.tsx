/** @jsx jsx*/
import { forwardRef, nature, PropsOf, jsx } from '@nature-ui/system';
import { css } from 'emotion';
import * as React from 'react';
import { IconProps } from '@nature-ui/icon';
import { __DEV__ } from '@nature-ui/utils';

import { useCheckbox, UseCheckboxProps } from './use-checkbox';
import { useCheckboxGroupContext } from './checkbox-group';
import { CheckboxIcon } from './checkbox-icon';

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

const Label = nature('label');
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
  UseCheckboxProps & {
    /**
     * The color of the check icon
     */
    iconColor?: IconProps['color'];
    /**
     * The size of the check icon
     * @default sm
     */
    iconSize?: IconProps['size'];
    spacing?: number | string;
    /**
     * If `true`, the checkbox should take up the full width of the parent.
     */
    isFullWidth?: boolean;
  };

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 */
export const Checkbox = forwardRef<CheckboxProps>((props, ref) => {
  const group = useCheckboxGroupContext();

  const { className = '', children, ...rest } = props;

  let isChecked = props.isChecked;

  if (group?.value && props.value) {
    isChecked = group.value.includes(props.value);
  }

  let onChange = props.onChange;

  if (group?.onChange && props.value) {
    onChange = group.onChange;
  }

  const {
    state,
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    htmlProps,
  } = useCheckbox({
    ...rest,
    isChecked,
    onChange,
  });

  return (
    <StyledWrapper className={className} {...htmlProps}>
      <input {...getInputProps({ ref })} />
      <StyledControl {...getCheckboxProps()}>
        <CheckboxIcon
          isChecked={state.isChecked}
          isIndeterminate={state.isIndeterminate}
        />
      </StyledControl>
      {children && <StyledLabel {...getLabelProps()}>{children}</StyledLabel>}
    </StyledWrapper>
  );
});

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}
