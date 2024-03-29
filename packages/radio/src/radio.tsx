import { clsx, css, forwardRef, nature, PropsOf } from '@nature-ui/system';
import { useRadioGroupContext } from './radio-group';
import { useRadio, UseRadioProps } from './use-radio';

type Omitted = 'onChange' | 'defaultChecked' | 'checked';

type BaseControlProps = Omit<PropsOf<typeof nature.div>, Omitted>;

export type RadioProps = UseRadioProps &
  BaseControlProps & {
    /**
     * The spacing between the checkbox and it's label text
     * @default 0.5rem
     */
    spacing?: string;
    /**
     * If `true`, the radio will occupy the full width of it's parent container
     */
    isFullWidth?: boolean;
    size?: 'sm' | 'md' | 'lg' | number;
    darkBg?: string;
    bg?: string;
    borderBg?: string;
    darkBorderBg?: string;
    wrapperClass?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  };

const _SIZES = {
  sm: '0.75rem',
  md: '1rem',
  lg: '1.25rem',
};

/**
 * Radio
 *
 * Radio component is used in forms when a user needs to select a single value from
 * several options.
 *
 * @see Docs https://nature-ui.com/components/radio
 */
export const Radio = forwardRef<RadioProps, 'input'>((props, ref) => {
  const group = useRadioGroupContext();

  const {
    spacing = '0.5rem',
    size = group?.size || 'md',
    children,
    isFullWidth,
    darkBg = group?.darkBg || 'bg-blue-700',
    bg = group?.bg || 'bg-blue-500',
    borderBg = group?.borderBg || 'border-blue-500',
    darkBorderBg = group?.darkBorderBg || 'border-blue-700',
    inputProps: htmlInputProps,
    ...radioProps
  } = props;

  let { isChecked } = props;

  if (group?.value && props.value) {
    isChecked = group.value === props.value;
  }

  let { onChange } = props;

  if (props.value && group?.onChange) {
    onChange = group.onChange;
  }

  const name = group?.name || props?.name;
  const _size = typeof size === 'string' ? _SIZES[size] : `${size}px`;

  const {
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    htmlProps: rest,
  } = useRadio({
    ...radioProps,
    isChecked,
    onChange,
    name,
  });

  const { style, ...inputProps } = getInputProps(htmlInputProps, ref);
  const checkboxProps = getCheckboxProps(rest);

  const { className, ..._rest } = checkboxProps as any;

  const _css = css`
    &::before {
      content: '';
      display: inline-block;
      position: relative;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background: currentColor;
    }
  `;

  const _focus = typeof checkboxProps['data-focus'] !== 'undefined';
  const _checked = typeof checkboxProps['data-checked'] !== 'undefined';
  const _invalid = typeof checkboxProps['data-invalid'] !== 'undefined';
  const _hover = typeof checkboxProps['data-hover'] !== 'undefined';
  const _disabled = typeof checkboxProps['data-disabled'] !== 'undefined';

  const _className = clsx(
    'nature-radio__control inline-flex items-center justify-center flex-shrink-0 border-2 border-solid rounded-full text-white transition-all duration-150',
    _css,
    {
      [`${borderBg} ${bg}`]: _checked && !_invalid,
      [`ring`]: _focus,
      'border-red-600': _invalid,
      [`${darkBg} ${darkBorderBg}`]: _hover && _checked && !_invalid,
      'bg-gray-300 text-gray-300': _disabled,
      'text-gray-500': _disabled && _checked,
    },
  );

  return (
    <nature.label
      className={clsx(
        'nature-radio inline-flex items-center align-top cursor-pointer',
        {
          'opacity-50': _disabled,
        },
        className,
      )}
      css={{
        width: isFullWidth ? 'full' : undefined,
      }}
    >
      <input
        className='nature-radio__input'
        style={style as any}
        {...inputProps}
      />
      <nature.div
        css={{
          width: _size,
          height: _size,
        }}
        {..._rest}
        className={_className}
      />
      {children && (
        <nature.div
          className='nature-radio__label select-none'
          css={{
            marginLeft: spacing,
          }}
          {...getLabelProps()}
        >
          {children}
        </nature.div>
      )}
    </nature.label>
  );
});
