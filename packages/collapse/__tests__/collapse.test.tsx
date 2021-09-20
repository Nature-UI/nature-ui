import { render } from '@nature-ui/test-utils';
import { Collapse } from '../src';

jest.mock('react-transition-group/Transition', () => {
  const FakeTransition = jest.fn(({ children }) => children());

  return FakeTransition;
});

test('Collapse renders correctly', () => {
  const utils = render(<Collapse>sfsjdfkbfkjdfdjksf</Collapse>);

  expect(utils.asFragment()).toMatchSnapshot();
});
