import { render, screen, testA11y } from '@nature-ui/test-utils';
import { Avatar, AvatarGroup } from '../src';

describe('@nature-ui/avatar', () => {
  it('passes a11y test', async () => {
    await testA11y(
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>,
      {
        axeOptions: {
          rules: {
            'svg-img-alt': { enabled: false },
          },
        },
      },
    );
  });

  it('renders a number avatar showing count of truncated avatars', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    );
    const moreLabel = screen.getByText('+3');
    expect(moreLabel).toBeInTheDocument();
  });

  it('does not render a number avatar showing count of truncated avatars if max is equal to avatars given', async () => {
    const tools = render(
      <AvatarGroup max={4}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    );
    const moreLabel = tools.container.querySelector('.nature-avatar--excess');
    expect(moreLabel).not.toBeInTheDocument();
  });

  it('renders a number avatar showing count of truncated avatars', () => {
    const tools = render(
      <AvatarGroup max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    );

    const moreLabel = tools.getByText('+3');

    expect(moreLabel).toBeInTheDocument();
  });
});
