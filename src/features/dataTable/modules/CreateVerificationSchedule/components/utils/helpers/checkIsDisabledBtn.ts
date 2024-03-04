import type { DateRange } from '@mui/x-date-pickers-pro';

/**
 * @returns возвращает флаг блокировки кнопки в зависимости от наличия данных в дейтпикере
 * @param dateTuple
 */

export const checkIsDisabledBtn = (dateTuple: DateRange<Date>) => {
	return Boolean([...dateTuple].filter(Boolean).length);
};
