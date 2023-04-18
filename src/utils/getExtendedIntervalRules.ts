import type { RegisterOptions } from 'react-hook-form';

export const getExtendedIntervalRules = (): Pick<RegisterOptions, 'min' | 'max'> => ({
	min: {
		value: 1,
		message: `Интервал поверки не может быть меньше или равным 0`,
	},
	max: {
		value: 1000,
		message: 'Интервал поверки не может быть больше 1000',
	},
});
