import * as React from 'react';
import { createContext } from '@nature-ui/utils';

import { useDescendant, useDescendants, DescendantContext } from '../src';

export default {
  title: 'Descendants',
  component: useDescendants,
};

type Context = DescendantContext<HTMLDivElement, { value?: string }>;

const [Provider, useDescendantCtx] = createContext<Context>({
  name: 'DescendantContext',
});

const Option = ({
  value,
  disabled,
  focusable,
}: {
  value?: string;
  disabled?: boolean;
  focusable?: boolean;
}) => {
  const context = useDescendantCtx();

  const ref = React.useRef<HTMLDivElement>(null);

  const index = useDescendant({
    element: ref.current,
    value,
    disabled,
    focusable,
    context,
  });

  return (
    <div ref={ref} tabIndex={0} data-value={value}>
      Option {index + 1}
    </div>
  );
};

const Select = ({ children }: { children?: React.ReactNode }) => {
  const context = useDescendants<HTMLDivElement, { value?: string }>();

  return <Provider value={context}>{children}</Provider>;
};

export const Default = () => (
  <Select>
    <Option value='option 1' />
    <div>
      <div>
        <Option value='option 2' />
      </div>
      <Option value='option 3' />
    </div>
  </Select>
);
