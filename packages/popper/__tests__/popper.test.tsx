import { getBoxShadow, toTransformOrigin } from '../src/popper.utils';

describe('@nature-ui/popper', () => {
  describe('toTransformOrigin', () => {
    test.each`
      origin            | transform
      ${'top'}          | ${'bottom center'}
      ${'top-start'}    | ${'bottom left'}
      ${'top-end'}      | ${'bottom right'}
      ${'bottom'}       | ${'top center'}
      ${'bottom-start'} | ${'top left'}
      ${'bottom-end'}   | ${'top right'}
      ${'left'}         | ${'right center'}
      ${'left-start'}   | ${'right top'}
      ${'left-end'}     | ${'right bottom'}
      ${'right'}        | ${'left center'}
      ${'right-start'}  | ${'left top'}
      ${'right-end'}    | ${'left bottom'}
    `(
      `given position of $origin should return $transform placement`,
      ({ origin, transform }) => {
        expect(toTransformOrigin(origin)).toBe(transform);
      },
    );
  });

  describe('getBoxShadow', () => {
    test.each`
      placement   | boxShadow
      ${'top'}    | ${'2px 2px 2px 0 var(--popper-arrow-shadow-color)'}
      ${'bottom'} | ${'-1px -1px 1px 0 var(--popper-arrow-shadow-color)'}
      ${'right'}  | ${'-1px 1px 1px 0 var(--popper-arrow-shadow-color)'}
      ${'left'}   | ${'1px -1px 1px 0 var(--popper-arrow-shadow-color)'}
    `(
      `given placement of $origin should return $boxShadow`,
      ({ placement, boxShadow }) => {
        expect(getBoxShadow(placement)).toBe(boxShadow);
      },
    );
  });
});
