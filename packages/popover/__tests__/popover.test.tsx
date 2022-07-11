import { render, screen } from '@nature-ui/test-utils';
import { usePopover } from '../src';

// TODO: Test this component
const Component = () => {
  const { getTriggerProps, getPopoverProps, onClose } = usePopover();

  return (
    <div>
      <button {...getTriggerProps()}>Open</button>
      <div {...getPopoverProps()}>Popover content</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

describe('@nature-ui/popover', () => {
  test('Popover renders correctly', async () => {
    render(<Component />);
    expect(screen.getByText('Open')).toBeInTheDocument();
  });
});
