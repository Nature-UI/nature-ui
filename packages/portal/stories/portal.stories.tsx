import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@nature-ui/popover';
import * as React from 'react';
import Frame from 'react-frame-component';
import { Portal, PortalManager } from '../src';

export default {
  title: 'Portal',
  component: Portal,
  decorators: [
    (Story: Function) => (
      <PortalManager>
        <Story />
      </PortalManager>
    ),
  ],
};

export const BasicPortal = () => (
  <>
    <p>Welcome</p>
    <Portal>This text has been portaled</Portal>
  </>
);

export const WithinFrame = () => (
  <Frame>
    <PortalManager>
      <h1>Welcome</h1>
      <Portal>Welcome</Portal>
    </PortalManager>
  </Frame>
);

export const WithMountRef = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <p>Welcome</p>
      <Portal containerRef={ref}>
        <span>This text has been portaled</span>
      </Portal>
      <div id='iframe' ref={ref}>
        Portal Div
      </div>
    </>
  );
};

function Wrapper(props: any) {
  const { offset, color, children } = props;
  return (
    <div
      style={{
        position: 'fixed',
        top: offset || '46%',
        left: offset || '46%',
        width: '200px',
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        backgroundColor: color,
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
}

export const NestedPortals = () => (
  <Portal>
    <Wrapper color='red'>Welcome</Wrapper>
    <Portal>
      <Wrapper offset='40%' color='green'>
        Welcome
      </Wrapper>
      <Portal>
        <Wrapper offset='30%' color='tomato'>
          Welcome
        </Wrapper>
      </Portal>
    </Portal>
  </Portal>
);

export const WithZIndexPopover = () => (
  <PortalManager zIndex={20}>
    <Popover isOpen>
      <PopoverTrigger>
        <p>Popover</p>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverBody>I am a popover</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  </PortalManager>
);

export const WithCustomContainer = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div>
      <Portal containerRef={ref}>
        <div className='baba'>
          Welcome man
          <Portal>Testing my powers</Portal>
        </div>
      </Portal>
      <div style={{ background: 'red' }} ref={ref} />
    </div>
  );
};
