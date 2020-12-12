# @nature-ui/breadcrumb

Breadcrumbs help users visualize their current location in relation to the rest
of the website or application by showing the hierarchy of pages.

## Installation

```sh
yarn add @nature-ui/breadcrumb

# or

npm i @nature-ui/breadcrumb
```

## Import components

Nature UI exports 3 breadcrumb related components:

- `Breadcrumb`: The parent container for breadcrumbs.
- `BreadcrumbItem`: Individual breadcrumb element containing a link and a
  divider.
- `BreadcrumbLink`: The breadcrumb link, obviously.

```js
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@nature-ui/breadcrumb';
```

## Usage

Add `isCurrent` prop to the `BreadcrumbItem` that matches the current path. When
this prop is present, the `BreadcrumbItem` doesn't have a separator, and the
`BreadcrumbLink` has `aria-current` set to `page`.

```jsx
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href='#'>Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href='#'>Docs</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem isCurrent>
    <BreadcrumbLink>Help</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

### Separators

Change the separator used in the breadcrumb by passing a string, like `-` or any
react element (e.g. an icon)

```jsx
<Breadcrumb separator='-'>
  <BreadcrumbItem>
    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href='/about'>About</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem isCurrent>
    <BreadcrumbLink href='/contact'>Contact</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

### Using an icon as the separator

```jsx
<Breadcrumb
  spacing='8px'
  separator={<Icon color='gray' name='chevron-right' />}
>
  <BreadcrumbItem>
    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href='/about'>About</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem isCurrent>
    <BreadcrumbLink href='/contact'>Contact</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```
