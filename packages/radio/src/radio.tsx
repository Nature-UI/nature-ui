import { nature, clsx, PropsOf, css } from '@nature-ui/system';
import { darken, __DEV__ } from '@nature-ui/utils';
import * as React from 'react';

import { useRadioGroupContext } from './radio-group';
import { useRadio, UseRadioProps } from './use-radio';

const DivTag = nature('div');

type Omitted = 'onChange' | 'defaultChecked' | 'checked';

type BaseControlProps = Omit<PropsOf<typeof DivTag>, Omitted>;

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
    colorScheme?: string;
    wrapperClass?: string;
  };

const StyledWrapper = nature('label');

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
export const Radio = React.forwardRef(
  (props: RadioProps, ref: React.Ref<any>) => {
    const group = useRadioGroupContext();

    const {
      spacing = '0.5rem',
      size = group?.size || 'md',
      children,
      isFullWidth,
      colorScheme = 'blue-500',
      wrapperClass = '',
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

    const { style, ...inputProps } = getInputProps({ ref });
    const { ...checkboxProps } = getCheckboxProps(rest);

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

    const dark = darken(colorScheme, 100);

    const _focus = typeof checkboxProps['data-focus'] !== 'undefined';
    const _checked = typeof checkboxProps['data-checked'] !== 'undefined';
    const _invalid = typeof checkboxProps['data-invalid'] !== 'undefined';
    const _hover = typeof checkboxProps['data-hover'] !== 'undefined';
    const _disabled = typeof checkboxProps['data-disabled'] !== 'undefined';

    const _className = clsx(
      props.className,
      'nature-radio__control inline-flex items-center justify-center flex-shrink-0 border-2 border-solid rounded-full text-white transition-all duration-150',
      _css,
      {
        [`bg-${colorScheme} border-${colorScheme}`]: _checked && !_invalid,
        ring: _focus,
        'border-red-600': _invalid,
        [`bg-${dark} border-${dark}`]: _hover && _checked && !_invalid,
        'bg-gray-300 text-gray-300': _disabled,
        'text-gray-500': _disabled && _checked,
      },
    );

    return (
      <StyledWrapper
        className={clsx(
          wrapperClass,
          'nature-radio inline-flex items-center align-top',
          {
            'opacity-50': _disabled,
          },
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
        <DivTag
          css={{
            width: _size,
            height: _size,
          }}
          {...checkboxProps}
          className={_className}
        />
        {children && (
          <DivTag
            className='nature-radio__label select-none'
            {...getLabelProps()}
            css={{
              marginLeft: spacing,
            }}
          >
            {children}
          </DivTag>
        )}
      </StyledWrapper>
    );
  },
);

if (__DEV__) {
  Radio.displayName = 'Radio';
}
