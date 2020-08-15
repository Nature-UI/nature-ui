/*
 * export type NatureJSXElements = {
 *     [Tag in D]
 * }
 */

import { As, NatureComponent } from './typings/system.types';

type NatureJSXElements = {
  [Tag in DOMElements]: ChakraComponent<Tag, {}>;
};

type CreateNatureComponent = {
  /**
   * The styled function and object that allows to create a
   * functional component that can receive chakra's style props.
   *
   * @param component - The base component or tag to render
   * @param attrs - The initial props to the component (valid html or component props)
   */
  <T extends As, P = {}>(component: T): NatureComponent<T, P>;
};

export const nature = CreateNatureComponent & NatureJSXElements;
