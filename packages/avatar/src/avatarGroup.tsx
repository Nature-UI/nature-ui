/** @jsx jsx */
import { jsx, nature, clsx, PropsOf, forwardRef } from '@nature-ui/system';
import * as React from 'react';
import { getValidChildren, __DEV__ } from '@nature-ui/utils';
import { css } from 'emotion';

import { baseStyle, SIZES } from './avatar';

const AvatarExcessLabel = forwardRef<PropsOf<typeof nature.span>>(
  ({ className = '', ...rest }, ref) => (
    <nature.span
      className={clsx(`${baseStyle} rounded-full`, {
        [className]: className,
      })}
      ref={ref}
      {...rest}
    />
  ),
);

if (__DEV__) {
  AvatarExcessLabel.displayName = 'AvatarExcessLabel';
}

interface AvatarGroupOptions {
  /**
   * The children of the avatar group.
   *
   * Ideally should be `Avatar` and `MoreIndicator` components
   */
  children: React.ReactNode;
  /**
   * The maximum number of visible avatars
   */
  max?: number;

  /**
   * The space between the avatars in the group.
   */
  spacing?: string | number;

  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const NatureGroup = forwardRef<PropsOf<typeof nature.div>>(
  ({ children }, ref) => (
    <nature.div
      ref={ref}
      className='flex items-center justify-end flex-row-reverse'
    >
      {children}
    </nature.div>
  ),
);

export type AvatarGroupProps = AvatarGroupOptions & PropsOf<typeof NatureGroup>;

/**
 * AvatarGroup
 *
 * React component to displays a number of avatars grouped together in a stack.
 */
export const AvatarGroup = forwardRef<AvatarGroupProps>((props, ref) => {
  const { children, max, size = 'md', spacing = '-0.5rem', ...rest } = props;

  const validChildren = getValidChildren(children);

  /**
   * get the avatars within the max
   */
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren;

  /**
   * get the remaining avatar count
   */
  const excess = max && validChildren.length - max;

  /**
   * Reversing the children is a great way to avoid
   * using zIndex to overlap the avatars
   */
  const reversedChildren = childrenWithinMax.reverse();

  const STYLES = css`
    width: ${SIZES[size]};
    height: ${SIZES[size]};
  `;

  const defaults = 'border-2 border-solid border-white';
  const spacingType = typeof spacing === 'string' ? spacing : `${spacing}px`;

  const clones = reversedChildren.map((child, index) => {
    const isFirstAvatar = index === 0;

    const className = clsx(STYLES, defaults, {
      [css`
        margin-right: ${spacingType};
      `]: !isFirstAvatar,
    });

    return React.cloneElement(child as React.ReactElement<any>, {
      className,
    });
  });

  const groupExcess = clsx(
    STYLES,
    defaults,
    'bg-gray-300',
    css`
      margin-left: ${spacingType};
    `,
  );

  return (
    <NatureGroup ref={ref} role='group' {...rest}>
      {excess && (
        <AvatarExcessLabel className={groupExcess}>
          {`+${excess}`}
        </AvatarExcessLabel>
      )}
      {clones}
    </NatureGroup>
  );
});
