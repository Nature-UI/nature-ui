import { noop } from '@nature-ui/utils';
import * as React from 'react';
import { createRenderToast } from './toast';
import { getToastPlacement } from './toast.placement';
import {
  CreateToastOptions,
  ToastMethods,
  ToastProvider,
  ToastProviderProps,
} from './toast.provider';
import { ToastId, ToastMessage } from './toast.types';
import { UseToastOptions } from './use-toast';

const defaults: UseToastOptions = {
  duration: 5000,
  position: 'bottom',
  variant: 'solid',
};

export interface CreateStandAloneToastParam
  extends Omit<ToastProviderProps, 'children'> {
  defaultOptions: UseToastOptions;
}

export interface CallableToastMethods extends ToastMethods {
  (message: ToastMessage, options: CreateToastOptions): void;
}
export const defaultStandaloneParam: CreateStandAloneToastParam &
  Required<Omit<CreateStandAloneToastParam, keyof ToastProviderProps>> = {
  defaultOptions: defaults,
};

export function createStandaloneToast({
  defaultOptions = defaultStandaloneParam.defaultOptions,
  motionVariants,
  toastSpacing,
  component,
}: CreateStandAloneToastParam = defaultStandaloneParam) {
  const ref = React.createRef<CallableToastMethods>();

  const ToastContainer = () => (
    <ToastProvider
      ref={ref}
      defaultOptions={defaultOptions}
      motionVariants={motionVariants}
      toastSpacing={toastSpacing}
      component={component}
    />
  );

  const normalizeToastOptions = (options?: UseToastOptions) => ({
    ...defaultOptions,
    ...options,
    position: getToastPlacement(options?.position, 'ltr'),
  });

  const toast = (options?: UseToastOptions) => {
    const normalizedToastOptions = normalizeToastOptions(options);
    const Message = createRenderToast(normalizedToastOptions);

    return ref.current?.notify(Message, normalizedToastOptions);
  };

  toast.update = (id: ToastId, options: Omit<UseToastOptions, 'id'>) => {
    if (!id) return;

    const normalizedToastOptions = normalizeToastOptions(options);
    const Message = createRenderToast(normalizedToastOptions);

    ref.current?.update(id, {
      ...normalizedToastOptions,
      message: Message,
    });
  };

  toast.notify = ref.current?.notify ?? noop;
  toast.closeAll = ref.current?.closeAll ?? noop;
  toast.close = ref.current?.close ?? noop;
  toast.isActive = ref.current?.isActive ?? noop;

  return {
    ToastContainer,
    toast,
  };
}
