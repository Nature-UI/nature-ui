# @nature-ui/checkbox

Checkbox component is used in forms when a user needs to select multiple values
from several options.

## Installation

```sh
yarn add @nature-ui/checkbox

# or

npm i @nature-ui/checkbox
```

## Import component

```jsx
import { Checkbox, CheckboxGroup } from '@nature-ui/checkbox';
```

## Usage

```jsx
<Checkbox>This is a checkbox</Checkbox>
```

### CheckboxGroup

CheckboxGroup is used to bind multiple checkboxes into a group, and it indicates
whether one or more options are selected.

```jsx
<CheckboxGroup defaultValue={['one', 'two']}>
  <Stack spacing={24} direction='row'>
    <Checkbox value='one'>One</Checkbox>
    <Checkbox value='two'>Two</Checkbox>
    <Checkbox value='three'>Three</Checkbox>
  </Stack>
</CheckboxGroup>
```
