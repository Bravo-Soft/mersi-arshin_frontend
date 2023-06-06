import type { DateRange } from '@mui/x-date-pickers-pro';

/**
 * @param Картеж дейтпикера
 * @returns возвращает флаг блокировки кнопки в зависимости от наличия данных в дейтпикере
 */

export const checkIsDisabledBtn = (dateTuple: DateRange<Date>) => {
	return Boolean([...dateTuple].filter(Boolean).length);
};
