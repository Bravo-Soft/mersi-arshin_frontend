import { formatISO } from 'date-fns';

/**
 *
 * @param date дата, которую необходимо преобразовать
 * @returns строку в ISO формате без значения времени
 */
export const createDateISO = (date: Date) => {
	console.log('date', formatISO(date, { format: 'extended', representation: 'date' }));

	return formatISO(date, { format: 'extended', representation: 'date' });
};

// formatISO(date, { format: 'extended', representation: 'date' });
