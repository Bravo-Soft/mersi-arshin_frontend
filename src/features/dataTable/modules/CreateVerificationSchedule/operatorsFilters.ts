import { DateRange } from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs';

export interface IFilter {
	columnFilter: string;
	operatorValue: string;
	value: string;
	id: number;
}

//
export interface IForm {
	filters: IFilter[];
	fieldsDate: DateRange<Dayjs>;
}
