/** @jsx jsx */
import { forwardRef, nature, PropsOf, jsx, clsx } from '@nature-ui/system';
import { css } from 'emotion';
import { IconProps } from '@nature-ui/icon';
import { darken, __DEV__ } from '@nature-ui/utils';

import { useCheckbox, UseCheckboxProps } from './use-checkbox';
import { useCheckboxGroupContext } from './checkbox-group';
import { CheckboxIcon } from './checkbox-icon';

const transition = css`
  transition-property: box-shadow;
  transition-duration: 250ms;
  transition-timing-function: ease;
  transition-delay: 0s;
`;
const StyledControl = forwardRef<
  PropsOf<typeof nature.div> & {
    color?: string;
  }
>(({ color = 'pink-500', ...props }, ref) => {
  const _checked = typeof props['data-checked'] !== 'undefined';
  const _active = typeof props['data-active'] !== 'undefined';
  const _focus = typeof props['data-focus'] !== 'undefined';
  const _indeterminate = typeof props['data-indeterminate'] !== 'undefined';
  const _disabled = typeof props['data-disabled'] !== 'undefined';
  const _invalid = typeof props['data-invalid'] !== 'undefined';
  const _hover = typeof props['data-hover'] !== 'undefined';

  const _darken = darken(color, 100);

  const DEFAULT = css`
    /* background-origin: border-box; */
  `;

  const _className = clsx(
    `box-border inline-flex items-center justify-center align-top select-none flex-shrink-0 text-white ${transition} border-solid rounded w-4 h-4 p-0 border-gray-300 ${DEFAULT}`,
    {
      [`bg-${color}`]: _checked,
      [`shadow-outline`]: _focus,
      [`bg-${_darken}`]: _hover && _checked,
      'border-2': !_checked && !_focus,
      /*
       * [indeterminate]: _indeterminate,
       * [disabled]: _disabled,
       * [invalid]: _invalid,
       * [hover]: _hover,
       */
    }
  );

  return <nature.div className={_className} ref={ref} {...props} />;
});

const StyledLabel = forwardRef<
  PropsOf<typeof nature.div> & { spacing?: number | string }
>(({ spacing, ...props }, ref) => {
  const styles = css`
    margin-left: ${spacing};
  `;

  const _className = `select-none ${styles}`;

  return <nature.div className={_className} ref={ref} {...props} />;
});

const Label = nature('label');
const StyledWrapper = forwardRef<PropsOf<typeof Label>>(
  ({ className = '', ...props }, ref) => {
    const _className = clsx(
      `cursor-pointer inline-flex items-center align-top relative ${transition}`,
      {
        [className]: className,
      }
    );

    return <Label className={_className} ref={ref} {...props} />;
  }
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
export const Checkbox = forwardRef<CheckboxProps>((props, ref) => {
  const group = useCheckboxGroupContext();

  const { className = '', spacing = '0.5rem', children, ...rest } = props;

  const SPACING = typeof spacing === 'string' ? spacing : `${spacing}px`;

  let isChecked = props.isChecked;

  if (group?.value && props.value) {
    isChecked = group.value.includes(props.value);
  }

  let onChange = props.onChange;

  if (group?.onChange && props.value) {
    onChange = group.onChange;
  }

  const {
    state,
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    htmlProps,
  } = useCheckbox({
    ...rest,
    isChecked,
    onChange,
  });

  return (
    <StyledWrapper className={className} {...htmlProps}>
      <input {...getInputProps({ ref })} />
      <StyledControl {...getCheckboxProps()}>
        <CheckboxIcon
          isChecked={state.isChecked}
          isIndeterminate={state.isIndeterminate}
          // FIXME: Make sizes `dynamic`
          size='10'
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
