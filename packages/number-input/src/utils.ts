const FLOATING_POINT_REGEX = /^[Ee0-9+\-.]$/;

/**
 * Determine if a character is a DOM floating point character
 * @see https://www.w3.org/TR/2012/WD-html-markup-20120329/datatypes.html#common.data.float
 */
export const isFloatingPointNumericCharacter = (character: string): boolean =>
  FLOATING_POINT_REGEX.test(character);

/**
 * Determine if the event is a valid numeric keyboard event.
 * We use this so we can prevent non-numeric characters in the input
 */
export const isValidNumericKeyboardEvent = (
  event: React.KeyboardEvent,
): boolean => {
  if (event.key == null) return true;

  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;

  if (isModifierKey) return true;

  const isSingleCharacterKey = event.key.length === 1;

  if (!isSingleCharacterKey) return true;

  return isFloatingPointNumericCharacter(event.key);
};
