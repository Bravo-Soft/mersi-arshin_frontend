import type { DateRange } from '@mui/x-date-pickers-pro';
import { format } from 'date-fns';

const operatorValueRange = ['onOrAfter', 'onOrBefore'];

export const createDateRange = (fieldsDate: DateRange<Date>) => {
	const filterNull = fieldsDate.filter((e): e is Date => e !== null);

	const createDateFilter = filterNull.map((e, index) => ({
		columnField: 'dateOfTheNextVerification',
		operatorValue: operatorValueRange[index],
		id: index,
		value: format(e, 'yyyy-MM-dd'),
	}));

	return createDateFilter;
};
