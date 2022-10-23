export interface UseCheckboxProps {
  /**
   * If `true`, the checkbox will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: boolean;
  /**
   * If `true`, the checkbox will be indeterminate.
   * This only affects the icon shown inside checkbox
   * and does not modify the isChecked property.
   */
  isIndeterminate?: boolean;
  /**
   * If `true`, the checkbox will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true` and `isDisabled` is passed, the checkbox will
   * remain tabbable but not interactive
   */
  isFocusable?: boolean;
  /**
   * If `true`, the checkbox will be readonly
   */
  isReadOnly?: boolean;
  /**
   * If `true`, the checkbox is marked as invalid.
   * Changes style of unchecked state.
   */
  isInvalid?: boolean;
  /**
   * If `true`, the checkbox input is marked as required,
   * and `required` attribute will be added
   */
  isRequired?: boolean;
  /**
   * If `true`, the checkbox will be initially checked.
   */
  defaultIsChecked?: boolean;
  /**
   * The callback invoked when the checked state of the `Checkbox` changes..
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * The name of the input field in a checkbox
   * (Useful for form submission).
   */
  name?: string;
  /**
   * The value to be used in the checkbox input.
   * This is the value that will be returned on form submission.
   */
  value?: string | number;
  /**
   * id assigned to input
   */
  id?: string;
  /**
   * Defines the string that labels the checkbox element.
   */
  'aria-label'?: string;
  /**
   * Refers to the `id` of the element that labels the checkbox element.
   */
  'aria-labelledby'?: string;
  'aria-invalid'?: true | undefined;
  'aria-describedby'?: string;
  tabIndex?: number;
}

export interface CheckboxState {
  isInvalid?: boolean;
  isFocused: boolean;
  isChecked: boolean;
  isActive: boolean;
  isHovered: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}
