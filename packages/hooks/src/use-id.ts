import { useId as useUID } from '@reach/auto-id';

const generatePrefix = (prefix: string, id: string) => {
  return `${prefix}-${id}`;
};

/**
 * Reack hook to generate unique id
 *
 * @param idProp the external id passed from the user
 * @param prefix prefix to append before the id
 */

export const useId = (idProp?: string, prefix?: string) => {
  const uuid = useUID() as string;
  const id = idProp ?? uuid;
  const result = prefix ? generatePrefix(prefix, id) : id;
  return result as string;
};

/**
 * React hook to generate ids for use in compound components
 *
 * @param idProp the external id passed from the user
 * @param prefixes array of prefixes to use
 *
 * @example
 *
 * ```js
 * const [buttonId, menuId] = useIds("52", "button", "menu")
 *
 * // buttonId will be `button-52`
 * // menuId will be `menu-52`
 * ```
 */

export const useIds = (idProp?: string, ...prefixes: string[]) => {
  const id = useId(idProp);
  return prefixes.map((prefix) => generatePrefix(prefix, id));
};
