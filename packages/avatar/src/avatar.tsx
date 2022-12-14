/** ** */
import { useImage } from '@nature-ui/image';
import { clsx, css, forwardRef, nature, PropsOf } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import React from 'react';
import { randomBgColors } from './randomBgColors';
export const baseStyle =
  'items-center inline-flex text-center justify-center uppercase font-medium relative flex-shrink-0 rounded-full';
interface AvatarOptions {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name?: string;
  /**
   * The size of the avatar.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /**
   * If `true`, the `Avatar` will show a border around it.
   *
   * Best for a group of avatars
   */
  showBorder?: boolean;
  /**
   * The badge at the bottom right corner of the avatar.
   */
  children?: React.ReactNode;
  /**
   * The image url of the `Avatar`
   */
  src?: string;
  /**
   * List of sources to use for different screen resolutions
   */
  srcSet?: string;
  /**
   * The background color
   */
  color?: string;
  /**
   * The border color of the avatar
   */
  borderColor?: string;
  /**
   * Function called when image failed to load
   */
  onError?(): void;
  /**
   * The default avatar used as fallback when `name`, and `src`
   * is not specified.
   */
  icon?: React.ReactElement;
  /**
   * Function to get the initials to display
   */
  getInitials?(name?: string): string;
}

export const SIZES = {
  xs: '24px',
  sm: '32px',
  md: '48px',
  lg: '64px',
  xl: '96px',
  '2xl': '128px',
};

export type AvatarBadgeComp = PropsOf<typeof nature.div> & {
  size?: string;
};

export const AvatarBadge = ({
  size = '1em',
  className = '',
  ...rest
}: AvatarBadgeComp) => {
  const style = css`
    width: ${size};
    height: ${size};
    border-width: 0.2em;
  `;

  return (
    <nature.div
      className={clsx(
        `absolute flex items-center justify-center right-0 bottom-0 rounded-full border-solid ${style} border-white -mb-1 -mr-1`,
        className,
      )}
      {...rest}
    />
  );
};

if (__DEV__) {
  AvatarBadge.displayName = 'AvatarBadge';
}

/**
 * Gets the initials of a user based on the name
 * @param name the name passed
 */
const initials = (name: string) => {
  const [firstName, lastName] = name.split(' ');

  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`;
  }

  return firstName[0];
};

type InitialsAvatarProps = PropsOf<typeof nature.div> &
  Pick<AvatarOptions, 'name' | 'getInitials'>;

/**
 * The avatar name container
 */

export const InitialAvatar = (props: InitialsAvatarProps) => {
  const { name, getInitials, ...rest } = props;

  return (
    <nature.span aria-label={name} {...rest}>
      {name ? getInitials?.(name) : null}
    </nature.span>
  );
};

/**
 * Fallback avatar react component.
 * This should be a generic svg used to represent an avatar
 */

export const DefaultIcon = (props: PropsOf<'svg'>) => (
  <svg
    viewBox='0 0 128 128'
    color='#fff'
    style={{
      width: '100%',
      height: '100%',
    }}
    {...props}
  >
    <path
      fill='currentColor'
      d='M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z'
    />
    <path
      fill='currentColor'
      d='M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24'
    />
  </svg>
);

const AvatarComp = nature<'span', { name?: string }>('span');

export type AvatarProps = PropsOf<typeof AvatarComp> & AvatarOptions;

/**
 * Avatar
 *
 * React component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */

export const Avatar = forwardRef<AvatarProps, 'span'>((props, ref) => {
  const {
    name,
    src,
    showBorder,
    onError,
    getInitials = initials,
    icon = <DefaultIcon />,
    className,
    size = 'md',
    color: bgColor,
    borderColor: bdColor,
    ...rest
  } = props;
  const { bg, borderColor, color } = randomBgColors(name);

  const status = useImage({
    src,
    onError,
  });

  const hasLoaded = status === 'loaded';
  const _className = clsx('object-cover w-full h-full rounded-full', {
    'border-2': showBorder,
  });
  const STYLES = css`
    width: ${SIZES[size]};
    height: ${SIZES[size]};
  `;

  const _borderColor = css({
    borderColor,
  });

  const _bg = css({
    backgroundColor: bg,
    color,
  });

  const getAvatar = () => {
    if (src && hasLoaded) {
      return (
        <img
          {...{
            alt: name,
            src,
            className: _className,
          }}
        />
      );
    }

    /**
     * Fallback avatar applies under 2 conditions:
     * - If `src` was passed and the image has not loaded or failed to load
     * - If `src` wasn't passed
     *
     * In this case, we'll show either the name avatar or default avatar
     */
    const showFallback = !src || (src && !hasLoaded);

    if (showFallback) {
      const { className: cn, ..._rest } = icon.props;
      return name ? (
        <InitialAvatar
          getInitials={getInitials}
          name={name}
          className={clsx(
            baseStyle,
            {
              [`border-${bdColor}`]: bdColor,
              [_borderColor]: !bdColor,
              [_bg]: !bgColor,
            },
            bgColor,
            STYLES,
          )}
        />
      ) : (
        React.cloneElement(icon, {
          ..._rest,
          role: 'img',
          className: clsx(baseStyle, cn, bgColor, {
            [`border-${bdColor}`]: bdColor,
            [_borderColor]: !bdColor,
            [_bg]: !bgColor,
          }),
        })
      );
    }

    return undefined;
  };

  return (
    <AvatarComp
      ref={ref}
      name={name}
      className={clsx(
        baseStyle,
        {
          [`border-${bdColor}`]: bdColor,
          [_borderColor]: !bdColor,
          [_bg]: !bgColor,
        },
        bgColor,
        STYLES,
        className,
      )}
      {...rest}
    >
      {getAvatar()}
      {props.children}
    </AvatarComp>
  );
});

if (__DEV__) {
  Avatar.displayName = 'Avatar';
}
