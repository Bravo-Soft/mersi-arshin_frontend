import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

/**
 *
 * @param date дата, которую необходимо преобразовать
 * @returns строку в ISO формате без значения времени
 */

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Moscow');

export const createDateISO = (date: Dayjs) => {
	return dayjs(date).tz('Europe/Moscow').startOf('date').toISOString();
};
