import { clsx, forwardRef, nature, PropsOf } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';

export type BadgeProps = PropsOf<typeof nature.span>;

export type BadgeType = BadgeProps & {
  color?: string;
  variant?: 'solid' | 'subtle' | 'outline';
  css?: any;
};

export const Badge = forwardRef<BadgeType, 'span'>((props, ref) => {
  const { children, className, css, ...rest } = props;

  const DEFAULTS =
    'rounded-sm px-1 py-0.5 text-xs uppercase font-semibold inline-block align-middle';

  const _classNames = clsx(DEFAULTS, className);

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
