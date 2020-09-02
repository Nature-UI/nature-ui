import * as React from 'react';
import { forwardRef, nature, PropsOf } from '@nature-ui/system';
import { __DEV__, omit } from '@nature-ui/utils';

import { useImage, UseImageProps } from './use-image';

interface ImageOptions {
  /**
   * Fallback image `src` to show if image is loading or image fails.
   *
   * Note 🚨: We recommend you use a local image
   */
  fallbackSrc?: string;
  /**
   * Fallback element to show if image is loading or image fails.
   */
  fallback?: React.ReactElement;
  /**
   * The native HTML `width` attribute to the passed to the `img`
   */
  htmlWidth?: string | number;
  /**
   * The native HTML `height` attribute to the passed to the `img`
   */
  htmlHeight?: string | number;
  /**
   * Defines loading strategy
   */
  loading?: 'eager' | 'lazy';
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   */
  ignoreFallback?: boolean;
}

const ImageComp = nature('img');

export type ImageProps = UseImageProps &
  PropsOf<typeof ImageComp> &
  ImageOptions;

export const Image = forwardRef<ImageProps>((props, ref) => {
  const {
    fallbackSrc,
    fallback,
    src,
    loading,
    ignoreFallback,
    crossOrigin,
    ...rest
  } = props;

  const shouldIgnore =
    (loading !== undefined && loading !== null) || ignoreFallback;

  const status = useImage({
    ...props,
    ignoreFallback: shouldIgnore,
  });

  const shared = {
    ref,
    ...(shouldIgnore ? rest : omit(rest, ['onError', 'onLoad'])),
  };

  if (status !== 'loaded') {
    if (fallback) return fallback;

    return (
      <ImageComp
        {...{
          src: fallbackSrc,
          shared,
        }}
      />
    );
  }

  return (
    <ImageComp
      {...{
        crossOrigin,
        loading,
        src,
        ...shared,
      }}
    />
  );
});

if (__DEV__) {
  Image.displayName = 'Image';
}
