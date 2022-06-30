import { render, screen, testA11y } from '@nature-ui/test-utils';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { LazyImage } from '../src';

const src = 'https://cutt.ly/HlcgdCt';
const fallback = 'https://cutt.ly/dlcgDQG';

describe('Lazy Image', () => {
  it('passes a11y test', async () => {
    await testA11y(
      <LazyImage src={src} fallbackSrc={fallback} alt='lazy-image' />,
    );
  });
  test('should render src because element is not intersecting', () => {
    render(
      <LazyImage src={src} fallbackSrc={fallback} data-testid='lazy-image' />,
    );

    const image = screen.getByTestId('lazy-image');
    expect(image).toBeInTheDocument();

    expect(image.getAttribute('src')).toStrictEqual(fallback);
  });

  test('should render fallbackSrc because element is intersecting', () => {
    render(<LazyImage src={src} fallbackSrc={fallback} alt='lazy-image' />);

    const image = screen.getByAltText('lazy-image');

    mockAllIsIntersecting(true);

    expect(image.getAttribute('src')).toStrictEqual(src);
  });
});
