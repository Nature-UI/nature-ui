import * as React from 'react';
import { Icon, SvgIconProps } from '@nature-ui/icon';

const CheckIcon = (props: SvgIconProps) => {
  return (
    <Icon viewBox='0 0 14 14' {...props}>
      <g fill='currentColor'>
        <polygon points='5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039' />
      </g>
    </Icon>
  );
};

export const MinusIcon = (props: SvgIconProps) => {
  return (
    <Icon {...props}>
      <rect fill='currentColor' height='4' width='20' x='2' y='10' />
    </Icon>
  );
};

export type CheckboxIconProps = SvgIconProps & {
  isChecked?: boolean;
  isIndeterminate?: boolean;
};

/**
 * CheckboxIcon
 *
 * Icon for visually indicating the checked or indeterminate
 * state of a checkbox
 */
export const CheckboxIcon = (props: CheckboxIconProps) => {
  const { isChecked, isIndeterminate, ...rest } = props;

  if (isChecked) {
    return <CheckIcon {...rest} />;
  }

  if (isIndeterminate) {
    return <MinusIcon {...rest} />;
  }

  return null;
};
