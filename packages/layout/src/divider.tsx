import { clsx, css, forwardRef, nature } from '@nature-ui/system';

export type DividerProp = {
  orientation?: 'vertical' | 'horizontal';
};

export const Divider = forwardRef<DividerProp, 'hr'>((props, ref) => {
  const {
    className = '',
    color = 'gray-200',
    orientation = 'horizontal',
    ...rest
  } = props;

  const _className = clsx(
    'mr-0 ml-0',
    {
      [`border-${color}`]: color,
      [`h-full border border-t-0 border-r-0 border-b-0 border-${color} ${css`
        width: 1px;
      `}`]: orientation === 'vertical',
    },
    className,
  );

  return <nature.hr className={_className} {...rest} ref={ref} />;
});
