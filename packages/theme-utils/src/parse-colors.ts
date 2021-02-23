import { plugin } from 'tailwindcss/lib/plugins';

export const parseColors = plugin(
  ({ addComponents, addUtilities, theme, config }: any) => {
    // const darkSelector = 'nature-ui-dark';
    const colors = theme('colors');
    const prefixes = ['text', 'bg', 'border'];
    prefixes.forEach((prefix) => {
      Object.keys(colors).forEach((color) => {
        if (Array.isArray(color)) {
          const [light, dark] = color;
          console.log({ light, dark, prefix });
        }
      });
    });
    console.log({ addComponents, addUtilities, theme, config });
  },
);
