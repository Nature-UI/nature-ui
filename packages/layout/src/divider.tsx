import { clsx, css, forwardRef, nature, PropsOf } from '@nature-ui/system';

const DividerElem = nature('hr');

export type DividerProp = Omit<PropsOf<typeof DividerElem>, 'children'> & {
  orientation?: 'vertical' | 'horizontal';
};

export const Divider = forwardRef<DividerProp>((props, ref) => {
  const {
    className = '',
    color = 'gray-200',
    orientation = 'horizontal',
    ...rest
  } = props;

  const _className = clsx(className, 'mr-0 ml-0', {
    [`border-${color}`]: color,
    [`h-full border border-t-0 border-r-0 border-b-0 border-${color} ${css`
      width: 1px;
    `}`]: orientation === 'vertical',
  });

  return <DividerElem className={_className} {...rest} ref={ref} />;
});
