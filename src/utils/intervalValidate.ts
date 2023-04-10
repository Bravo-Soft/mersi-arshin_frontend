import type { RegisterOptions } from 'react-hook-form';

export const getExtendedIntervalRules = (): Pick<RegisterOptions, 'min'> => ({
	min: {
		value: 1,
		message: `Интервал поверки не может быть меньше или равным 0`,
	},
});
