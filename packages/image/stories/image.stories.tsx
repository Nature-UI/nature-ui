import * as React from 'react';

import { Image } from '../src';

export default {
  title: 'Image/Image',
};

export const Basic = () => (
  <Image src='https://bit.ly/dan-abramov' alt='welcome' />
);

/**
 * Nature has support for fallback images
 * so in event the image falls to load, or while
 * the image is loading, you can show a fallback.
 *
 * NB: we recommend using a local image as fallback
 */
export const FallbackSrcExample = () => (
  <Image
    src='https://bit.ly/dan-abramov'
    fallbackSrc='https://via.placeholder.com/150'
  />
);

/**
 * You can also pass a fallback component
 * in case you need to show something custom
 */
export const FallbackElementExample = () => (
  <Image
    src='https://bit.ly/dan-abramov'
    fallback={
      <div
        style={{
          width: 240,
          height: 240,
          background: 'red',
        }}
      />
    }
  />
);

/**
 * Fit images to their own dimensions by passing
 * `fit` prop which is equivalent to `object-fit`
 * in CSS
 */
export const withFit = () => (
  <Image
    src='https://bit.ly/divine_n'
    fallbackSrc='https://via.placeholder.com/240'
    fit='cover'
    width='400px'
    height='300px'
  />
);

export const withSize = () => (
  <Image
    src='https://bit.ly/divine_n'
    fallbackSrc='https://via.placeholder.com/240'
    size='150px'
  />
);

// TODO: Add support for `htmlWidth` and `htmlHeight`
export const withNativeWidth = () => (
  <Image
    src='https://bit.ly/divine_n'
    fallbackSrc='https://via.placeholder.com/240'
    width='300px'
    height='300px'
    onLoad={() => {
      console.log('loaded');
    }}
  />
);

export const Bug = () => {
  const [src, setSrc] = React.useState('');

  const onClick = () => {
    setSrc(
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    );
  };

  return (
    <div>
      <Image src={src} />
      <button onClick={onClick}>set image</button>
      <p>src set to Avatar: {src}</p>
    </div>
  );
};
