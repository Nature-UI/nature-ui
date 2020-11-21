import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ALERT_STATUSES,
} from '@nature-ui/alert';
import { CloseButton } from '@nature-ui/close-button';
import { clsx, nature, PropsOf } from '@nature-ui/system';
import { isFunction, merge } from '@nature-ui/utils';
import * as React from 'react';
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
  isClosable?: boolean;
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

export type IToast = UseToastOptions

const DivTag = nature("div")
const Toast = (props: UseToastOptions & PropsOf<typeof Alert>) => {
    const {status = "success", variant, id, title, isCloseable, onClose, description, className = '', ...rest} = props

    return (
        <Alert
            status={status}
            variant={variant}
            id={id}
            className={clsx(className, 'text-left shadow-lg rounded-md items-start m-2 p-4')}

        >
            <AlertIcon />
            <DivTag className="flex-1">
                {title && <Aler}

            </DivTag>
        </Alert>
    )
}
