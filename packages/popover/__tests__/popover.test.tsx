import { render, waitFor } from '@nature-ui/test-utils';
import { usePopover } from '../src';

const Component = () => {
  const { getTriggerProps, getPopoverProps, onClose } = usePopover();

  console.log(onClose);
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
    const { asFragment, container } = render(<Component />);
    await waitFor(() => expect(container).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });

  // test('has proper aria attributes', async () => {
  //   const utils = render(<Component />);
  //   const trigger = utils.getByText(/open/i);

  //   expect(trigger).toHaveAttribute('aria-expanded', 'false');
  //   expect(utils.getByRole('dialog', { hidden: true })).toHaveAttribute(
  //     'aria-hidden',
  //     'true',
  //   );

  //   // open the popover
  //   fireEvent.click(trigger);
  //   await waitFor(() => expect(utils.container).toBeInTheDocument());

  //   expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  //   expect(trigger).toHaveAttribute('aria-expanded', 'true');
  //   expect(trigger).toHaveAttribute(
  //     'aria-controls',
  //     expect.stringContaining('popover-content'),
  //   );
  //   expect(utils.getByRole('dialog')).not.toHaveAttribute('aria-hidden');
  // });

  // test('can open and close the popover', async () => {
  //   const utils = render(<Component />);

  //   // open the popover
  //   fireEvent.click(utils.getByText(/open/i));
  //   await waitFor(() => expect(utils.container).toBeInTheDocument());

  //   // close the popover (since we can click the button, we verify that it's
  //   // displayed)
  //   fireEvent.click(utils.getByText(/close/i));
  //   await waitFor(() => expect(utils.container).toBeInTheDocument());

  //   // verify that content isn't displayed after closing
  //   expect(utils.queryByText(/content/i)).not.toBeVisible();
  // });

  // test('can close the popover by pressing escape', async () => {
  //   const utils = render(<Component />);

  //   // open the popover
  //   fireEvent.click(utils.getByText(/open/i));
  //   await waitFor(() => expect(utils.container).toBeInTheDocument());

  //   // close the popover with escape
  //   fireEvent.keyDown(utils.getByRole('dialog'), { key: 'Escape' });
  //   await waitFor(() => expect(utils.container).toBeInTheDocument());

  //   // verify popover is hidden
  //   utils.getByRole('dialog', { hidden: true });
  // });
});
