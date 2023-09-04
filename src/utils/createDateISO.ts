import dayjs, { Dayjs } from 'dayjs';

/**
 *
 * @param date дата, которую необходимо преобразовать
 * @returns строку в ISO формате без значения времени
 */
export const createDateISO = (date: Dayjs) => dayjs(date).startOf('date').toISOString();
