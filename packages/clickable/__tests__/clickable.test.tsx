import * as React from 'react';
import { render, userEvent, fireEvent } from '@nature-ui/test-utils';
import { nature } from '@nature-ui/system';

import { useClickable } from '../src';
import { ClickableProps } from '../stories/use-clickable.stories';

const Clickable = React.forwardRef(
  (props: ClickableProps, ref: React.Ref<any>) => {
    const clickable = useClickable({
      ...props,
      ref,
    });

    const Button = nature('button');

    return <Button {...clickable} />;
  }
);

describe('@nature-ui/clickable', () => {
  test('should render correctly', () => {
    const tools = render(<Clickable>clickable</Clickable>);

    expect(tools.getByText('clickable')).toMatchInlineSnapshot(`
          <button
            type="button"
          >
            clickable
          </button>
        `);
  });

  test('should render when disabled and focusable', () => {
    const tools = render(
      <Clickable isDisabled isFocusable>
        clickable
      </Clickable>
    );

    expect(tools.getByText('clickable')).toMatchInlineSnapshot(`
      <button
        aria-disabled="true"
        type="button"
      >
        clickable
      </button>
    `);
  });

  test('should click correctly', () => {
    const fn = jest.fn();
    const tools = render(<Clickable onClick={fn}>clickable</Clickable>);
    const clickable = tools.getByText('clickable');

    expect(fn).toHaveBeenCalledTimes(0);
    userEvent.click(clickable);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should not click if disabled', () => {
    const fn = jest.fn();

    const tools = render(
      <Clickable onClick={fn} isDisabled>
        clickable
      </Clickable>
    );

    const clickable = tools.getByText('clickable');

    userEvent.click(clickable);
    expect(fn).toHaveBeenCalledTimes(0);
  });

  test('should not focus if disabled', () => {
    const tools = render(<Clickable isDisabled>clickable</Clickable>);
    const clickable = tools.getByText('clickable');

    expect(clickable).not.toHaveFocus();
    fireEvent.focus(clickable);
    expect(clickable).not.toHaveFocus();
  });

  test('non-native: should click on press `space` or `enter`', () => {
    const fn = jest.fn();
    const tools = render(
      <Clickable as='div' onClick={fn}>
        clickable
      </Clickable>
    );

    const clickable = tools.getByText('clickable');

    fireEvent.keyDown(clickable, { key: 'Enter' });
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(clickable, { key: ' ' });
    fireEvent.keyUp(clickable, { key: ' ' });
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
