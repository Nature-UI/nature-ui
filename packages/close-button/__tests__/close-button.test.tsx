import { render, testA11y } from '@nature-ui/test-utils';
import { CloseButton } from '../src';

describe('@nature-ui/close-button', () => {
  test('passes a11y test', async () => {
    await testA11y(<CloseButton />);
  });

  test('has the proper aria attributes', () => {
    const { getByLabelText } = render(<CloseButton />);

    expect(getByLabelText('Close')).toBeInTheDocument();
  });
});
