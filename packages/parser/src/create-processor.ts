import * as CSS from 'csstype';
import { isNull, Dict } from '@nature-ui/utils';
import { ResponsiveValue, sort } from './utils';

interface Options {
  /**
   * The CSS property the value maps to
   */
  property: keyof CSS.Properties;
  /**
   * The responsive value
   */
  value?: ResponsiveValue<string | number>;
  /**
   * Function to transform the value
   *
   * @param value the value object or array
   * @param scale the theme key
   * @param props the prop object that includes the theme
   */
  transform?: (value: any, scale: any, props?: any) => any;
  /**
   * The theme scale (raw values) to use
   */
  scale?: string;
  /**
   * The props object that includes the theme.
   */
  props?: any;
}

export const createProcessor = () => {
  const styles: Dict = {};

  return {
    apply: (options: Options) => {
      const { property, value } = options;

      if (isNull(value)) return;

      if (property) {
        styles[property] = value;
      }
    },
    value: () => sort(styles),
  };
};
