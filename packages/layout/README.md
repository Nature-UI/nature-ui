# @nature-ui/layout

A set of layout primitives that make it super easy to manage page and
components.

## Installation

```sh
yarn add @nature-ui/layout

# or

npm i @nature-ui/layout
```

## Import Components

```jsx
import { Box, Stack, Badge, Divider } from '@nature-ui/layout';
```

## Usage

Box is just a `div` on steroids. It gives you the ability to pass style props

```jsx
<Box className='text-blue-500 hover:bg-red-600 hover:text-white'>
  Welcome to Box
</Box>
```

Stack is used to group elements and apply a spacing between them. It stacks it's
children vertically by default.

```jsx
<Stack spacing='20px'>
  <Box>Box 1</Box>
  <Box>Box 2</Box>
</Stack>
```

Badge is used to render a badge. It can comes in different variants and color
schemes as defined in the `theme.components.Badge`

```jsx
<Badge variant='solid' color='blue-500'>
  Verified <FaCheck />
</Badge>
```
