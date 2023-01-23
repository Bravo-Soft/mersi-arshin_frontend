import { formatISO } from 'date-fns';

/**
 *
 * @param date дата, которую необходимо преобразовать
 * @returns строку в ISO формате без значения времени
 */
export const createDateISO = (date: Date) =>
	formatISO(date, { format: 'extended', representation: 'date' });
