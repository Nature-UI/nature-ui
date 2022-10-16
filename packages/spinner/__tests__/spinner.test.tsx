import { render, testA11y } from '@nature-ui/test-utils';
import { Spinner } from '../src';

test('Spinner renders correctly', async () => {
  const { container } = render(<Spinner />);
  await testA11y(container);
});
