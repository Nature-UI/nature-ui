/** ** */
import { IconProps } from '@nature-ui/icon';
import { clsx, css, forwardRef, nature, PropsOf } from '@nature-ui/system';
import { darken, __DEV__ } from '@nature-ui/utils';
import React from 'react';
import { useCheckboxGroupContext } from './checkbox-group';
import { CheckboxIcon } from './checkbox-icon';
import { useCheckbox, UseCheckboxProps } from './use-checkbox';

const StyledControl = forwardRef<
  PropsOf<typeof nature.div> & { color?: string },
  'div'
>(({ color = 'pink-500', ...props }, ref) => {
  const _checked = typeof props['data-checked'] !== 'undefined';
  const _focus = typeof props['data-focus'] !== 'undefined';
  const _indeterminate = typeof props['data-indeterminate'] !== 'undefined';
  const _disabled = typeof props['data-disabled'] !== 'undefined';
  const _invalid = typeof props['data-invalid'] !== 'undefined';
  const _hover = typeof props['data-hover'] !== 'undefined';

  const _darken = darken(color, 100);

  const DEFAULTS =
    'box-border inline-flex items-center justify-center align-top select-none flex-shrink-0 text-white border-solid rounded w-4 h-4 p-0 border-gray-300 border-2 transition-all duration-300 ease-in-out';

  const _className = clsx(DEFAULTS, {
    [`bg-${color}`]: (_checked && !_disabled) || _indeterminate,
    'shadow-outline': _focus,
    [`bg-${_darken}`]: _hover && _checked && !_disabled,
    [`border-${color}`]: (!_invalid && _checked) || _indeterminate,
    'bg-gray-300': _disabled,
    'border-red-500': _invalid,
  });

  return <nature.div className={_className} ref={ref} {...props} />;
});

const StyledLabel = forwardRef<PropsOf<typeof nature.div>, 'div'>(
  (
    {
      spacing,
      ...props
    }: PropsOf<typeof nature.div> & { spacing?: number | string },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const _disabled = typeof props['data-disabled'] !== 'undefined';

    const styles = css`
      margin-left: ${spacing};
    `;

    const _className = clsx(`select-none ${styles}`, {
      'text-gray-400': _disabled,
    });

    return <nature.div className={_className} ref={ref} {...props} />;
  },
);

const Label = nature('label');
const StyledWrapper = forwardRef<PropsOf<typeof nature.div>, 'div'>(
  (
    { className = '', ...props }: PropsOf<typeof Label>,
    ref: React.Ref<HTMLLabelElement>,
  ) => {
    const _className = clsx(
      'cursor-pointer inline-flex items-center align-top relative',
      {
        [className]: className,
      },
    );

    return <Label className={_className} ref={ref} {...props} />;
  },
);

type BaseControlProps = Omit<
  PropsOf<typeof StyledControl>,
  'onChange' | 'defaultChecked'
>;

type Omitted = 'checked' | 'defaultChecked';

export type CheckboxProps = BaseControlProps &
  Omit<PropsOf<'input'>, Omitted> &
  UseCheckboxProps & {
    /**
     * The color of the check icon
     */
    iconColor?: IconProps['color'];
    /**
     * The size of the check icon
     * @default sm
     */
    iconSize?: IconProps['size'];
    spacing?: number | string;
    /**
     * If `true`, the checkbox should take up the full width of the parent.
     */
    isFullWidth?: boolean;
  };

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 */
export const Checkbox = forwardRef<PropsOf<typeof nature.div>, 'div'>(
  (props: CheckboxProps, ref: React.Ref<any>) => {
    const group = useCheckboxGroupContext();

    const {
      className = '',
      spacing = '0.5rem',
      iconColor,
      children,
      color = group?.color,
      iconSize,
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
            size={iconSize}
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
  },
);

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}
