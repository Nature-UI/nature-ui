# Input

Input component is a component that is used to get user input in a text field.

## Installation

```sh
yarn add @nature-ui/input

# or

npm i @nature-ui/input
```

## Import components

```jsx
import { Input } from '@nature-ui/input';
```

## Usage

```jsx
<Input placeholder='A simple input component' />
```

## Disabled

Pass the `isDisabled` prop to have the input in the disabled state.

```jsx
<Input isDisabled placeholder='A disabled input' />
```

## Invalid

Pass the `isInvalid` prop to have the input in the invalid state.

```jsx
<Input isInvalid placeholder='An invalid input' />
```

## Readonly

Pass the `isReadOnly` prop to have the input in the read-only state.

```jsx
<Input isReadOnly placeholder='An invalid input' />
```

## Sizes

Pass the `size` prop to change the size of the input. nature UI input size
values are: `sm`, `md` and `lg`. The size of the input component is `md` by
default.

```jsx
<>
  <Input size='sm' placeholder='A simple placeholder' />

  <Input size='md' placeholder='A simple placeholder' />

  <Input size='lg' placeholder='A simple placeholder' />
</>
```

## Variant

Pass the `variant` prop to change the visual appearance of the input component.
nature UI input variant types are: `outline`, `filled`, `flushed` and
`unstyled`.

```jsx
<>
  <Input variant='outline' placeholder='Outline' />
  <Input variant='filled' placeholder='Filled' />
  <Input variant='flushed' placeholder='Flushed' />
  <Input variant='unstyled' placeholder='Unstyled' />
</>
```

## Input with addon

Prepend or append an element, generally a label or a button to the input
component.

```jsx
<>
  <Input
    placeholder='Phone number...'
    type='number'
    addonLeft='+234'
    size='sm'
  />

  <br />

  <Input
    placeholder='your-website'
    defaultValue='divinehycenth'
    addonLeft='https://'
    addonRight='.com'
  />
</>
```

## Input with custom element

```jsx
<Input
  placeholder='Enter amount'
  type='number'
  addonRight={<CheckIcon color='green' />}
/>
```
