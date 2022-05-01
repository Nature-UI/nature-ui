import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from '@nature-ui/alert';
import { CloseButton } from '@nature-ui/close-button';
import { nature } from '@nature-ui/system';
import { isFunction } from '@nature-ui/utils';
import * as React from 'react';
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
    <Alert
      status={status}
      variant={variant}
      id={String(id)}
      alignItems='start'
      borderRadius='md'
      boxShadow='lg'
      paddingEnd={8}
      textAlign='start'
      width='auto'
      aria-labelledby={alertTitleId}
    >
      <AlertIcon />
      <nature.div flex='1' maxWidth='100%'>
        {title && <AlertTitle id={alertTitleId}>{title}</AlertTitle>}
        {description && (
          <AlertDescription display='block'>{description}</AlertDescription>
        )}
      </nature.div>
      {isClosable && (
        <CloseButton
          size='sm'
          onClick={onClose}
          position='absolute'
          insetEnd={1}
          top={1}
        />
      )}
    </Alert>
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
