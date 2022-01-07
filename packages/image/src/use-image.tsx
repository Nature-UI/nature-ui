import { useSafeLayoutEffect } from '@nature-ui/hooks';
import * as React from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

type NativeImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export type UseImageProps = {
  /**
   * The image `src` attribute
   */
  src?: string;
  /**
   * The image `srcset` attribute
   */
  srcSet?: string;
  /**
   * The image `sizes` attribute
   */
  sizes?: string;
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad?: NativeImageProps['onLoad'];
  /**
   * A callback for when there was an error loading the image `src`
   */
  onError?: NativeImageProps['onError'];
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   */
  ignoreFallback?: boolean;
  /**
   * The key used to set the crossOrigin on the HTMLImageElement into which the image will be loaded.
   * This tells the browser to request cross-origin access when trying to download the image data.
   */
  crossOrigin?: NativeImageProps['crossOrigin'];
  loading?: NativeImageProps['loading'];
};

type Status = 'loading' | 'failed' | 'pending' | 'loaded';
type ImageEvent = React.SyntheticEvent<HTMLImageElement, Event>;

/**
 * React hook that loads an image in the browser,
 * and let's us know the `status` so we can show image
 * fallback if it's still `pending`
 *
 * @returns the status of the image loading progress
 *
 * @example
 *
 * ```jsx
 * function App(){
 *   const status = useImage({ src: "image.png" })
 *   return status === "loaded" ? <img src="image.png" /> : <Placeholder />
 * }
 * ```
 */
export const useImage = (props: UseImageProps) => {
  const {
    src,
    srcSet,
    onLoad,
    onError,
    crossOrigin,
    sizes,
    ignoreFallback,
    loading,
  } = props;

  const [status, setStatus] = React.useState<Status>('pending');

  React.useEffect(() => {
    setStatus(src ? 'loading' : 'pending');
  }, [src]);

  const imageRef = React.useRef<HTMLImageElement | null>();

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };

  const load = React.useCallback(() => {
    if (!src) return;
    flush();
    const img = new Image();

    img.src = src;

    if (crossOrigin) img.crossOrigin = crossOrigin;
    if (srcSet) img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
    if (loading) img.loading = loading;

    img.addEventListener('load', (event) => {
      flush();
      setStatus('loaded');
      onLoad?.(event as unknown as ImageEvent);
    });
    img.addEventListener('error', (error) => {
      flush();
      setStatus('failed');
      onError?.(error as any);
    });

    imageRef.current = img;
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError, loading]);

  useSafeLayoutEffect(() => {
    /**
     * If user opts out of the fallback/placeholder
     * logic, let's bail out.
     */
    if (ignoreFallback) return;

    if (status === 'loading') {
      load();
    }

    return () => {
      flush();
    };
  }, [status, load, ignoreFallback]);

  /**
   * If user opts out of the fallback/placeholder
   * logic, let's just return 'loaded'
   */
  return ignoreFallback ? 'loaded' : status;
};

type UseLazyImage = Omit<UseImageProps, 'ignoreFallback'> & {
  options?: IntersectionOptions;
};

export const useLazyImage = (props: UseLazyImage) => {
  const { src, loading, srcSet, onLoad, onError, crossOrigin, sizes, options } =
    props;

  const [status, setStatus] = React.useState<Status>(() => {
    return src ? 'loading' : 'pending';
  });

  const [inViewRef, inView, entry] = useInView(options);

  React.useEffect(() => {
    setStatus(src ? 'loading' : 'pending');
  }, [src]);

  const flush = () => {
    if ((inViewRef as any).current) {
      (inViewRef as any).current.onload = null;
      (inViewRef as any).current.onerror = null;
      (inViewRef as any).current = null;
    }
  };

  const load = React.useCallback(() => {
    if (!src) return;
    flush();
    const img = new Image();

    img.src = src;

    if (crossOrigin) img.crossOrigin = crossOrigin;
    if (srcSet) img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
    if (loading) img.loading = loading;

    img.addEventListener('load', (event) => {
      flush();
      setStatus('loaded');
      onLoad?.(event as unknown as ImageEvent);
      (entry as any).target.src = src;
    });
    img.addEventListener('error', (error) => {
      flush();
      setStatus('failed');
      onError?.(error as any);
    });
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError, entry, loading]);

  useSafeLayoutEffect(() => {
    if (process.env.NODE_ENV === 'test' && entry) {
      (entry as any).target.src = src;
    }
    if (inView && entry && status === 'loading') {
      load();
    }

    return () => {
      flush();
    };
  }, [status, load, inView, entry]);

  return inViewRef;
};

export type UseImageReturn = ReturnType<typeof useImage>;
export type UseLazyImageReturn = ReturnType<typeof useLazyImage>;
