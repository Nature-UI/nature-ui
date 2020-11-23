import {
  parsePseudo,
  parser,
  StyleConfig,
  assignArray,
} from '@nature-ui/parser';
import { get, isArray, isObject, merge, runIfFn } from '@nature-ui/utils';

import { CSSObject, StyleObjectOrFn } from './css.types';
import {
  determineTheme,
  PropsOrTheme,
  transformWithConfig as tx,
} from './css.utils';

export const css = (styleObject: StyleObjectOrFn) => (props: PropsOrTheme) => {
  const theme = determineTheme(props); // todo: Remove this

  let computedStyles: CSSObject = {};

  const style = runIfFn(styleObject, theme);
  const styles = parsePseudo(style);

  const responsive = (prop: any, values: any, config: any) => {
    return assignArray({
      prop,
      values,
      transform: (_value: any) => {
        return tx(theme, _value, config);
      },
    });
  };

  for (const key in styles) {
    if (key) {
      const value = styles[key];

      const config = parser.config[key] as StyleConfig | undefined;

      if (key === 'apply') {
        const _style = css(get(theme, value))(theme);

        computedStyles = merge(computedStyles, _style);
      }

      if (isObject(value)) {
        computedStyles[key] = css(value)(theme);
      }

      if (isArray(value)) {
        if (config?.properties) {
          config.properties.forEach((prop: any) => {
            const _style = responsive(prop, value, config);

            console.log({ style });
            computedStyles = merge(computedStyles, _style);
          });
        }

        if (config?.property) {
          const _style = responsive(config.property, value, config);

          computedStyles = merge(computedStyles, _style);
        }

        if (config === true) {
          const _style = responsive(key, value, config);

          computedStyles = merge(computedStyles, _style);
        }

        if (isArray(value)) {
          const val = value.map((v: any) => css(v)(theme));
          const _style = responsive(key, val, config);

          computedStyles = merge(computedStyles, _style);
        }
      }

      if (config?.properties) {
        config.properties.forEach((prop: any) => {
          computedStyles[prop] = tx(theme, value, config);
        });
      }

      if (config?.property) {
        const _style = tx(theme, value, config);

        computedStyles[config.property] = _style;
      }

      computedStyles[key] = tx(theme, value, config);
    }
  }

  return computedStyles;
};

export default css;
