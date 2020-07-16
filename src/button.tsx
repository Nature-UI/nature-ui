import React, { FC } from 'react';
// import clsx from 'clsx';
import PropTypes from 'prop-types';

export const clsx = (...classNames: any[]): string =>
  classNames.filter(Boolean).join(' ');

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

const Button: FC<ButtonTypes> = ({
  onClick,
  label = 'See more',
  outlined,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(BASE_BUTTON, {
        [CONTAINED_BUTTON]: !outlined,
        [OUTLINED_BUTTON]: outlined,
        [className]: className,
      })}
      type={type}
    >
      <span>{label}</span>
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  outlined: PropTypes.bool,
  type: PropTypes.oneOf(['submit', 'button', 'reset', undefined]),
};

Button.defaultProps = {
  className: '',
  outlined: false,
  type: 'button',
};

export default Button;
