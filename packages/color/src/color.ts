import tinyColor from 'tinycolor2';
import { isEmptyObject } from '@nature-ui/utils';
import { css } from 'emotion';

/**
 * Determines if the tone of a given color is `light` or `dark`
 * @param color - the color in hex, rgb or hsl
 */
export const tone = (color: string) => {
  const isDark = tinyColor(color).isDark();

  return isDark ? 'dark' : 'light';
};

/**
 * Determines if a color tone is "dark"
 * @param color - the color in hex, rgb, or hsl
 */
export const isDark = (color: string) => tone(color) === 'dark';

/**
 * Determines if a color tone is "dark"
 * @param color - the color in hex, rgb, or hsl
 */
export const isLight = (color: string) => tone(color) === 'light';

/**
 * Make a color transparent
 * @param color - the color in hex, rgb, or hsl
 * @param opacity - the amount white to add
 */
export const transparentize = (color: string, opacity: number) =>
  tinyColor(color).setAlpha(opacity).toRgbString();

/**
 * Add white to a color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add (0-1)
 */
export const whiten = (color: string, amount: number) =>
  tinyColor.mix(color, '#fff', amount).toHexString();

/**
 * Add black to a color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add (0-1)
 */
export const blacken = (color: string, amount: number) =>
  tinyColor.mix(color, '#000', amount).toHexString();

/**
 * Darken a specified color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add (0-1)
 */
export const darken = (color: string, amount: number) =>
  tinyColor(color).darken(amount).toHexString();

export const lighten = (color: string, amount: number) =>
  tinyColor(color).lighten(amount).toHexString();

/**
 * Checks the contract ratio of between 2 colors,
 * based on the Web Content Accessibility Guidelines (Version 2.0).
 *
 * @param fg - the foreground or text color
 * @param bg - the background color
 */
export const contrast = (fg: string, bg: string) =>
  tinyColor.readability(bg, fg);

/**
 * Checks if a color meets the Web Content Accessibility
 * Guidelines (Version 2.0) for constract ratio.
 *
 * @param fg - the foreground or text color
 * @param bg - the background color
 */
export const isAccessible = (
  textColor: string,
  bgColor: string,
  options?: tinyColor.WCAG2Options,
) => tinyColor.isReadable(bgColor, textColor, options);

export const complementary = (color: string) =>
  tinyColor(color).complement().toHexString();

export const generateStripe = (
  size = '1rem',
  color = 'rgba(255, 255, 255, 0.15)',
): string => {
  return css`
    background-image: linear-gradient(
      45deg,
      ${color} 25%,
      transparent 25%,
      transparent 50%,
      ${color} 50%,
      ${color} 75%,
      transparent 75%,
      transparent
    );
    background-size: ${size} ${size};
  `;
};

interface RandomColorOptions {
  /**
   * If passed, string will be used to generate
   * random color
   */
  string?: string;
  /**
   * List of colors to pick from at random
   */
  colors?: string[];
}

export const randomColorFromString = (str: string): string => {
  let hash = 0;

  if (str.length === 0) return hash.toString();

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash &= hash;
  }

  let color = '#';

  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 255;

    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};

export const randomColorFromList = (str: string, list: string[]): string => {
  let index = 0;

  if (str.length === 0) return list[0];

  for (let i = 0; i < str.length; i++) {
    index = str.charCodeAt(i) + ((index << 5) - index);
    index &= index;
  }

  index = ((index % list.length) + list.length) % list.length;

  return list[index];
};

export const randomFromList = (list: string[]): string => {
  return list[Math.floor(Math.random() * list.length)];
};

export const randomColor = (opts?: RandomColorOptions): string => {
  const fallback = tinyColor.random().toHexString();

  if (!opts || isEmptyObject(opts)) {
    return fallback;
  }

  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }

  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }

  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }

  return fallback;
};
