import { __DEV__ } from './assertions';

export const warn = (options: { condition: boolean; message: string }) => {
  if (options.condition && __DEV__) {
    console.warn(options.message);
  }
};

export const error = (options: { condition: boolean; message: string }) => {
  if (options.condition && __DEV__) {
    console.error(options.message);
  }
};
