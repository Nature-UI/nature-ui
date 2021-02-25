/** ** */
import * as React from 'react';
import { BoxProps, nature } from '@nature-ui/core';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';

type SidebarCategoryProps = BoxProps & {
  isMobile?: boolean;
  title: string;
  opened?: boolean;
  selected?: boolean;
  children: ReactNode;
  contentRef?: RefObject<any>;
};

interface SidebarState {
  toggle?: boolean;
  shouldScroll?: boolean;
}

function SidebarCategory(props: SidebarCategoryProps) {
  const {
    isMobile,
    title,
    selected,
    opened,
    children,
    contentRef,
    ...rest
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const [{ toggle, shouldScroll = false }, setToggle] = useState<SidebarState>({
    toggle: selected || opened,
  });

  // If a category is selected indirectly, open it. This can happen when using the search input
  useEffect(() => {
    if (selected) {
      setToggle({ toggle: true, shouldScroll: true });
    }
  }, [selected]);

  // Navigate to the start of the category when manually opened
  useEffect(() => {
    if (!ref.current || !contentRef?.current) return;
    if (toggle && shouldScroll) {
      const contentEl = contentRef.current;

      if ((toggle || toggle === true) && contentEl) {
        // 10 is added for better margin
        const height =
          ref.current.offsetTop - (isMobile ? 10 : contentEl.offsetTop);
        contentEl.scrollTop = height;
        setToggle({ toggle });
      }
    }
  }, [toggle, shouldScroll, isMobile, contentRef]);

  return (
    <nature.div className='mt-8' ref={ref} {...rest}>
      <nature.p
        className='w-full uppercase text-xs font-bold flex items-center justify-between text-gray-50'
        css={{ userSelect: 'none' }}
      >
        {title}
      </nature.p>
      <nature.div className='mt-4 -mx-3' role='group' hidden={!toggle}>
        {children}
      </nature.div>
    </nature.div>
  );
}

export default SidebarCategory;
