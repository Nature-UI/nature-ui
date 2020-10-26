/** @jsx jsx */
import { jsx, nature, PropsOf, clsx } from '@nature-ui/system';
import { __DEV__, getValidChildren } from '@nature-ui/utils';
import * as React from 'react';

const DivTag = nature('div');

export type InputGroupProps = PropsOf<typeof DivTag> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | number;
};

const _SIZES = {
  sm: '2rem',
  md: '2.5rem',
  lg: '3rem',
};

export const InputGroup = React.forwardRef(
  (props: InputGroupProps, ref: React.Ref<any>) => {
    const { children = '', size = 'md', className, ...rest } = props;

    const _className = clsx('flex', className);

    const stylesRef = React.useRef<InputGroupProps>({});

    const validChildren = getValidChildren(children);

    const __size = typeof size === 'string' ? _SIZES[size] : `${size}px`;

    validChildren.forEach((child: any) => {
      if (!__size) return;

      if (child.type.__hidden === 'InputLeftElement') {
        stylesRef.current.css = {
          paddingLeft: size,
        };
      }

      if (child.type.__hidden === 'InputRightElement') {
        // stylesRef.current.paddingRight = __size
      }

      if (child.type.__hidden === 'InputRightAddon') {
        (stylesRef as any).current.borderRightRadius = 0;
      }

      if (child.type.__hidden === 'InputLeftAddon') {
        (stylesRef as any).current.borderLeftRadius = 0;
      }
    });

    const clones = validChildren.map((child: any) => {
      return child.type.__hidden !== 'Input'
        ? React.cloneElement(child, {})
        : React.cloneElement(child, {
            css: {
              borderTopRightRadius: (stylesRef as any).current
                ?.borderRightRadius,
              borderBottomRightRadius: (stylesRef as any).current
                ?.borderRightRadius,
              borderTopLeftRadius: (stylesRef as any).current?.borderLeftRadius,
              borderBottomLeftRadius: (stylesRef as any).current
                ?.borderLeftRadius,
            },
          });
    });

    return (
      <nature.div className={_className} ref={ref} {...rest}>
        {clones}
      </nature.div>
    );
  }
);
