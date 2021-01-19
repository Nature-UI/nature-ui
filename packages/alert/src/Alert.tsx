import * as React from 'react';
import { clsx, clsx as clx, nature, PropsOf } from '@nature-ui/system';

import { createContext, __DEV__ } from '@nature-ui/utils';
import { Icon, Fi, IconProps } from '@nature-ui/icons';

const SUBTLE_TEXT = 'text-gray-800';

export const ALERT_STATUSES = {
  error: {
    bg: 'bg-red-200',
    iconColor: 'text-red-600 mr-3',
    icon: Fi.FiAlertCircle,
    variant: {
      solid: 'bg-red-600 text-white',
      subtle: SUBTLE_TEXT,
    },
  },
  info: {
    bg: 'bg-blue-200',
    iconColor: 'text-blue-600 mr-3',
    icon: Fi.FiInfo,
    variant: {
      solid: 'bg-blue-600',
      subtle: SUBTLE_TEXT,
    },
  },
  success: {
    bg: 'bg-green-200',
    iconColor: 'text-green-600 mr-3',
    icon: Fi.FiCheckCircle,
    variant: {
      solid: 'bg-green-600 text-white',
      subtle: SUBTLE_TEXT,
    },
  },
  warning: {
    bg: 'bg-orange-200',
    iconColor: 'text-orange-600 mr-3',
    icon: Fi.FiAlertTriangle,
    variant: {
      solid: 'bg-orange-600 text-white',
      subtle: SUBTLE_TEXT,
    },
  },
};

type AlertContext = Required<Pick<AlertOptions, 'status' | 'variant'>>;

const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: 'AlertContext',
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

const DivTag = nature('div');

export type AlertProps = AlertOptions & PropsOf<typeof DivTag>;

const BASE_STYLE =
  'px-4 py-3 flex items-center w-full relative overflow-hidden';

export const AlertWrapper = (props: AlertProps) => {
  const {
    className = '',
    status = 'success',
    variant = 'subtle',
    component: Component = DivTag,
    role = 'alert',
    children,
    ...rest
  } = props;

  // const Component = 'div';

  const { variant: Variant, bg } = ALERT_STATUSES[status];
  const VARIANT: string = Variant[variant];

  const componentClass = clx(className, BASE_STYLE, {
    [bg]: status,
    [VARIANT]: variant,
  });

  const context = {
    status,
    variant,
  };
  const hasIcon = variant.includes('accent');

  return (
    <AlertProvider value={context}>
      <Component className={componentClass} {...rest} role={role}>
        {hasIcon && (
          <DivTag
            className={clsx('absolute top-0 left-0 mr-2', {
              'h-full w-1 ': variant === 'left-accent',
              'w-full h-1 ': variant === 'top-accent',
              [ALERT_STATUSES[status].variant.solid]: status,
            })}
          />
        )}
        {children}
      </Component>
    </AlertProvider>
  );
};

if (__DEV__) {
  AlertWrapper.displayName = 'Alert';
}

export type AlertTitleProps = PropsOf<typeof DivTag>;

export const AlertTitle = (props: AlertTitleProps) => {
  const { className = '', ...rest } = props;

  return <DivTag className={clx(className, 'font-bold')} {...rest} />;
};

if (__DEV__) {
  AlertTitle.displayName = 'AlertTitle';
}

export type AlertDescriptionProps = PropsOf<typeof DivTag>;

export const AlertDescription = (props: AlertDescriptionProps) => {
  const { className = '', ...rest } = props;
  // const Component = 'div';

  return <DivTag className={className} {...rest} />;
};

if (__DEV__) {
  AlertDescription.displayName = 'AlertDescription';
}

const SpanTag = nature('span');

export type AlertIconProps = IconProps & PropsOf<typeof SpanTag>;

export const AlertIcon = (props: AlertIconProps) => {
  const { className = '', size = 20, ...rest } = props;

  const { variant = 'subtle', status = 'success' } = useAlertContext();

  // const Component = 'div';
  const { iconColor, icon, variant: Variant } = ALERT_STATUSES[status];
  const VARIANT = Variant[variant];

  // const Icon = ALERT_STATUSES[status];

  const iconClasses = clx(className, {
    [VARIANT]: variant,
    'mr-3': variant,
    [iconColor]: variant !== 'solid',
  });

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
      <AlertTitle className='mr-3'>{alertTitle}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </AlertWrapper>
  );
};

if (__DEV__) {
  Alert.displayName = 'Alert';
}
