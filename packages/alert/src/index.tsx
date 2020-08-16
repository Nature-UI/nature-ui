import * as React from 'react';
import clx from 'clsx';
import { FiInfo, FiAlertCircle, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { createContext } from '@nature-ui/utils';

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

const [AlertContextProvider] = createContext<AlertContext>({
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
   * Other tailwind utility classes or custom classnames you wish to include
   */
  className?: string;

  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
  id?: string;
}

export type AlertProps = AlertOptions;

const BASE_STYLE = 'px-4 py-3 flex items-center';

const Alert: React.ForwardRefExoticComponent<AlertProps> = React.forwardRef(
  (props: AlertProps, ref: React.Ref<any>) => {
    const {
      className = '',
      status = 'success',
      children,
      variant = 'subtle',
      component: Component = 'div',
    } = props;

    // const Component = 'div';

    const { iconColor, icon: IconComponent, variant: Variant, bg } = ALERT_STATUSES[status];
    const VARIANT: string = Variant[variant];

    const componentClass = clx(BASE_STYLE, {
      [className]: className,
      [bg]: status,
      [VARIANT]: variant,
    });

    // const Icon = ALERT_STATUSES[status];

    const iconClasses = clx({
      [VARIANT]: variant,
      'mr-3': variant,
      [iconColor]: variant !== 'solid',
    });

    const context = { status, variant };

    return (
      <AlertContextProvider value={context}>
        <Component className={componentClass} ref={ref}>
          {status && <IconComponent className={iconClasses} size={20} />}
          <Component>{children ? children : 'This is an alert 🙂'}</Component>
        </Component>
      </AlertContextProvider>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
