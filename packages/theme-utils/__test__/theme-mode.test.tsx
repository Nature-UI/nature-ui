import { render } from '@nature-ui/test-utils';
import { ColorModeScript, setMode } from '../src/theme-mode';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('Theme mode tests', () => {
  test('Returns current theme mode', async () => {
    render(<ColorModeScript />);

    const mode = setMode();
    expect(mode).toStrictEqual('light');

    const dark = setMode('dark');
    expect(dark).toStrictEqual('dark');

    const light = setMode('light');
    expect(light).toStrictEqual('light');
  });
  test('Script is in the Document', () => {
    const { container } = render(<ColorModeScript />);
    const script = container.querySelector('script');

    expect(script).toBeInTheDocument();
  });
});
