import { render, screen, testA11y } from '@nature-ui/test-utils';
import { Image, ImageProps } from '../src';

const src = 'https://image.xyz/source';
const fallbackSrc = 'https://image.xyz/placeholder';

const setup = (props?: ImageProps) => {
  return render(<Image src={src} fallbackSrc={fallbackSrc} {...props} />);
};

describe('@nature-ui/image', () => {
  test('creates an instance of Image when mounted', () => {
    const { getByRole } = setup();

    expect(getByRole('img')).toBeInstanceOf(HTMLImageElement);
  });

  it('passes a11y test', async () => {
    await testA11y(<Image alt='img' src={src} fallbackSrc={fallbackSrc} />);
  });

  it('renders placeholder first, before image load', async () => {
    setup();

    expect(screen.getByRole('img')).toHaveAttribute('src', fallbackSrc);
  });

  it('renders image if there is no fallback behavior defined', async () => {
    render(<Image src={src} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', src);
  });
});
