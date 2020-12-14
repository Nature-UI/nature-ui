# Spinner

Spinners provide a visual cue that an action is processing, awaiting a course of
change or a result.

## Installation

```sh
yarn add @nature-ui/spinner

# or

npm i @nature-ui/spinner
```

## Import component

```jsx
import { Spinner } from '@nature-ui/spinner';
```

## Usage

```jsx
<Spinner />
```

## Spinner with different sizes

Change the size of the spinner by passing the `size` prop.

```jsx
<>
  <Spinner size='xs' />
  <Spinner size='sm' />
  <Spinner size='md' />
  <Spinner size='lg' />
</>
```

## Spinner with color

Change the background color of the moving section of the spinner by passing the
`color` prop.

```jsx
<Spinner color='red-500' />
```
