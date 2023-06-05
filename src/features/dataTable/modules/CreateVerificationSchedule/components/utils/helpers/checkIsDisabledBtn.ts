import type { DateRange } from '@mui/x-date-pickers-pro';

export const checkIsDisabledBtn = (dateTuple: DateRange<Date>) => {
	return Boolean([...dateTuple].filter(Boolean).length);
};
