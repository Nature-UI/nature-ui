import * as CSS from 'csstype';
import { createParser } from '../create-parser';
import { Config, Length, ResponsiveValue } from '../utils';

const config: Config = {
  animation: true,
  appearance: true,
  transform: true,
  transformOrigin: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  transition: true,
  transitionProperty: true,
  transitionDuration: true,
  transitionTimingFunction: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true,
  listStyleType: true,
  listStylePosition: true,
  listStylePos: {
    property: 'listStylePosition',
    deprecated: true,
    replacement: 'listStylePosition',
  },
  listStyleImage: true,
  listStyleImg: {
    property: 'listStyleImage',
    deprecated: true,
    replacement: 'listStyleImage',
  },
};

export interface OtherProps {
  /**
   * The CSS `animation` property
   */
  animation?: ResponsiveValue<CSS.Property.Animation>;
  /**
   * The CSS `appearance` property
   */
  appearance?: ResponsiveValue<CSS.Property.Appearance>;
  /**
   * The CSS `transform` property
   */
  transform?: ResponsiveValue<CSS.Property.Transform>;
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: ResponsiveValue<CSS.Property.TransformOrigin<Length>>;
  /**
   * The CSS `visibility` property
   */
  visibility?: ResponsiveValue<CSS.Property.Visibility>;
  /**
   * The CSS `user-select` property
   */
  userSelect?: ResponsiveValue<CSS.Property.UserSelect>;
  /**
   * The CSS `pointer-events` property
   */
  pointerEvents?: ResponsiveValue<CSS.Property.PointerEvents>;
  /**
   * The CSS `cursor` property
   */
  cursor?: ResponsiveValue<CSS.Property.Cursor>;
  /**
   * The CSS `resize` property
   */
  resize?: ResponsiveValue<CSS.Property.Resize>;
  /**
   * The CSS `transition` property
   */
  transition?: ResponsiveValue<CSS.Property.Transition>;
  /**
   * The CSS `transition-property` property
   */
  transitionProperty?: ResponsiveValue<CSS.Property.TransitionProperty>;
  /**
   * The CSS `transition-timing-function` property
   */
  transitionTimingFunction?: ResponsiveValue<
    CSS.Property.TransitionTimingFunction
  >;
  /**
   * The CSS `transition-duration` property
   */
  transitionDuration?: ResponsiveValue<string>;
  /**
   * The CSS `object-fit` property
   */
  objectFit?: ResponsiveValue<CSS.Property.ObjectFit>;
  /**
   * The CSS `object-psition` property
   */
  objectPosition?: ResponsiveValue<CSS.Property.ObjectPosition<Length>>;
  /**
   * The CSS `float` property
   */
  float?: ResponsiveValue<CSS.Property.Float>;
  /**
   * The CSS `will-change` property
   */
  willChange?: ResponsiveValue<CSS.Property.WillChange>;
  /**
   * The CSS `list-style-type` property
   */
  listStyleType?: ResponsiveValue<CSS.Property.ListStyleType>;
  /**
   * The CSS `list-style-position` property
   */
  listStylePosition?: ResponsiveValue<CSS.Property.ListStylePosition>;
  /**
   * The CSS `list-style-position` property
   * @deprecated
   */
  listStylePos?: ResponsiveValue<CSS.Property.ListStylePosition>;
  /**
   * The CSS `list-style-image` property
   */
  listStyleImage?: ResponsiveValue<CSS.Property.ListStyleImage>;
  /**
   * The CSS `list-style-image` property
   * @deprecated
   */
  listStyleImg?: ResponsiveValue<CSS.Property.ListStyleImage>;
}

export const others = createParser(config);
