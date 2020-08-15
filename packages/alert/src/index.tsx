import * as React from 'react';
import clx from 'clsx';
import { FiInfo, FiAlertCircle, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

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
   * Other tailwind utility classes or custom classnames you wish to include
   */
  className?: string;

  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ComponentType;
}

export type AlertProps = AlertOptions;

const DEFAULT_CLASSES = 'px-4 py-3 flex items-center';

const alert: React.ForwardRefExoticComponent<AlertProps> = React.forwardRef(
  (props: AlertProps, ref: React.Ref<any>) => {
    const {
      className = '',
      status = 'success',
      children,
      variant = 'subtle',
      component: Component = 'div',
    } = props;

    // const Component = 'div';

    const VARIANT: string = ALERT_STATUSES[status].variant[variant];

    const componentClass = clx(DEFAULT_CLASSES, {
      [className]: className,
      [ALERT_STATUSES[status].bg]: status,
      [VARIANT]: variant,
    });

    const Icon = ALERT_STATUSES[status];
    const iconClasses = clx({
      [VARIANT]: variant,
      'mr-3': variant,
      [Icon.iconColor]: variant !== 'solid',
    });

    const IconComponent = Icon.icon;

    return (
      <Component className={componentClass} ref={ref}>
        {status && <IconComponent className={iconClasses} size={20} />}
        <span>{children ? children : 'This is an alert 🙂'}</span>
      </Component>
    );
  }
);

export default alert;
