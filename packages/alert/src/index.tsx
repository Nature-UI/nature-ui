import * as React from 'react';
import { clx } from '@nature-ui/utils';

export const ALERT_STATUSES = {
  error: {
    colorScheme: 'red',
    icon: '',
  },
  info: {
    colorScheme: 'blue',
    icon: '',
  },
  success: {
    colorScheme: 'green',
    icon: '',
  },
  warning: {
    colorScheme: 'orange',
    icon: '',
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
  variant?: string;

  /**
   * Other tailwind utility classes or custom classnames you wish to include
   */
  className?: string;
}

export type AlertProps = AlertOptions;

const DEFAULT_CLASSES = 'px-4 py-3';
const DANGER_CLASS = 'bg-red-300';

/*
 *clx(BASE_BUTTON, {
 *    [className]: className,
 *    [CONTAINED_BUTTON]: !outlined,
 *    [OUTLINED_BUTTON]: outlined,
 *  })
 *
 */

const alert: React.ForwardRefExoticComponent<AlertProps> = React.forwardRef(
  (properties: AlertProps, ref: React.Ref<any>) => {
    const { className = 'ml-12' } = properties;

    const classes = clx(DEFAULT_CLASSES, {
      [className]: className,
      [DANGER_CLASS]: 'danger',
    });

    return (
      <div ref={ref} className={classes}>
        Your browser is outdated! Your Nature experience may be degraded.
      </div>
    );
  }
);

export default alert;
