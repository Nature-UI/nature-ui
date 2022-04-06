import {
  AlertDescription,
  AlertIcon,
  AlertTitle,
  AlertWrapper,
  ALERT_STATUSES,
} from '@nature-ui/alert';
import { CloseButton } from '@nature-ui/close-button';
import { useLatestRef } from '@nature-ui/hooks';
import { clsx, nature } from '@nature-ui/system';
import { isFunction } from '@nature-ui/utils';
import * as React from 'react';
import { getToastPlacement, WithoutLogicalPosition } from './toast-placement';
import { toast } from './toast.class';
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
  variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent' | (string & {});
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

type UseToastOptionsNormalized = WithoutLogicalPosition<UseToastOptions>;
export type IToast = UseToastOptions;

const Toast: React.FC<any> = (props) => {
  const {
    status = 'info',
    variant,
    id,
    title,
    isClosable,
    onClose,
    description,
    className,
    ...rest
  } = props;

  const alertTitleId =
    typeof id !== 'undefined' ? `toast-${id}-title` : undefined;

  return (
    <AlertWrapper
      status={status}
      variant={variant}
      id={id}
      className={clsx(className, 'w-auto shadow-lg rounded-md p-4')}
      css={{
        textAlign: 'start',
        alignItems: 'start',
      }}
      aria-labelledby={alertTitleId}
      {...rest}
    >
      <AlertIcon />
      <nature.div className='max-w-full flex-1'>
        {title && <AlertTitle id={alertTitleId}>{title}</AlertTitle>}
        {description && (
          <AlertDescription className='block'>{description}</AlertDescription>
        )}
      </nature.div>
      {isClosable && (
        <CloseButton
          size='sm'
          onClick={onClose}
          className='absolute right-0 top-0 mr-2 mt-2'
        />
      )}
    </AlertWrapper>
  );
};

const defaults = {
  duration: 5000,
  position: 'bottom',
  variant: 'subtle',
} as const;

export type CreateStandaloneToastParam = Partial<{
  defaultOptions: UseToastOptions;
}>;

export const defaultStandaloneParam: Required<CreateStandaloneToastParam> = {
  defaultOptions: defaults,
};

export function createStandaloneToast({
  defaultOptions = defaultStandaloneParam.defaultOptions,
}: CreateStandaloneToastParam = defaultStandaloneParam) {
  const renderWithProviders = (
    props: React.PropsWithChildren<RenderProps>,
    options: UseToastOptionsNormalized,
  ) => (
    <>
      {isFunction(options.render) ? (
        options.render(props)
      ) : (
        <Toast {...props} {...options} />
      )}
    </>
  );

  const toastImpl = (options?: UseToastOptions) => {
    const opts = { ...defaultOptions, ...options } as UseToastOptionsNormalized;
    opts.position = getToastPlacement(opts.position, 'ltr');

    const Message: React.FC<RenderProps> = (props) =>
      renderWithProviders(props, opts);

    return toast.notify(Message, opts);
  };

  toastImpl.close = toast.close;
  toastImpl.closeAll = toast.closeAll;

  toastImpl.update = (id: ToastId, options: Omit<UseToastOptions, 'id'>) => {
    if (!id) return;

    const opts = { ...defaultOptions, ...options } as UseToastOptionsNormalized;
    opts.position = getToastPlacement(opts.position, 'ltr');

    toast.update(id, {
      ...opts,
      message: (props) => renderWithProviders(props, opts),
    });
  };

  toastImpl.isActive = toast.isActive;

  return toastImpl;
}

/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */
export const useToast = (options?: UseToastOptions) => {
  const toastOptions = useLatestRef(options);

  return React.useMemo(
    () =>
      createStandaloneToast({
        defaultOptions: toastOptions.current,
      }),
    [toastOptions],
  );
};
