/** @jsx jsx */
import * as React from 'react';
import { forwardRef, nature, PropsOf, jsx } from '@nature-ui/system';
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
  size?: string;
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
    size,
    ...rest
  } = props;

  const shouldIgnore = Boolean(loading ?? ignoreFallback);

  const status = useImage({
    ...props,
    ignoreFallback: shouldIgnore,
  });

  let shared = {
    ref,
    ...(shouldIgnore ? rest : omit(rest, ['onError', 'onLoad'])),
  };

  if (size) {
    shared = {
      ...shared,
      css: {
        width: size,
        height: size,
      },
    };
  }

  if (status !== 'loaded') {
    if (fallback) return fallback;

    const result = {
      src: fallbackSrc,
      ...shared,
    };

    return <ImageComp {...result} />;
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
