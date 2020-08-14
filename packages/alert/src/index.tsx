import * as React from 'react';
// import { clx } from '@nature-ui/utils';
import clx from 'clsx';

export const ALERT_STATUSES = {
  error: {
    bg: 'bg-red-200',
    iconColor: 'text-red-500',
    icon: '',
  },
  info: {
    bg: 'bg-blue-200',
    iconColor: 'text-blue-500',
    icon: '',
  },
  success: {
    bg: 'bg-green-200',
    iconColor: 'text-green-500',
    icon: '',
  },
  warning: {
    bg: 'bg-orange-200',
    iconColor: 'text-orange-500',
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

/*
 *clx(BASE_BUTTON, {
 *    [className]: className,
 *    [CONTAINED_BUTTON]: !outlined,
 *    [OUTLINED_BUTTON]: outlined,
 *  })
 *
 */

const alert: React.ForwardRefExoticComponent<AlertProps> = React.forwardRef(
  (props: AlertProps, ref: React.Ref<any>) => {
    const { className = 'ml-12', status = 'success' } = props;

    const classes = clx(DEFAULT_CLASSES, {
      [className]: className,
      [ALERT_STATUSES[status].bg]: status,
    });

    return (
      <div ref={ref} className={classes}>
        Your browser is outdated! Your Nature experience may be degraded.
      </div>
    );
  }
);

export default alert;
