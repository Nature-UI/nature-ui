import * as React from 'react';

import { mergeRefs } from '../src';

export default {
  title: 'Utils/MergeRefs',
};

const Refs = React.forwardRef(
  (
    props: {
      children: React.ReactElement;
    },
    forwardedRef: React.Ref<any>,
  ) => {
    type ChildElement = React.ReactElement<{ ref: React.Ref<any> }>;
    const _child = React.Children.only(props.children) as ChildElement;

    const ref = React.useRef<HTMLDivElement>(null);

    const _ref = mergeRefs(ref, _child.props.ref);

    console.log({ ref });

    return (
      <div ref={forwardedRef} {...props}>
        {React.cloneElement(_child, {
          ref: _ref,
        })}
      </div>
    );
  },
);

Refs.displayName = 'Refs';

export const Default = () => (
  <Refs>
    <div>Hello world from ref component</div>
  </Refs>
);
