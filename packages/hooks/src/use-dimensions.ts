import { BoxModel, getBox } from '@nature-ui/utils';
import { useRef, useState } from 'react';
import { useSafeLayoutEffect } from './use-safe-layout-effect';
/**
 * Reack hook to measure a component's dimensions
 *
 * @param ref ref of the component to measure
 * @param observe if `true`, resize and scroll observers will be turned on
 */

export const useDimensions = (
  ref: React.RefObject<HTMLElement>,
  observe?: boolean
) => {
  const [dimensions, setDimensions] = useState<BoxModel | null>(null);
  const refId = useRef<number>();

  useSafeLayoutEffect(() => {
    if (ref.current) {
      const node = ref.current;
      const measure = () => {
        refId.current = requestAnimationFrame(() => {
          const boxModel = getBox(node);
          setDimensions(boxModel);
        });
      };
      measure();

      if (observe) {
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);

        return () => {
          if (refId.current) {
            cancelAnimationFrame(refId.current);
          }
          window.removeEventListener('resize', measure);
          window.removeEventListener('scroll', measure);
        };
      }

      return () => {
        if (refId.current) {
          cancelAnimationFrame(refId.current);
        }
      };
    }
    return;
  }, [ref, observe]);
  return dimensions;
};
