import { ColorMode, ColorModeScriptProps } from './types';

export const setMode = (initialValue: ColorMode = 'system') => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)');
  const systemPreference: ColorMode = isDark.matches ? 'dark' : 'light';

  let persistedPreference: ColorMode;

  try {
    persistedPreference = localStorage.getItem(
      'nature-ui-color-mode',
    ) as ColorMode;
  } catch (err) {
    console.log(
      'Nature UI: localStorage is not available. Color mode persistence might not work as expected',
    );
  }

  const isInStorage = typeof persistedPreference === 'string';

  let colorMode: ColorMode;

  if (isInStorage) {
    colorMode = persistedPreference;
  } else {
    colorMode = initialValue === 'system' ? systemPreference : initialValue;
  }

  if (colorMode) {
    const root = document.documentElement;
    root.style.setProperty('--nature-ui-color-mode', colorMode);
  }

  return colorMode;
};

export const ColorModeScript = (props: ColorModeScriptProps) => {
  const { initialColorMode = 'system' } = props;

  const html = `(${String(setMode)})('${initialColorMode}')`;
  return <script dangerouslySetInnerHTML={{ __html: html }} />;
};
