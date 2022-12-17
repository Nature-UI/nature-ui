import { IconProps } from '@nature-ui/icon';
import {
  clsx,
  css,
  forwardRef,
  HTMLNatureProps,
  nature,
  PropsOf,
} from '@nature-ui/system';
import { __DEV__ } from '@nature-ui/utils';
import React from 'react';
import { useCheckboxGroupContext } from './checkbox-group';
import { CheckboxIcon } from './checkbox-icon';
import type { UseCheckboxProps } from './checkbox-types';
import { useCheckbox } from './use-checkbox';

interface ControlProps extends HTMLNatureProps<'div'> {
  /**
   * The size of the check icon
   * @default sm
   */
  size?: IconProps['size'];
}

function getBgAndHover(defaultClassName: string, className?: string) {
  let _className = `${className} ${defaultClassName}`;
  const hoverRegex = /hover:bg-\w+(-\d+)?/i;
  const bgRegex = /bg-\w+(-\d+)?/i;

  let baseHoverColor = _className.match(hoverRegex)?.[0] ?? '';
  _className = _className?.replace(hoverRegex, '');

  let baseBg = _className.match(bgRegex)?.[0] ?? '';

  return [baseHoverColor, baseBg];
}

const StyledControl = forwardRef<ControlProps, 'div'>((props, ref) => {
  const { color, ...rest } = props;
  const _checked = typeof props['data-checked'] !== 'undefined';
  const _focus = typeof props['data-focus'] !== 'undefined';
  const _indeterminate = typeof props['data-indeterminate'] !== 'undefined';
  const _disabled = typeof props['data-disabled'] !== 'undefined';
  const _invalid = typeof props['data-invalid'] !== 'undefined';
  const _hover = typeof props['data-hover'] !== 'undefined';

  const DEFAULTS =
    'box-border inline-flex items-center justify-center align-top select-none flex-shrink-0 text-white rounded w-4 h-4 p-0 transition-all duration-300 ease-in-out border-2';
  const defaultColor = 'bg-blue-500 hover:bg-blue-700';
  const [hoverColor, bg] = getBgAndHover(defaultColor, color);

  const _className = clsx(DEFAULTS, {
    [`border-none`]: (!_invalid && _checked) || _indeterminate,
    ['ring']: _focus,
    [bg]: (_checked && !_disabled) || _indeterminate,
    [hoverColor]: _hover && _checked && !_disabled,
    ['bg-gray-300']: _disabled,
    ['border-red-500']: _invalid,
  });

  return <nature.div className={_className} ref={ref} {...rest} />;
});

const StyledLabel = forwardRef<
  HTMLNatureProps<'span'> & { spacing?: number | string },
  'span'
>(({ spacing, ...props }, ref: React.Ref<HTMLSpanElement>) => {
  const _disabled = typeof props['data-disabled'] !== 'undefined';

  const styles = css`
    margin-left: ${spacing};
  `;

  const _className = clsx(`select-none ${styles}`, {
    'text-gray-400': _disabled,
  });

  return <nature.span className={_className} ref={ref} {...props} />;
});

const StyledWrapper = forwardRef<HTMLNatureProps<'label'>, 'label'>(
  ({ className = '', ...props }, ref: React.Ref<HTMLLabelElement>) => {
    const _className = clsx(
      'cursor-pointer inline-flex items-center align-top relative',
      {
        [className]: className,
      },
    );

    return <nature.label className={_className} ref={ref} {...props} />;
  },
);

type Omitted = 'checked' | 'defaultChecked';

export type CheckboxProps = Omit<ControlProps, 'onChange' | 'defaultChecked'> &
  Omit<PropsOf<'input'>, Omitted> &
  UseCheckboxProps & {
    /**
     * The color of the check icon
     */
    iconColor?: IconProps['color'];
    spacing?: number | string;
    /**
     * If `true`, the checkbox should take up the full width of the parent.
     */
    isFullWidth?: boolean;
    /**
     * The size of the check icon
     * @default sm
     */
    size?: IconProps['size'];
  };

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 */
export const Checkbox = forwardRef<CheckboxProps, 'input'>((props, ref) => {
  const group = useCheckboxGroupContext();

  const {
    className,
    spacing = '0.5rem',
    iconColor,
    children,
    color,
    size,
    ...rest
  } = props;

  const SPACING = typeof spacing === 'string' ? spacing : `${spacing}px`;

  let { isChecked } = props;

  if (group?.value && props.value) {
    isChecked = group.value.includes(props.value);
  }

  let { onChange } = props;

  if (group?.onChange && props.value) {
    onChange = group.onChange;
  }

  const { state, getInputProps, getCheckboxProps, getLabelProps, htmlProps } =
    useCheckbox({
      ...rest,
      isChecked,
      onChange,
    });

  return (
    <StyledWrapper className={className} {...htmlProps}>
      <input {...getInputProps({ ref })} />
      <StyledControl color={color} {...getCheckboxProps()}>
        <CheckboxIcon
          isChecked={state.isChecked}
          isIndeterminate={state.isIndeterminate}
          size={size}
          className={`inline-block flex-shrink-0 leading-4 align-middle transition-all duration-300 ease-in-out text-${
            iconColor || 'current'
          }`}
        />
      </StyledControl>
      {children && (
        <StyledLabel spacing={SPACING} {...getLabelProps()}>
          {children}
        </StyledLabel>
      )}
    </StyledWrapper>
  );
});

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}
