import { PortalManager } from '@nature-ui/portal';
import { render } from '@nature-ui/test-utils';
import { Drawer } from '../src';

describe('@nature-ui/drawer', () => {
  test('Drawer renders correctly', () => {
    const { asFragment } = render(
      <PortalManager>
        <Drawer isOpen onClose={jest.fn()} />
      </PortalManager>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
