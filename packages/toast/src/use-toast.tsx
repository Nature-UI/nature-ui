import { ALERT_STATUSES } from '@nature-ui/alert';
import { useLatestRef } from '@nature-ui/hooks';
import { MaybeFunction, runIfFn } from '@nature-ui/utils';
import React from 'react';
import { createRenderToast } from './toast';
import { getToastPlacement } from './toast.placement';
import { useToastManager } from './toast.provider';
import { RenderProps, ToastId, ToastOptions } from './toast.types';
export interface UseToastOptions {
  /**
   * The placement of the toast
   *
   * @default "bottom"
   */
  position?: ToastOptions['position'];
  /**
   * The delay before the toast hides (in milliseconds)
   * If set to `null`, toast will never dismiss.
   *
   * @default 5000 ( = 5000ms )
   */
  duration?: ToastOptions['duration'];
  /**
   * Render a component toast component.
   * Any component passed will receive 2 props: `id` and `onClose`.
   */
  render?(props: RenderProps): React.ReactNode;
  /**
   * The title of the toast
   */
  title?: string;
  /**
   * The description of the toast
   */
  description?: string;
  /**
   * If `true`, toast will show a close button
   */
  isClosable?: boolean;
  /**
   * The alert component `variant` to use
   */
  variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent';
  // variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent' | (string & {});
  /**
   * The status of the toast.
   */
  status?: keyof typeof ALERT_STATUSES;
  /**
   * The `id` of the toast.
   *
   * Mostly used when you need to prevent duplicate.
   * By default, we generate a unique `id` for each toast
   */
  id?: ToastId;
  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?: () => void;
  /**
   * Optional style overrides for the container wrapping the toast
   */
  containerStyle?: React.CSSProperties;
  direction?: 'ltr' | 'rtl';
}
type UseToastPromiseOption = Omit<UseToastOptions, 'status'>;

export type CreateStandaloneToastParam = Partial<{
  defaultOptions: UseToastOptions;
}>;

/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */
export function useToast(defaultOptions?: UseToastOptions) {
  const toastContext = useToastManager();
  const latestToastContextRef = useLatestRef(toastContext);

  return React.useMemo(() => {
    const normalizeToastOptions = (options?: UseToastOptions) => {
      return {
        ...defaultOptions,
        ...options,
        position: getToastPlacement(options?.position, 'ltr'),
      };
    };

    const toast = (options?: UseToastOptions) => {
      const normalizedToastOptions = normalizeToastOptions(options);
      const Message = createRenderToast(normalizedToastOptions);
      return latestToastContextRef.current.notify(
        Message,
        normalizedToastOptions,
      );
    };

    toast.close = latestToastContextRef.current.close;
    toast.closeAll = latestToastContextRef.current.closeAll;
    /**
     * Toasts can only be updated if they have a valid id
     */
    toast.update = (id: ToastId, options: Omit<UseToastOptions, 'id'>) => {
      if (!id) return;

      const normalizedToastOptions = normalizeToastOptions(options);
      const Message = createRenderToast(normalizedToastOptions);

      latestToastContextRef.current.update(id, {
        ...normalizedToastOptions,
        message: Message,
      });
    };

    toast.promise = <Result extends any, Err extends Error = Error>(
      promise: Promise<Result>,
      options: {
        success: MaybeFunction<UseToastPromiseOption, [Result]>;
        error: MaybeFunction<UseToastPromiseOption, [Err]>;
        loading: UseToastPromiseOption;
      },
    ) => {
      const id = toast({
        ...options.loading,
        status: 'info',
        duration: null,
      });

      promise
        .then((data) =>
          toast.update(id, {
            status: 'success',
            duration: 5_000,
            ...runIfFn(options.success, data),
          }),
        )
        .catch((error) =>
          toast.update(id, {
            status: 'error',
            duration: 5_000,
            ...runIfFn(options.error, error),
          }),
        );
    };

    toast.isActive = latestToastContextRef.current.isActive;

    return toast;
  }, [defaultOptions, latestToastContextRef, 'ltr']);
}

export default useToast;
