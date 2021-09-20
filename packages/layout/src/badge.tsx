import { clsx, forwardRef, nature, PropsOf } from '@nature-ui/system';
import { darken, __DEV__ } from '@nature-ui/utils';

export type BadgeProps = PropsOf<typeof nature.span>;

export type BadgeType = BadgeProps & {
  color?: string;
  variant?: 'solid' | 'subtle' | 'outline';
  css?: any;
};

export const Badge = forwardRef<BadgeType>((props, ref) => {
  const {
    children,
    className = '',
    color = 'gray-200',
    variant = 'subtle',
    css,
    ...rest
  } = props;

  const DEFAULTS =
    'rounded-sm px-1 py-0.5 text-xs uppercase font-semibold inline-block align-middle';

  const VARIANTS = {
    solid: `text-white bg-${color}`,
    subtle: `text-${darken(color, 500)} bg-${color}`,
    outline: `border border-${color} text-${color}`,
  };

  const _classNames = clsx(DEFAULTS, className, {
    [VARIANTS[variant]]: variant,
  });

  const values = {
    ref,
    className: _classNames,
    ...rest,
  };

  return (
    <nature.span css={{ ...css, lineHeight: 'normal' }} {...values}>
      {children}
    </nature.span>
  );
});

if (__DEV__) {
  Badge.displayName = 'Badge';
}
