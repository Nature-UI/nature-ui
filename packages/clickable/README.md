# @nature-ui/clickable

React hook that implements all the interactions of a native `button` component
with support for making it focusable even if it's disabled.

It can be used with both native button elements or other elements (like `div`).

## Installation

```jsx
import { useClickable } from '@nature-ui/clickable';
```

## Usage

```jsx
// create a clickable primitive
const Clickable = (props) => {
  const clickable = useClickable(props);
  return <button display='inline-flex' {...clickable} />;
};

// use the clickable primitive
const Example = () => (
  <Clickable isDisabled isFocusable>
    {({ disabled, 'aria-disabled': Disabled }: ClickableProps) => {
      return (
        <span
          style={{
            opacity: disabled || Disabled ? 0.5 : 1,
            pointerEvents: disabled || Disabled ? 'none' : 'initial',
          }}
        >
          Clickable
        </span>
      );
    }}
  </Clickable>
);
```
