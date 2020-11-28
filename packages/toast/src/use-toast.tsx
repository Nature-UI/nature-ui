import * as React from 'react';
import {
  AlertDescription,
  AlertIcon,
  AlertTitle,
  AlertWrapper,
  ALERT_STATUSES,
} from '@nature-ui/alert';
import { CloseButton } from '@nature-ui/close-button';
import { clsx, nature } from '@nature-ui/system';
import { isFunction, merge } from '@nature-ui/utils';

import { toast } from './toast.class';
import { RenderProps, ToastOptions, ToastId } from './toast.types';

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
  isCloseable?: boolean;
  /**
   * The alert component `variant` to use
   */
  variant?: string;
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
}

export type IToast = UseToastOptions;

const DivTag = nature('div');
const Toast = (props: any) => {
  const {
    status = 'success',
    variant,
    id,
    title,
    isCloseable,
    onClose,
    description,
    className = '',
    ...rest
  } = props;

  return (
    <AlertWrapper
      status={status}
      variant={variant}
      id={id}
      className={clsx(className, 'text-left shadow-lg rounded-md m-2 p-4')}
      style={{
        alignItems: 'start',
      }}
      {...rest}
    >
      <AlertIcon />
      <DivTag className='flex-1'>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && (
          <AlertDescription marginTop='px' lineHeight='short'>
            {description}
          </AlertDescription>
        )}
      </DivTag>
      {isCloseable && (
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
  variant: 'solid',
} as const;

/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */
export const useToast = () => {
  const toastImpl = (options: UseToastOptions) => {
    const { render } = options;

    const Message = (props: RenderProps) => (
      <>
        {isFunction(render) ? (
          render(props)
        ) : (
          <Toast
            {...{
              ...props,
              ...opts,
            }}
          />
        )}
      </>
    );
    const opts = merge(defaults, options);

    return toast.notify(Message, opts);
  };

  toastImpl.close = toast.close;
  toastImpl.closeAll = toast.closeAll;

  toastImpl.update = (id: ToastId, options: Omit<UseToastOptions, 'id'>) => {
    const { render, ...rest } = options;

    const opts = merge(defaults, rest) as any;

    toast.update(id, {
      ...opts,
      // eslint-disable-next-line react/display-name
      message: (props) => (
        <>
          {isFunction(render) ? (
            render(props)
          ) : (
            <Toast
              {...{
                ...props,
                ...opts,
              }}
            />
          )}
        </>
      ),
    });
  };

  toastImpl.isActive = toast.isActive;

  return toastImpl;
};

export default useToast;
