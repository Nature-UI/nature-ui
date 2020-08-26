import * as React from 'react';
import { nature, PropsOf, forwardRef } from '@nature-ui/system';
import clsx from 'clsx';
import { darken, __DEV__ } from '@nature-ui/utils';

const BadgeLayout = nature('span');

export type BadgeProps = PropsOf<typeof BadgeLayout>;

export type BadgeType = BadgeProps & {
  color?: string;
  variant?: 'solid' | 'subtle' | 'outline';
};

export const Badge = forwardRef<BadgeType>((props, ref) => {
  const {
    children,
    className = '',
    color = 'gray-200',
    variant = 'subtle',
    ...rest
  } = props;

  const DEFAULTS = `p-1 rounded text-xs uppercase font-semibold bg-gray-100`;

  const VARIANTS = {
    solid: `text-white bg-${color}`,
    subtle: `text-${darken(color, 500)} bg-${color}`,
    outline: `border border-${color} text-${color}`,
  };

  const _classNames = clsx(DEFAULTS, {
    [className]: className,
    [VARIANTS[variant]]: variant,
  });

  const values = {
    ref,
    className: _classNames,
    ...rest,
  };

  return <BadgeLayout {...values}>{children}</BadgeLayout>;
});

if (__DEV__) {
  Badge.displayName = 'Badge';
}
