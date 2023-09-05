import { GridFilterItem } from '@mui/x-data-grid-pro';
import type { DateRange } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

/**
 * @param Картеж дейтпикера
 * @returns возвращает массив значений для фильтрации таблицы
 */

const operatorValueRange = ['onOrAfter', 'onOrBefore'];

export const createDateRange = (fieldsDate: DateRange<Date>) => {
	const createDateFilter: GridFilterItem[] = fieldsDate
		.map((e, index): GridFilterItem | null =>
			e !== null
				? {
						columnField: 'dateOfTheNextVerification',
						operatorValue: operatorValueRange[index],
						id: index,
						value: dayjs(e).format('YYYY-MM-DD'),
				  }
				: e
		)
		.filter((e): e is GridFilterItem => Boolean(e));

	return createDateFilter;
};
