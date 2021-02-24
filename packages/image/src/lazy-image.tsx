import React from 'react';

import { nature } from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import { useInView, IntersectionOptions } from 'react-intersection-observer';

import { ImageProps, useImage } from '.';

type LazyImageType = ImageProps & {
  options?: IntersectionOptions;
};
export const LazyImage = (props: LazyImageType) => {
  const {
    src,
    fallbackSrc,
    alt,
    options,
    loading,
    size,
    fallback,
    ...rest
  } = props;

  const [ref, inView, entry] = useInView(options);

  const status = useImage(props);

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

  React.useEffect(() => {
    if (status !== 'loaded') {
      if (fallback && entry) {
        (entry as any).target = fallback;
      }
    }

    if (inView && entry) {
      (entry as any).target.src = src;
      // if (status === 'loaded') (entry as any).target.src = src;
    }
  }, [inView, entry]);

  return <nature.img {...shared} ref={ref} src={fallbackSrc} alt={alt} />;
};

if (__DEV__) LazyImage.displayName = 'LazyImage';
