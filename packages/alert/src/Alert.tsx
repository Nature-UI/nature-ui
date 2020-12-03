import * as React from 'react';
import { clsx as clx, nature, PropsOf } from '@nature-ui/system';
import {
  FiInfo,
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
} from 'react-icons/fi';
import { createContext, __DEV__ } from '@nature-ui/utils';

const SUBTLE_TEXT = 'text-gray-800';

export const ALERT_STATUSES = {
  error: {
    bg: 'bg-red-200',
    iconColor: 'text-red-600 mr-3',
    icon: FiAlertCircle,
    variant: {
      solid: 'bg-red-600 text-white',
      subtle: SUBTLE_TEXT,
    },
  },
  info: {
    bg: 'bg-blue-200',
    iconColor: 'text-blue-600 mr-3',
    icon: FiInfo,
    variant: {
      solid: 'bg-blue-600',
      subtle: SUBTLE_TEXT,
    },
  },
  success: {
    bg: 'bg-green-200',
    iconColor: 'text-green-600 mr-3',
    icon: FiCheckCircle,
    variant: {
      solid: 'bg-green-600 text-white',
      subtle: SUBTLE_TEXT,
    },
  },
  warning: {
    bg: 'bg-orange-200',
    iconColor: 'text-orange-600 mr-3',
    icon: FiAlertTriangle,
    variant: {
      solid: 'bg-orange-600 text-white',
      subtle: SUBTLE_TEXT,
    },
  },
};

type AlertContext = Required<Pick<AlertOptions, 'status' | 'variant'>>;

const [AlertContextProvider, useAlertContext] = createContext<AlertContext>({
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
  variant?: 'solid' | 'subtle';
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

  return (
    <AlertContextProvider value={context}>
      <Component className={componentClass} {...rest} role={role} />
    </AlertContextProvider>
  );
};

if (__DEV__) {
  AlertWrapper.displayName = 'Alert';
}

export type AlertTitleProps = PropsOf<typeof DivTag>;

export const AlertTitle = (props: AlertTitleProps) => {
  const { className = '', ...rest } = props;
  // const Component = 'div';

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

export type AlertIconProps = PropsOf<typeof SpanTag>;

export const AlertIcon = (props: AlertIconProps) => {
  const { className = '' } = props;

  const { variant = 'subtle', status = 'success' } = useAlertContext();

  // const Component = 'div';

  const { iconColor, icon: IconComponent, variant: Variant } = ALERT_STATUSES[
    status
  ];
  const VARIANT: string = Variant[variant];

  // const Icon = ALERT_STATUSES[status];

  const iconClasses = clx(className, {
    [VARIANT]: variant,
    'mr-3': variant,
    [iconColor]: variant !== 'solid',
  });

  return <IconComponent className={iconClasses} size={20} />;
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

  return (
    <AlertWrapper {...rest} variant={variant} status={status}>
      <AlertIcon />
      <AlertTitle className='mr-3'>{alertTitle}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </AlertWrapper>
  );
};

if (__DEV__) {
  Alert.displayName = 'Alert';
}
