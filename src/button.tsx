import * as React from 'react';
import * as PropTypes from 'prop-types';

import clx from './clx';

type ButtonTypes = {
  /**
   * Label of the button
   */
  label: string;
  /**
   * Boolean value to define the button style
   */
  outlined?: boolean;
  /**
   * Button click action
   */
  onClick(): void;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
};

const BASE_BUTTON =
  'rounded outline-none shadow py-3 px-12 font-normal uppercase tracking-wider text-lg';
const CONTAINED_BUTTON = 'bg-teal-400 border border-teal-400 text-white';
const OUTLINED_BUTTON = 'border border-teal-400 text-teal-400 ll';

const Button: React.FC<ButtonTypes> = ({
  className = '',
  outlined,
  onClick,
  type = 'button',
  label = 'See more',
}) => {
  return (
    <button
      className={clx(BASE_BUTTON, {
        [className]: className,
        [CONTAINED_BUTTON]: !outlined,
        [OUTLINED_BUTTON]: outlined,
      })}
      onClick={onClick}
      type={type}
    >
      <span>{label}</span>
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  outlined: PropTypes.bool,
  type: PropTypes.oneOf(['submit', 'button', 'reset', undefined]),
};

Button.defaultProps = {
  className: '',
  outlined: false,
  type: 'button',
};

export { Button, clx };
