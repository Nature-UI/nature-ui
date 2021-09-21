import { render } from '@nature-ui/test-utils';
import { Spinner } from '../src';

test('Spinner renders correctly', () => {
  const { asFragment } = render(<Spinner />);

  expect(asFragment()).toMatchSnapshot();
});
