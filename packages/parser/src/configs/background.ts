import * as CSS from 'csstype';
import { createParser } from '../create-parser';
import { Config, Length, ResponsiveValue } from '../utils';

/**
 * The parser configuration for common background properties
 */
const config: Config = {
  bg: {
    property: 'background',
    scale: 'colors',
  },
  bgColor: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  background: {
    property: 'background',
    scale: 'colors',
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  bgImage: {
    property: 'backgroundImage',
  },
  bgImg: {
    property: 'backgroundImage',
    deprecated: true,
    replacement: 'bgImage',
  },
  bgBlendMode: {
    property: 'backgroundBlendMode',
  },
  bgSize: {
    property: 'backgroundSize',
  },
  bgPosition: {
    property: 'backgroundPosition',
  },
  bgPos: {
    property: 'backgroundPosition',
    deprecated: true,
    replacement: 'bgPosition',
  },
  bgRepeat: {
    property: 'backgroundRepeat',
  },
  bgAttachment: {
    property: 'backgroundAttachment',
  },
};

/**
 * The prop types for background properties listed above
 */
export interface BackgroundProps {
  /**
   * The CSS `background` property
   */
  bg?: ResponsiveValue<CSS.Property.Background<Length>>;
  /**
   * The CSS `background` property
   */
  background?: ResponsiveValue<CSS.Property.Background<Length>>;
  /**
   * The CSS `background-color` property
   */
  bgColor?: ResponsiveValue<CSS.Property.BackgroundColor>;
  /**
   * The CSS `background-color` property
   */
  backgroundColor?: ResponsiveValue<CSS.Property.BackgroundColor>;
  /**
   * The CSS `background-image` property
   */
  backgroundImage?: ResponsiveValue<CSS.Property.BackgroundImage>;
  /**
   * The CSS `background-blend-mode` property
   */
  backgroundBlendMode?: ResponsiveValue<CSS.Property.BackgroundBlendMode>;
  /**
   * The CSS `background-blend-mode` property
   */
  bgBlendMode?: ResponsiveValue<CSS.Property.BackgroundBlendMode>;
  /**
   * The CSS `background-size` property
   */
  backgroundSize?: ResponsiveValue<CSS.Property.BackgroundSize<Length>>;
  /**
   * The CSS `background-position` property
   */
  bgPos?: ResponsiveValue<CSS.Property.BackgroundPosition<Length>>;
  /**
   * The CSS `background-position` property
   */
  backgroundPosition?: ResponsiveValue<CSS.Property.BackgroundPosition<Length>>;
  /**
   * The CSS `background-image` property
   */
  bgImage?: ResponsiveValue<CSS.Property.BackgroundImage>;
  /**
   * The CSS `background-image` property
   */
  bgImg?: ResponsiveValue<CSS.Property.BackgroundImage>;
  /**
   * The CSS `background-repeat` property
   */
  bgRepeat?: ResponsiveValue<CSS.Property.BackgroundRepeat>;
  /**
   * The CSS `background-repeat` property
   */
  backgroundRepeat?: ResponsiveValue<CSS.Property.BackgroundRepeat>;
  /**
   * The CSS `background-size` property
   */
  bgSize?: ResponsiveValue<CSS.Property.BackgroundSize<Length>>;
  /**
   * The CSS `background-attachment` property
   */
  bgAttachment?: ResponsiveValue<CSS.Property.BackgroundAttachment>;
  /**
   * The CSS `background-attachment` property
   */
  backgroundAttachment?: ResponsiveValue<CSS.Property.BackgroundAttachment>;
  /**
   * The CSS `background-position` property
   */
  bgPosition?: ResponsiveValue<CSS.Property.BackgroundPosition<Length>>;
}

/**
 * Create the parser for the config object
 */
export const background = createParser(config);
