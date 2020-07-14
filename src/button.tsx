import React, { FC } from 'react';
import clsx from 'clsx';

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
};

const BASE_BUTTON =
	'rounded outline-none shadow py-3 px-12 font-normal uppercase tracking-wider text-lg';
const CONTAINED_BUTTON = `bg-teal-400 border border-teal-400 text-white`;
const OUTLINED_BUTTON = `border border-teal-400 text-teal-400 ll`;

export const Button: FC<ButtonTypes> = ({
	onClick,
	label = 'Some label',
	outlined,
	className = '',
}) => {
	return (
		<button
			onClick={onClick}
			className={clsx(BASE_BUTTON, {
				[CONTAINED_BUTTON]: !outlined,
				[OUTLINED_BUTTON]: outlined,
				[className]: className,
			})}
		>
			<span>{label}</span>
		</button>
	);
};
