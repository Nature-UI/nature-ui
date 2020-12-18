# Button `@nature-ui/button`

Buttons are used as triggers for actions. They are used in forms, toolbars,
dialog footers and as stand-alone action triggers.

## Installation

```sh
yarn add @nature-ui/button

# or

npm i @nature-ui/button
```

## Import component

```jsx
import { Button } from '@nature-ui/button';
```

## Usage

```jsx
<Button color='green-500'>Button</Button>
```

### Button Sizes

Use the `size` prop to change the size of the button. You can set the value to
`xs`, `sm`, `md`, or `lg`.

```jsx
<Stack>
  <Button size='xs'>Button</Button>
  <Button size='sm'>Button</Button>
  <Button size='md'>Button</Button>
  <Button size='lg'>Button</Button>
</Stack>
```

### Button Variant

Use the `variant` prop to change the visual style of the Button. You can set the
value to `solid`, `ghost`, `outline`, or `link`.

```jsx
<Stack spacing='1rem'>
  <Button variant='solid'>Button</Button>
  <Button variant='outline'>Button</Button>
  <Button variant='ghost'>Button</Button>
  <Button variant='link'>Button</Button>
</Stack>
```

### Button loading state

Pass `isLoading` prop to the Button component to show it's loading state. You
can optionally pass `loadingText` prop.

You can also use a custom spinner to render your own spinner component.

```jsx
<Stack>
  <Button isLoading color='teal-500' variant='solid'>
    Email
  </Button>

  <Button isLoading color='teal-500' variant='outline' spinner={<BarSpinner />}>
    Submit
  </Button>
</Stack>
```
