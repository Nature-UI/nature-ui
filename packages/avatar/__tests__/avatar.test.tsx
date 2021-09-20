import { render } from '@nature-ui/test-utils';
import { Avatar, AvatarBadge } from '../src';

describe('@nature-ui/avatar', () => {
  test('avatar renders correctly', () => {
    const { asFragment } = render(<Avatar />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Avatar with AvatarBadge renders correctly', () => {
    const { asFragment } = render(
      <Avatar>
        <AvatarBadge />
      </Avatar>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders a name avatar if no src', () => {
    const name = 'Dan Abramov';
    const { getByLabelText } = render(<Avatar name='Dan Abramov' />);

    const img = getByLabelText(name);

    expect(img).toHaveTextContent('DA');
  });

  test('renders a default avatar if no name or src', () => {
    const { getByRole } = render(<Avatar />);

    expect(getByRole('img')).toBeInTheDocument();
  });
});
