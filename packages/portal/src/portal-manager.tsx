import { createContext } from '@nature-ui/react-utils';
import { __DEV__ } from '@nature-ui/utils';
import React from 'react';

interface PortalManagerContext {
  zIndex?: number;
}

const [PortalManagerContextProvider, usePortalManager] =
  createContext<PortalManagerContext | null>({
    strict: false,
    name: 'PortalManagerContext',
  });

export { usePortalManager };

export interface PortalManagerProps {
  /**
   * Child elements of the Portal manager
   * Ideally, it should be at the top-level
   * of your application
   */
  children?: React.ReactNode;
  /**
   * [Z-Index war] If your has multiple elements
   * with z-index clashing, you might need to
   * apply a z-index to the Portal manager
   */
  zIndex?: number;
}

/**
 * PortalManager
 *
 * Used to manage multiple portals within an application.
 * It must be render only once, at the root of your application.
 *
 * Inspired by BaseWeb's LayerManager component
 */
export const PortalManager = (props: PortalManagerProps) => {
  const { children, zIndex } = props;
  return (
    <PortalManagerContextProvider value={{ zIndex }}>
      {children}
    </PortalManagerContextProvider>
  );
};

if (__DEV__) {
  PortalManager.displayName = 'PortalManager';
}
