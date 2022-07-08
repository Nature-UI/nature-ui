import { render, testA11y } from '@nature-ui/test-utils';
import { CircularProgress, Progress } from '../src';

describe('@nature-ui/circular-progress', () => {
  test('Progress renders correctly', async () => {
    await testA11y(
      <Progress
        aria-label='Account Usage'
        colorScheme='green'
        size='sm'
        value={20}
      />,
    );
  });
  it('Progress renders correctly', async () => {
    await testA11y(
      <CircularProgress
        aria-label='Account Usage'
        colorScheme='green'
        size='sm'
        value='20'
      />,
    );
  });

  // it('CircularProgress: has the proper aria, data, and role attributes', () => {
  //   const props = {
  //     trackColor: 'transparent',
  //     label: 'value',
  //     thickness: 10,
  //     value: 20,
  //   };
  //   const utils = render(<CircularProgress {...props} />);
  //   const progress = utils.getByRole('progressbar');

  //   expect(progress).not.toHaveAttribute('data-indeterminate');
  //   expect(progress).toHaveAttribute('aria-valuemax', '100');
  //   expect(progress).toHaveAttribute('aria-valuemin', '0');
  //   expect(progress).toHaveAttribute('aria-valuenow', '20');
  //   expect(progress).toHaveAttribute('aria-valuetext', 'value');

  //   // rerender as indeterminate
  //   utils.rerender(<CircularProgress {...props} value={undefined} />);

  //   expect(progress).toHaveAttribute('data-indeterminate');
  //   expect(progress).not.toHaveAttribute('aria-valuenow');

  //   // rerender with getValueText function
  //   utils.rerender(
  //     <CircularProgress
  //       {...props}
  //       getValueText={(value: any, percent: any) => `${value} (${percent}%)`}
  //     />,
  //   );

  //   expect(progress).toHaveAttribute('aria-valuetext', '20 (20%)');
  // });

  it('Progress: has the proper aria, data, and role attributes', () => {
    const { getByRole, rerender } = render(
      <Progress color='green' size='sm' value={20} />,
    );

    let progress = getByRole('progressbar');

    expect(progress).not.toHaveAttribute('data-indeterminate');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuenow', '20');
    expect(progress).not.toHaveAttribute('aria-valuetext');

    // rerender as indeterminate
    rerender(<Progress color='green' size='sm' isIndeterminate />);

    progress = getByRole('progressbar');

    expect(progress).toHaveAttribute('data-indeterminate');
    expect(progress).not.toHaveAttribute('aria-valuenow');
  });

  it('CircularProgress: has the proper aria, data, and role attributes', () => {
    const props = {
      trackColor: 'transparent',
      valueText: 'value',
      thickness: 10,
      value: 20,
    };
    const utils = render(<CircularProgress {...props} />);

    let progress = utils.getByRole('progressbar');

    expect(progress).not.toHaveAttribute('data-indeterminate');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuenow', '20');
    expect(progress).toHaveAttribute('aria-valuetext', 'value');

    // rerender as indeterminate
    utils.rerender(<CircularProgress {...props} isIndeterminate />);

    progress = utils.getByRole('progressbar');

    expect(progress).toHaveAttribute('data-indeterminate');
    expect(progress).not.toHaveAttribute('aria-valuenow');

    // rerender with getValueText function
    utils.rerender(
      <CircularProgress
        {...props}
        getValueText={(value, percent) => `${value} (${percent}%)`}
      />,
    );

    progress = utils.getByRole('progressbar');

    expect(progress).toHaveAttribute('aria-valuetext', '20 (20%)');
  });
});
