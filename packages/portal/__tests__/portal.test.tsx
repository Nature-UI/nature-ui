import * as React from 'react';
import { render } from '@nature-ui/test-utils';

import { PortalManager, Portal } from '../src';

describe('@nature-ui/portal', () => {
  test('should render portal', () => {
    const tools = render(
      <PortalManager>
        <Portal>This is a portal</Portal>
      </PortalManager>,
    );

    expect(tools.baseElement).toMatchSnapshot();
  });

  test('should render nested portal', () => {
    const tools = render(
      <PortalManager>
        <Portal>
          This is a portal.
          <Portal>This is a nested portal</Portal>
        </Portal>
      </PortalManager>,
    );

    expect(tools.baseElement).toMatchSnapshot();

    const portals = Array.from(
      tools.baseElement.querySelectorAll('.nature-portal'),
    );

    const [parentPortal, childPortal] = portals;
    expect(parentPortal).toContainElement(childPortal as HTMLElement);
  });

  test('should render into a custom container', () => {
    const Custom = () => {
      const ref = React.useRef<any>(null);
      return (
        <PortalManager>
          <div data-testid='container' ref={ref} />
          <Portal getContainer={() => ref.current}>
            <h1 data-testid='heading'>Hello world</h1>
          </Portal>
        </PortalManager>
      );
    };

    const tools = render(<Custom />);

    expect(tools.baseElement).toMatchSnapshot();

    const heading = tools.getByTestId('heading');
    const container = tools.getByTestId('container');

    expect(container).toContainElement(heading);
  });
});
