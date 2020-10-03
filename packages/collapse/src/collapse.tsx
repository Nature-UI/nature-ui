/** @jsx jsx */
import { jsx, nature, PropsOf } from '@nature-ui/system';
import {
  Transition,
  TransitionProps,
  TransitionStyles,
} from '@nature-ui/transition';
import { ariaAttr, mergeRefs, __DEV__, StringOrNumber } from '@nature-ui/utils';
import { useRect } from '@reach/rect';
import * as React from 'react';

export type CollapseProps = PropsOf<typeof nature.div> & {
  /**
   * If `true`, the content will be visible
   */
  isOpen?: boolean;
  /**
   * The height you want the content in it's collapsed state.
   * @default 0
   */
  startingHeight?: StringOrNumber;
  /**
   * Custom styles for the Transition component's appear, entered and exiting states
   */
  config?: TransitionProps['styles'];
  /**
   * If `true`, the opacity of the component will be animated
   * @default true
   */
  animatedOpacity?: boolean;
  /**
   * The CSS `transition-duration` (in ms) to apply for the collapse animation
   * @default 150
   */
  timeout?: StringOrNumber;
  /**
   * The CSS `transition-timing-function` to apply for the collapse animation
   *
   * @default `ease`
   */
  easing?: string;
};

export const Collapse = React.forwardRef(
  (props: CollapseProps, forwardedRef: React.Ref<any>) => {
    const {
      isOpen,
      children,
      config,
      startingHeight = 0,
      animatedOpacity = true,
      className,
      style: htmlStyles,
      timeout = 150,
      easing = 'ease',
      ...rest
    } = props;

    const getStr = (property: string) => `${property} ${timeout}ms ${easing}`;

    const transition = `${getStr('height')}, ${getStr('opacity')}, ${getStr(
      'transform'
    )}`;

    const [hidden, setHidden] = React.useState(true);

    type ChildElement = React.ReactElement<{ ref: React.Ref<any> }>;

    let child = children;

    if (typeof children === 'string') {
      child = <div>{children}</div>;
    }

    const _child = React.Children.only(child) as ChildElement;

    const ref = React.useRef<HTMLDivElement>(null);

    const rect = useRect(ref, true);
    const height = rect?.height ?? 0;

    const defaultConfig: TransitionStyles = {
      init: {
        height: startingHeight,
        opacity: startingHeight ? 1 : 0,
      },
      entered: {
        height,
        opacity: 1,
        transform: 'translateY(0)',
      },
      exiting: {
        height: startingHeight,
        opacity: startingHeight ? 1 : 0,
        transform: startingHeight > 0 ? 'translateY(0)' : 'translateY(-0.5rem)',
      },
    };

    return (
      <Transition
        in={isOpen}
        styles={config || defaultConfig}
        onEntered={() => setHidden(false)}
        onExited={() => setHidden(true)}
        timeout={{
          enter: 0,
          exit: Number(timeout),
        }}
        transition={transition}
        unmountOnExit={false}
      >
        {(_styles) => (
          <nature.div
            ref={forwardedRef}
            aria-hidden={ariaAttr(hidden)}
            {...rest}
            style={{
              ..._styles,
              overflow: 'hidden',
              opacity: animatedOpacity ? _styles.opacity : 1,
              willChange: 'height, opacity, transform',
              ...htmlStyles,
            }}
          >
            {React.cloneElement(_child, {
              ref: mergeRefs(ref, _child.props.ref),
            })}
          </nature.div>
        )}
      </Transition>
    );
  }
);

if (__DEV__) {
  Collapse.displayName = 'Collapse';
}
