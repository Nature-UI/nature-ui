import { render } from '@nature-ui/test-utils';
import * as React from 'react';

import { Image, ImageProps } from '../src';

const src = 'https://image.xyz/source';
const fallbackSrc = 'https://image.xyz/placeholder';

// let imageOnload: any = null;

/**
 * Override Image global to save onload
 * setting here so that I can trigger it manually in my test
 */
/*
 * const trackImageOnload = () => {
 *   Object.defineProperty(window.Image.prototype, 'onload', {
 *     // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
 *     get() {
 *       return this._onload;
 *     },
 *     // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
 *     set(fn) {
 *       imageOnload = fn;
 *       this._onload = fn;
 *     },
 *   });
 * };
 */

const renderComponent = (props?: ImageProps) => {
  return render(
    <Image data-testid='img' src={src} fallbackSrc={fallbackSrc} {...props} />
  );
};

describe('@nature-ui/image', () => {
  test('creates an instance of Image when mounted', () => {
    const tools = renderComponent();
    const image = tools.getByTestId('img');

    expect(image).toBeInstanceOf(HTMLImageElement);
  });

  test('should render placeholder first, before image load', async () => {
    const tools = renderComponent();
    const image = tools.getByTestId('img');

    expect(image).toHaveAttribute('src', fallbackSrc);
  });

  /*
   * test('should fires onload', () => {
   *   trackImageOnload();
   */

  /*
   *   const onLoad = jest.fn();
   *   const tools = renderComponent({ onLoad });
   */

  //   const image = tools.getByTestId('img');

  /*
   *   act(() => {
   *     imageOnload();
   *   });
   */

  /*
   *   expect(image).toHaveAttribute('src', src);
   *   expect(onLoad).toHaveBeenCalledWith(expect.anything());
   * });
   */
});
