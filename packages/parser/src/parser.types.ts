import {
  SpaceProps,
  ColorProps,
  TypographyProps,
  LayoutProps,
  FlexboxProps,
  GridProps,
  BorderProps,
  PositionProps,
  OtherProps,
  BackgroundProps,
  ShadowProps,
  OutlineProps,
} from './configs';
import { PseudoProps } from './pseudo';

export type Responsive<V, T extends { breakpoints?: any }> =
  | V
  | (V | null)[]
  | { [K in keyof T['breakpoints']]?: V };

export interface Component {
  baseStyle?: any;
  variants?: any;
  sizes?: any;
  defaultProps?: {
    variant?: string;
    size?: string;
    colorScheme?: string;
  };
}

export interface StyleProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    FlexboxProps,
    GridProps,
    LayoutProps,
    BorderProps,
    ShadowProps,
    BackgroundProps,
    PositionProps,
    OutlineProps,
    OtherProps {}

export interface SystemProps extends StyleProps, PseudoProps<StyleProps> {}
