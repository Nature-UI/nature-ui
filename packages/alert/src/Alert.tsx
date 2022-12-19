import { Icon, SvgIconProps } from '@nature-ui/icon';
import { clsx, HTMLNatureProps, nature } from '@nature-ui/system';
import { createContext, __DEV__ } from '@nature-ui/utils';
import React from 'react';
import { CheckIcon, InfoIcon, WarningIcon } from './icons';

const SUBTLE_TEXT = 'text-gray-800';
const SOLID_TEXT = 'text-white';

export const ALERT_STATUSES = {
  error: {
    iconColor: 'text-red-600 mr-3',
    icon: WarningIcon,
    variant: {
      solid: `bg-red-600 ${SOLID_TEXT}`,
      subtle: `bg-red-200 ${SUBTLE_TEXT}`,
      border: 'border-red-600',
    },
  },
  info: {
    bg: 'bg-blue-200',
    iconColor: 'text-blue-600 mr-3',
    icon: InfoIcon,
    variant: {
      solid: `bg-blue-600 ${SOLID_TEXT}`,
      subtle: `bg-blue-200 ${SUBTLE_TEXT}`,
      border: 'border-blue-600',
    },
  },
  success: {
    iconColor: 'text-green-600 mr-3',
    icon: CheckIcon,
    variant: {
      solid: `bg-green-600 ${SOLID_TEXT}`,
      subtle: `bg-green-200 ${SUBTLE_TEXT}`,
      border: 'border-green-600',
    },
  },
  warning: {
    iconColor: 'text-orange-600 mr-3',
    icon: WarningIcon,
    variant: {
      subtle: `bg-orange-200 ${SUBTLE_TEXT}`,
      solid: `bg-orange-600 ${SOLID_TEXT}`,
      border: 'border-orange-600',
    },
  },
};

type AlertContext = Required<Pick<AlertOptions, 'status' | 'variant'>>;

const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: 'AlertContext',
  errorMessage:
    'useAlertContext: `context` is undefined, seems you forgot to wrap alert components in <AlertProvider>',
});

interface AlertOptions {
  /**
   * The status of the alert
   */
  status?: keyof typeof ALERT_STATUSES;
  /**
   * The variant of the alert style to use
   */
  variant?: 'solid' | 'subtle' | 'left-accent' | 'top-accent';
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
  id?: string;
  alertTitle?: React.ReactNode;
}

export type AlertProps = AlertOptions & HTMLNatureProps<'div'>;

const BASE_STYLE =
  'px-4 py-3 flex items-center w-full relative overflow-hidden';

export const AlertWrapper = (props: AlertProps) => {
  const {
    className = '',
    status = 'success',
    variant = 'subtle',
    component: Component = nature.div,
    role = 'alert',
    children,
    ...rest
  } = props;

  // const Component = 'div';

  const { variant: _variant } = ALERT_STATUSES[status];
  const color: string = _variant[variant] ?? _variant.subtle;

  const componentClass = clsx(
    BASE_STYLE,
    {
      [color]: variant,
      ['border-l-4']: variant === 'left-accent',
      ['border-t-4']: variant === 'top-accent',
      [ALERT_STATUSES[status].variant.border]: status,
    },
    className,
  );

  const context = {
    status,
    variant,
  };

  return (
    <AlertProvider value={context}>
      <Component className={componentClass} {...rest} role={role}>
        {children}
      </Component>
    </AlertProvider>
  );
};

if (__DEV__) {
  AlertWrapper.displayName = 'Alert';
}

export type AlertTitleProps = HTMLNatureProps<'h3'>;

export const AlertTitle = (props: AlertTitleProps) => {
  const { className = '', ...rest } = props;

  return <nature.h3 className={clsx('font-bold', className)} {...rest} />;
};

if (__DEV__) {
  AlertTitle.displayName = 'AlertTitle';
}

export type AlertDescriptionProps = HTMLNatureProps<'p'>;

export const AlertDescription = (props: AlertDescriptionProps) => {
  return <nature.p {...props} />;
};

if (__DEV__) {
  AlertDescription.displayName = 'AlertDescription';
}

export type AlertIconProps = SvgIconProps;

export const AlertIcon = (props: AlertIconProps) => {
  const { className = '', size = 20, ...rest } = props;

  const { variant = 'subtle', status = 'info' } = useAlertContext();

  const { iconColor, icon } = ALERT_STATUSES[status];

  const iconClasses = clsx(
    {
      'mr-3': variant,
      [iconColor]: variant !== 'solid',
    },
    className,
  );

  return <Icon as={icon} className={iconClasses} size={size} {...rest} />;
};

if (__DEV__) {
  AlertIcon.displayName = 'AlertIcon';
}

export const Alert = (props: AlertProps) => {
  const {
    variant = 'subtle',
    status = 'error',
    alertTitle,
    children,
    ...rest
  } = props;

  const hasIcon = !variant.includes('accent');

  return (
    <AlertWrapper {...rest} variant={variant} status={status}>
      {hasIcon && <AlertIcon />}
      {alertTitle && <AlertTitle className='mr-3'>{alertTitle}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </AlertWrapper>
  );
};

if (__DEV__) {
  Alert.displayName = 'Alert';
}
