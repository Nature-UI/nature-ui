import { warn } from '@nature-ui/utils';
import { createProcessor } from './create-processor';
import { SystemProps } from './parser.types';
import { Config, transformConfig } from './utils';

type ParserProps<P> = SystemProps & {} & P;

export const createParser = (styleConfig: Config) => {
  const parser = <P = {}>(props: ParserProps<P>) => {
    /**
     * Create a style processor
     */
    const processor = createProcessor();

    const _config = transformConfig(styleConfig);

    for (const prop in props) {
      if (styleConfig[prop] === null) continue;

      const value = props[prop as keyof typeof props];

      const config = _config[prop];

      warn({
        condition: config.deprecated,
        message: `${prop} is deprecated. Kindly use ${config.replacement} instead`,
      });

      const options = { ...config, value, props };
      processor.apply(options);
    }

    return processor.value();
  };

  parser.config = styleConfig;
  parser.propNames = Object.keys(styleConfig);

  return parser;
};

export type Parser = ReturnType<typeof createParser>;
