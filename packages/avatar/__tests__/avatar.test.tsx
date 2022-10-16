import { act, mocks, render, testA11y } from '@nature-ui/test-utils';
import { Avatar, AvatarBadge } from '../src';

describe('@nature-ui/avatar accessibility', () => {
  test('passes a11y test', async () => {
    await testA11y(<Avatar />, {
      axeOptions: {
        rules: {
          'svg-img-alt': { enabled: false },
        },
      },
    });
  });

  test('passes a11y test with AvatarBadge', async () => {
    await testA11y(
      <Avatar>
        <AvatarBadge />
      </Avatar>,
      {
        axeOptions: {
          rules: {
            'svg-img-alt': { enabled: false },
          },
        },
      },
    );
  });
});

describe('@nature-ui/avatar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    mocks.image().restore();
  });

  test('renders an image', async () => {
    const mock = mocks.image();
    mock.simulate('loaded');
    const tools = render(
      <Avatar src='https://bit.ly/dan-abramov' name='Dan Abramov' />,
    );

    act(() => {
      jest.runAllTimers();
    });

    const img = tools.getByAltText('Dan Abramov');
    expect(img).toBeInTheDocument();
  });

  test('fires onError if image fails to load', async () => {
    const mock = mocks.image();
    mock.simulate('error');

    const src = 'https://bit.ly/dan-abramov';
    const name = 'Dan Abramov';
    const onErrorFn = jest.fn();
    render(<Avatar src={src} name={name} onError={onErrorFn} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(onErrorFn).toHaveBeenCalledTimes(1);
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
