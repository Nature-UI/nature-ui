import {
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  AlertWrapper,
} from '@nature-ui/alert';
import { CloseButton } from '@nature-ui/close-button';
import { nature } from '@nature-ui/system';
import { isFunction } from '@nature-ui/utils';
import React from 'react';
import type { RenderProps } from './toast.types';
import type { UseToastOptions } from './use-toast';

export interface ToastProps
  extends UseToastOptions,
    Omit<AlertProps, keyof UseToastOptions> {
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = (props) => {
  const { status, variant, id, title, isClosable, onClose, description } =
    props;

  const alertTitleId =
    typeof id !== 'undefined' ? `toast-${id}-title` : undefined;

  return (
    <AlertWrapper
      status={status}
      variant={variant}
      id={String(id)}
      aria-labelledby={alertTitleId}
      className='rounded'
      css={{
        alignItems: 'flex-start',
      }}
    >
      <AlertIcon />
      <nature.div className='flex-1 max-w-full'>
        {title && <AlertTitle id={alertTitleId}>{title}</AlertTitle>}
        {description && (
          <AlertDescription className='block'>{description}</AlertDescription>
        )}
      </nature.div>
      {isClosable && (
        <CloseButton
          size='sm'
          onClick={onClose}
          className='absolute top-1 right-1'
        />
      )}
    </AlertWrapper>
  );
};

export function createRenderToast(
  options: UseToastOptions & {
    toastComponent?: React.FC<ToastProps>;
  } = {},
) {
  const { render, toastComponent: ToastComponent = Toast } = options;
  const renderToast: React.FC<RenderProps> = (props) => {
    if (isFunction(render)) {
      return render(props) as JSX.Element;
    }
    return <ToastComponent {...props} {...options} />;
  };
  return renderToast;
}
