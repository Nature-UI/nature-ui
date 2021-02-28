// @ts-ignore
import React from 'react';

import { nature } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import { IntersectionOptions } from 'react-intersection-observer';

import { ImageProps, useLazyImage } from '.';

type LazyImageType = ImageProps & {
  options?: IntersectionOptions;
};
export const LazyImage = (props: LazyImageType) => {
  const { fallbackSrc, alt, options, size, fallback, ...rest } = props;

  // const [ref, inView, entry] = useInView(options);
  const ref = useLazyImage(props);

  let shared = { ...rest };

  const css = {
    width: size,
    height: size,
  };

  if (size) {
    shared = {
      ...shared,
      css,
    };
  }

  return <nature.img {...shared} ref={ref} src={fallbackSrc} alt={alt} />;
};

if (__DEV__) LazyImage.displayName = 'LazyImage';
